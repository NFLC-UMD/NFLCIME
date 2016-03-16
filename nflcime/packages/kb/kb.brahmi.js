/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.brahmi
 * Base keyboard class to provide keyboard mapping and functions for Brahmi
 * based languages.
 *
 * @extends NFLCIME.Keyboard
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.brahmi',
		type: 'contextual input',
		inheritance: ['kb'],
		//--- Overriding functions in kb
		determineChanges: function(edit, key) {
			var changes = {
				cursorStart: 0,
				cursorEnd: 0,
				insert: '',
				context: ''
			};
			var entry;
			// look 16 characters ahead and behind
			var evt = {
				type: 'CursorGetContext',
				target: edit,
				textAhead: '',
				textBehind: '',
				behindCount: 16,
				aheadCount: 16
			};
			NFLCIME.dispatchEvent(evt);
			var cxt = {
				ahead: evt.textAhead,
				behind: evt.textBehind
			};
			// get the syllable at the cursor
			var syllable = this.analyseContext(cxt, "backward");
			if (key == 0x08) {
				// backspace
				if (syllable.componentCount > 0) {
					// see if we can remove the components in the order that they were entered
					var last;
					if (this.syllabicComponentSequence && (last = this.syllabicComponentSequence.pop()) && this.hasSameComponents(syllable, last)) {
						this.removeComponents(syllable, last);
					} else {
						// remove the component based on default visual order
						//this.dumpSyllable(compound, 'Syllable:');
						for (var i = this.componentTypesRemovalOrder.length - 1; i >= 0; i--) {
							var type = this.componentTypesRemovalOrder[i];
							if (syllable.components[type]) {
								var deleted = false;
								// if the component being removed exists as part of a compound (i.e. ligature) in the keyboard map, try to remove the whole thing
								for (var j = 0; j < this.compoundSyllables.length; j++) {
									var compound = this.compoundSyllables[j];
									if (compound.components[type]) {
										if (this.hasSameComponents(syllable, compound)) {
											this.removeComponents(syllable, compound);
											break;
										}
									}
								}
								if (!deleted) {
									syllable.components[type] = '';
								}
								break;
							}
						}
					}
					// compose the syllable and insert it, replacing what was there
					changes.insert = this.getSyllableText(syllable);
					changes.cursorStart -= syllable.offsetBehind;
					changes.cursorEnd += syllable.offsetAhead;
					return changes;
				}
			} else {
				var keyinfo = this.lookUpKey(key, this.currentContext);
				if (keyinfo) {
					var add = this.analyseInput(keyinfo.insert);
					if (add.componentCount > 0) {
						if (!this.canAddComponents(syllable, add)) {
							// can't add the component to the current syllable--skip over it and start a new one
							changes.cursorStart += syllable.offsetAhead;
							changes.cursorEnd += syllable.offsetAhead;
							syllable = this.createSyllable();
						}
						this.addComponents(syllable, add);
						// compose the syllable and insert it, replacing what was there
						changes.insert = this.getSyllableText(syllable);
						changes.cursorStart -= syllable.offsetBehind;
						changes.cursorEnd += syllable.offsetAhead;
						// remember the sequence by which the components are added, so we can remove them in the same order
						if (!this.syllabicComponentSequence) {
							this.syllabicComponentSequence = [];
						}
						this.syllabicComponentSequence.push(add);
					} else {
						// just add the text
						changes.insert = keyinfo.insert;
						changes.context = keyinfo.context;
						this.syllabicComponentSequence = [];
					}
					return changes;
				}
			}
		},
		//--- Syllable analysis functions
		dumpSyllable: function(syllable, title) {
			if (syllable) {
				trace(title);
				for (var i = 0; i < this.componentTypes.length; i++) {
					var type = this.componentTypes[i];
					if (syllable.components[type]) {
						trace(type + ': ' + syllable.components[type]);
					}
				}
			}
		},
		dumpUnicode: function(s) {
			var r = '';
			if (s) {
				for (var j = 0; j < s.length; j++) {
					r += 'U+' + s.charCodeAt(j).toString(16) + ' ';
				}
			} else {
				r = s;
			}
			trace('Unicode: ' + r);
		},
		createSyllable: function() {
			var syllable = {
				components: {},
				offsetBehind: 0,
				offsetAhead: 0,
				componentCount: 0
			}
			for (var i = 0; i < this.componentTypes.length; i++) {
				var type = this.componentTypes[i];
				syllable.components[type] = '';
			}
			return syllable;
		},
		decomposeSyllable: function(syllable) {
			for (var i = 0, a = this.equivalentSyllables, l = a.length; i < l; i++) {
				var pair = a[i];
				if (this.hasSameComponents(syllable, pair.composed)) {
					this.removeComponents(syllable, pair.composed);
					this.addComponents(syllable, pair.decomposed);
					break;
				}
			}
		},
		recomposeSyllable: function(syllable) {
			for (var i = 0, a = this.equivalentSyllables, l = a.length; i < l; i++) {
				var pair = a[i];
				if (this.hasSameComponents(syllable, pair.decomposed)) {
					this.removeComponents(syllable, pair.decomposed);
					this.addComponents(syllable, pair.composed);
					break;
				}
			}
		},
		analyseContext: function(cxt, dir) {
			var syllable = this.createSyllable();
			// scan behind first, then ahead
			if (dir == 'forward') {
				this.collectComponentsForward(cxt.ahead, syllable, false);
				this.collectComponentsBackward(cxt.behind, syllable, true);
			} else {
				this.collectComponentsBackward(cxt.behind, syllable, false);
				this.collectComponentsForward(cxt.ahead, syllable, true);
			}
			// break combined character into component parts
			this.decomposeSyllable(syllable);
			//this.dumpSyllable(syllable, 'Context:');
			return syllable;
		},
		analyseText: function(text) {
			var syllable = this.createSyllable();
			this.collectComponentsBackward(text, syllable);
			return syllable;
		},
		analyseInput: function(text) {
			var syllable = this.analyseText(text);
			this.decomposeSyllable(syllable);
			//this.dumpSyllable(syllable, 'Input:');
			return syllable;
		},
		// find as many syllabic components as possible that follow the logical order
		collectComponentsForward: function(text, syllable, zeroWidthOnly) {
			var offset = 0;
			var left_comp_type = syllable.componentTypeBehind;
			var left_placeholder_type = null;
			var leftmost_comp_type = undefined;
			// fix up any script-specific quirks prior to scanning
			text = this.modifyUnicodeBeforeScan(text);
			for (var i = 0; i < 50; i++) {
				var comp = this.getNextSyllabicComponent(text, offset);
				if (comp.type == undefined) {
					break;
				} else if (this.logicalOrder[comp.type] < this.logicalOrder[left_comp_type]) {
					// we've scanned past the current syllable
					break;
				} else if (comp.type == left_comp_type && !this.multipleComponentsInOneSyllable[comp.type]) {
					// can't have more than one in one syllable
					break;
				} else if (zeroWidthOnly && !this.isZeroWidth[comp.type]) {
					break;
				} else {
					syllable.components[comp.type] += comp.characters;
					syllable.componentCount++;
					offset += comp.offset;
					left_comp_type = comp.type;
					if (leftmost_comp_type == undefined) {
						leftmost_comp_type = comp.type;
					}
					if (comp.placeholder) {
						// there's a placeholder, set the current comp type to what it's standing in for
						var policy = this.placeholderPolicies[comp.type];
						if (policy.place == 'ahead') {
							right_comp_type = policy.standingInFor;
						}
					}
				}
			}
			syllable.offsetAhead = offset;
			syllable.componentTypeAhead = leftmost_comp_type;
		},
		// find as many syllabic components as possible, looking backward, that follow the logical order
		collectComponentsBackward: function(text, syllable, zeroWidthOnly) {
			var offset = 0;
			var right_comp_type = syllable.componentTypeAhead;
			var right_placeholder_type = null;
			var rightmost_comp_type = undefined;
			text = this.modifyUnicodeBeforeScan(text);
			for (var i = 0; i < 50; i++) {
				var comp = this.getPreviousSyllabicComponent(text, offset);
				if (comp.type == undefined) {
					break;
				} else if (this.logicalOrder[comp.type] > this.logicalOrder[right_comp_type]) {
					// we've scanned past the current syllable
					break;
				} else if (comp.type == right_comp_type && !this.multipleComponentsInOneSyllable[comp.type]) {
					// can't have more than one in one syllable
					break;
				} else if (zeroWidthOnly && !this.isZeroWidth[comp.type]) {
					break;
				} else {
					syllable.components[comp.type] = comp.characters + syllable.components[comp.type];
					syllable.componentCount++;
					offset += comp.offset;
					right_comp_type = comp.type;
					if (rightmost_comp_type == undefined) {
						rightmost_comp_type = comp.type;
					}
					if (comp.placeholder) {
						// there's a placeholder, set the current comp type to what it's standing in for
						var policy = this.placeholderPolicies[comp.type];
						if (policy.place == 'behind') {
							right_comp_type = policy.standingInFor;
						}
					}
				}
			}
			syllable.offsetBehind = offset;
			syllable.componentTypeBehind = rightmost_comp_type;
		},
		// get the next syllabic component, looking ahead from offset
		getNextSyllabicComponent: function(s, offset) {
			var text = s.substr(offset);
			var longest_matching_len = 0;
			var result = {
				type: undefined,
				offset: 0,
				characters: '',
				placeholder: ''
			};
			for (var i = 0; i < this.componentPatternsLookingForward.length; i++) {
				var group = this.componentPatternsLookingForward[i];
				var match;
				if (match = group.regexp.exec(text)) {
					var full_match = match[0];
					var placeholder = match[1];
					if (full_match.length > longest_matching_len) {
						result.type = group.type;
						result.characters = (!placeholder) ? full_match : full_match.replace(placeholder, '');
						result.placeholder = placeholder;
						result.offset = full_match.length;
						longest_matching_len = full_match.length;
					}
				}
			}
			return result;
		},
		// get the previous syllabic component, looking behind from the end of the string
		getPreviousSyllabicComponent: function(s, offset) {
			var text = s.substr(0, s.length - offset);
			var longest_matching_len = 0;
			var result = {
				type: undefined,
				offset: 0,
				characters: '',
				placeholder: ''
			};
			for (var i = 0; i < this.componentPatternsLookingBackward.length; i++) {
				var group = this.componentPatternsLookingBackward[i];
				var match;
				if (match = group.regexp.exec(text)) {
					var full_match = match[0];
					var placeholder = match[1];
					if (full_match.length > longest_matching_len) {
						result.type = group.type;
						result.characters = (!placeholder) ? full_match : full_match.replace(placeholder, '');
						result.placeholder = placeholder;
						result.offset = full_match.length;
						longest_matching_len = full_match.length;
					}
				}
			}
			return result;
		},
		hasSameComponents: function(base, add) {
			if (!add) {
				return false;
			}
			for (var i = 0; i < this.componentTypes.length; i++) {
				var type = this.componentTypes[i];
				if (add.components[type] && (base.components[type] != add.components[type])) {
					return false;
				}
			}
			return true;
		},
		canAddComponents: function(base, add) {
			var highest_visual_index = 0;
			for (var i = 0; i < this.componentTypes.length; i++) {
				var type = this.componentTypes[i];
				if (base.components[type]) {
					var visual_index = this.visualOrder[type];
					if (visual_index > highest_visual_index) {
						highest_visual_index = visual_index;
					}
				}
			}
			for (var i = 0; i < this.componentTypes.length; i++) {
				var type = this.componentTypes[i];
				if (add.components[type]) {
					if (highest_visual_index > this.visualOrder[type]) {
						// can't add component to the syllable since there're already components that occur later in the visual order
						return false;
					}
					if (base.components[type] && !this.multipleComponentsInOneSyllable[type] && !this.allowComponentReplacement[type]) {
						// can't have multiple components of the same type and replacement isn't allowed
						return false;
					}
					var excluding_type = this.mutualExclusion[type];
					if (excluding_type && base.components[excluding_type]) {
						// the component is in conflict with something else (e.g. can't have both a consonant and an independent vowel)
						return false;
					}
				}
			}
			return true;
		},
		addComponents: function(base, add) {
			for (var i = 0; i < this.componentTypes.length; i++) {
				var type = this.componentTypes[i];
				if (add.components[type]) {
					if (this.multipleComponentsInOneSyllable[type]) {
						base.components[type] += add.components[type];
					} else {
						if (base.components[type]) {
							// since the existing component is being replaced, we need to remove it from the component sequence
							for (var j = this.syllabicComponentSequence.length - 1; j >= 0; j--) {
								var comp = this.syllabicComponentSequence[j];
								if (comp.components[type] == base.components[type]) {
									this.syllabicComponentSequence.splice(j, 1);
								}
							}
						}
						base.components[type] = add.components[type];
					}
				}
			}
			return true;
		},
		removeComponents: function(base, remove) {
			for (var i = 0; i < this.componentTypes.length; i++) {
				var type = this.componentTypes[i];
				if (remove.components[type]) {
					if (base.components[type]) {
						base.components[type] = '';
						base.component_count--;
					}
				}
			}
		},
		// Perform script-specific modifications
		modifySyllable: function(syllable) {},
		// Perform script-specific modifications
		modifyUnicodeBeforeScan: function(unicode) {
			return unicode;
		},
		// Perform script-specific modifications
		modifyUnicodeAfterMerge: function(unicode) {
			return unicode;
		},
		getSyllableText: function(syllable) {
			this.modifySyllable(syllable);
			this.recomposeSyllable(syllable);
			var s = '';
			for (var i = 0; i < this.componentTypes.length; i++) {
				var type = this.componentTypes[i];
				var characters = syllable.components[type];
				if (characters) {
					// see if we need to insert placeholders
					var policy = this.placeholderPolicies[type];
					if (policy) {
						var required = true;
						for (var j = 0; j < policy.inTheAbsenceOf.length; j++) {
							if (syllable.components[policy.inTheAbsenceOf[j]]) {
								required = false;
								break;
							}
						}
						if (required) {
							if (policy.place == 'behind') {
								characters = policy.placeholder + characters;
							} else if (policy.place == 'ahead') {
								characters = characters + policy.placeholder;
							}
						}
					}
					s += characters;
				}
			}
			// deal with any script-specific quirks
			s = this.modifyUnicodeAfterMerge(s);
			//this.dumpUnicode(s);
			return s;
		},
		initialize: function(env, subclassing) {
			// create regular expressions for detecting syllable components
			this.componentPatternsLookingForward = [];
			this.componentPatternsLookingBackward = [];
			for (var i = 0; i < this.componentUnicodeGroups.length; i++) {
				var group = this.componentUnicodeGroups[i];
				var prefix = '',
					suffix = '';
				var policy = this.placeholderPolicies[group.type];
				if (policy) {
					// account for the possible presence of placeholder
					if (policy.place == 'behind') {
						prefix = '(' + policy.placeholder + ')?';
					} else if (policy.place == 'ahead') {
						suffix = '(' + policy.placeholder + ')?';
					}
				}
				this.componentPatternsLookingForward.push({
					type: group.type,
					regexp: new RegExp('^' + prefix + group.pattern + suffix)
				});
				this.componentPatternsLookingBackward.push({
					type: group.type,
					regexp: new RegExp(prefix + group.pattern + suffix + '$')
				});
			}
			// calculate the equivalent syllabic component sets based on the decomposition info
			this.equivalentSyllables = [];
			for (var i = 0; i < this.decomposition.length; i++) {
				var pair = this.decomposition[i];
				var composed = this.analyseText(pair.from);
				var decomposed = this.analyseText(pair.to);
				this.equivalentSyllables.push({
					composed: composed,
					decomposed: decomposed
				});
			}
			// sort the list so the pair with more components come first
			this.equivalentSyllables.sort(function(a, b) {
					return (b.decomposed.componentCount > a.decomposed.componentCount) ? 1 : -1
				})
				// scan the keymaps for compound characters
			var keyboard_maps = ['mapNormal', 'mapShift', 'mapAltCtrl', 'mapCtrlShift', 'mapAltCtrlShift'];
			this.compoundSyllables = [];
			for (var i = 0; i < keyboard_maps.length; i++) {
				var map = this[keyboard_maps[i]];
				if (map) {
					for (key in map) {
						var c = map[key];
						if (typeof(c) == 'string' && c.length > 1) {
							var syllable = this.analyseInput(c);
							if (syllable.componentCount > 1) {
								this.compoundSyllables.push(syllable);
							}
						}
					}
				}
			}
		},
		componentTypes: [
			'consonantAppearingAsSignPre',
			'consonantHalfForms',
			'consonant',
			'vowelIndependent',
			'consonantModifiers',
			'consonantAppearingAsSignPost',
			'vowelAppearingOnLeft',
			'vowelAppearingOnRight',
			'vowelSign',
			'vowelModifiers',
			'syllableModifiers'
		],
		componentTypesRemovalOrder: [
			'vowelAppearingOnLeft',
			'consonantHalfForms',
			'consonant',
			'consonantAppearingAsSignPost',
			'consonantModifiers',
			'vowelIndependent',
			'vowelSign',
			'vowelAppearingOnRight',
			'consonantAppearingAsSignPre',
			'vowelModifiers',
			'syllableModifiers'
		],
		logicalOrder: {
			consonantAppearingAsSignPre: 1,
			consonantHalfForms: 2,
			consonant: 3,
			vowelIndependent: 3,
			consonantModifiers: 4,
			consonantAppearingAsSignPost: 5,
			vowelAppearingOnLeft: 6,
			vowelAppearingOnRight: 7,
			vowelSign: 8,
			vowelModifiers: 9,
			syllableModifiers: 10
		},
		visualOrder: {
			vowelAppearingOnLeft: 1,
			consonantHalfForms: 2,
			consonant: 3,
			vowelIndependent: 3,
			consonantAppearingAsSignPre: 4,
			consonantAppearingAsSignPost: 4,
			consonantModifiers: 4,
			vowelSign: 4,
			syllableModifiers: 4,
			vowelModifiers: 4,
			vowelAppearingOnRight: 4
		},
		multipleComponentsInOneSyllable: {
			consonantHalfForms: true,
			consonantModifiers: true,
			syllableModifiers: true
		},
		allowComponentReplacement: {
			vowelSign: true,
			vowelModifiers: true
		},
		isZeroWidth: {
			consonantAppearingAsSignPre: true,
			consonantAppearingAsSignPost: true,
			consonantModifiers: true,
			vowelSign: true,
			syllableModifiers: true
		},
		placeholderPolicies: {
			'vowelAppearingOnLeft': {
				inTheAbsenceOf: ['consonant', 'consonantHalfForms'],
				place: 'behind',
				placeholder: '\ufeff',
				standingInFor: 'consonant'
			},
			'consonantHalfForms': {
				inTheAbsenceOf: ['consonant'],
				place: 'ahead',
				placeholder: '\u200d',
				standingInFor: 'consonant'
			}
		},
		mutualExclusion: {
			consonant: 'vowelIndependent',
			vowelIndependent: 'consonant'
		},
		/**
		* Describes how Unicode range assigned to a script is mapped to the
		* different character classes
		*/
		componentUnicodeGroups: [],
		/**
		* Describes how some characters in the Unicode range decompose into simpler
		* characters
		*/
		decomposition: []
	}
});
