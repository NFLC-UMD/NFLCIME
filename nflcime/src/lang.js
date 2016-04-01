/**
 * @docauthor Steve Drucker <sdrucker@figleaf.com>
 *
 * @class NFLCIME.Language
 * Responsible for launching on-screen keyboard when change of language is detected
 *
 */



NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'lang',
		type: 'language',
		dependency: ['cursor'],
		onModuleActivate: function(evt) {
			
			var module = evt.module;
			if (module == this) {
				NFLCIME.addEventListener('FocusChanged', this);
				NFLCIME.addEventListener('CursorMoved', this);
				NFLCIME.addEventListener('LanguageRescan', this);
				NFLCIME.addEventListener('LanguageChange', this);
				NFLCIME.addEventListener('LanguageGet', this);
				NFLCIME.addEventListener('LanguageDetect', this);
				NFLCIME.addEventListener('LanguageSetHint', this);
				NFLCIME.addEventListener('OptionSet', this);
				NFLCIME.addEventListener('OptionGet', this);
			} else if (module.type == 'keyboard layout') {
				this.keyboard = module;
				this.launchKeyboardInterface();
			} else if (module.type == 'encoding converter') {
				this.converter = module;
				this.launchConverterInterface();
			} else if (module.id == 'ui.kb') {
				this.keyboardInterface = module;
			} else if (module.id == 'ui.cvt') {
				this.converterInterface = module;
			} else if (module.id == 'ui.lang') {
				this.languageInterface = module;
			}
		},
		onModuleDeactivate: function(evt) {
			var module = evt.module;
			if (module == this) {
				NFLCIME.removeEventListener('FocusChanged', this);
				NFLCIME.removeEventListener('CursorMoved', this);
				NFLCIME.removeEventListener('LanguageRescan', this);
				NFLCIME.removeEventListener('LanguageChange', this);
				NFLCIME.removeEventListener('LanguageDetect', this);
				NFLCIME.removeEventListener('LanguageGet', this);
				NFLCIME.removeEventListener('LanguageSetHint', this);
				NFLCIME.removeEventListener('OptionSet', this);
				NFLCIME.removeEventListener('OptionGet', this);
			} else if (module == this.keyboard) {
				this.keyboard = null;
				// take down the user interface too
				if (this.keyboardInterface) {
					NFLCIME.dispatchEvent({
						type: 'ModuleDeactivate',
						module: this.keyboardInterface,
						animation: 'fade-out'
					});
				}
			} else if (module == this.converter) {
				this.converter = null;
				if (this.converterInterface) {
					NFLCIME.dispatchEvent({
						type: 'ModuleDeactivate',
						module: this.converterInterface,
						animation: 'fade-out'
					});
				}
			} else if (module == this.keyboardInterface) {
				this.keyboardInterface = null;
			} else if (module == this.converterInterface) {
				this.converterInterface = null;
			} else if (module == this.languageInterface) {
				this.languageInterface = null;
			}
		},
		onFocusChanged: function(evt) {
			this.onCursorMoved(evt);
		},
		onCursorMoved: function(evt) {
			var edit = evt.target;
			var evt = {
				type: 'ServiceApplicable',
				target: edit,
				service: 'kb,cvt',
				applicable: false
			};
			NFLCIME.dispatchEvent(evt);
			var tag = (evt.applicable) ? this.getLangTag(edit) : 'null';
			//		console.log('CursorMoved',tag);
			if (this.languageTag != tag) {
				var dir = (tag == 'null' || tag == 'unknown') ? '' : (dir = this.findLanguageByIETFTag(tag)) && dir.direction;
				NFLCIME.dispatchEvent({
					type: 'LanguageChange',
					languageTag: tag,
					languageDir: dir
				});
			}
		},
		onLanguageRescan: function(evt) {
			// get the focused edit and
			var evt = {
				type: 'CursorGetFocusedEdit',
				target: null
			};
			NFLCIME.dispatchEvent(evt);
			this.onFocusChanged(evt);
		},
		onLanguageChange: function(evt) {
			var tag = evt.languageTag;
			var language = this.findLanguageByIETFTag(tag);
			if (this.language != language) {
				this.language = language;
				if (this.language) {
					this.keyboardId = this.getPreference('kb', 'id', this.language.id);
					this.keyboardShow = this.getPreferenceBoolean('kb', 'show', this.language.id);
					this.converterId = this.getPreference('cvt', 'id', this.language.id);
				} else {
					this.keyboardId = null;
					this.converterId = null;
				}
				this.launchLanguageInterface();
				this.launchKeyboard();
				this.launchConverter();
			}
		},
		onLanguageGet: function(evt) {
			if (this.language) {
				evt.languageTag = this.languageTag;
				if (this.language.twoLetterISO) {
					evt.code2 = this.language.twoLetterISO;
				} else if (this.language.threeLetterISO) {
					// use the two letter code of the macro language if language belongs to one
					var macro = this.findMacroLanguageByThreeLetterCode(this.language.threeLetterISO)
					if (macro) {
						evt.code2 = macro.twoLetterISO;
					}
				}
				if (this.language.threeLetterISO) {
					evt.code3 = this.language.threeLetterISO;
				}
				evt.script = this.language.script;
				evt.direction = this.language.direction;
			}
		},
		onLanguageSetHint: function(evt) {
			this.languageHint = evt.languageTag;
		},
		onLanguageDetect: function(evt) {
			var segment = evt.textSegment;
			var segment_language = null;
			var segment_language_tag = null;
			// text is set to a symbolic font
			if (segment.style && segment.style.fontFamily && /symbol|wingding|webding/i.test(segment.style.fontFamily)) {
				return;
			}
			if (this.languageHint) {
				// there's a language hint--see if it matches
				var likely_language = this.findLanguageByIETFTag(this.languageHint);
				if (likely_language) {
					if (this.matchTextSegmentToLanguage(segment, likely_language)) {
						segment_language = likely_language;
						segment_language_tag = this.languageHint;
					}
				}
			}
			if (!segment_language && this.language) {
				// see if the segment's tag matches that of the current language
				if (this.matchTextSegmentToLanguage(segment, this.language)) {
					segment_language = this.language;
					segment_language_tag = this.languageTag;
				}
			}
			if (!segment_language && segment.lang) {
				// use the tag of the segment
				segment_language = this.findLanguageByIETFTag(segment.lang);
				if (segment_language) {
					segment_language_tag = segment_language.fullTag;
				}
			}
			if (!segment_language) {
				// a free-for-all--whichever language grabs the most letters win!
				var highest = this.getEnglishCharacterCount(segment.text);
				for (var i = 0; i < this.languages.length; i++) {
					var possible_language = this.languages[i];
					var count = this.getLanguageCharacterCount(segment.text, possible_language, false);
					if (count > highest) {
						segment_language = possible_language;
						segment_language_tag = possible_language.fullTag;
						highest = count;
					}
				}
			}
			if (segment_language) {
				if (segment_language_tag) {
					evt.languageTag = segment_language_tag;
				}
				if (segment_language.twoLetterISO) {
					evt.code2 = segment_language.twoLetterISO;
				} else if (segment_language.threeLetterISO) {
					var macro = this.findMacroLanguageByThreeLetterCode(segment_language.threeLetterISO)
					if (macro && macro.twoLetterISO) {
						evt.code2 = macro.twoLetterISO;
					}
				}
				if (segment_language.threeLetterISO) {
					evt.code3 = segment_language.threeLetterISO;
				}
				if (segment_language.script) {
					evt.script = segment_language.script;
					evt.direction = segment_language.direction;
				} else {
					// see which of the variant is employed
					var highest_count = 0;
					var variant_used = null;
					if (segment_language.variants) {
						var text = segment.text;
						for (var i = 0; i < segment_language.variants.length; i++) {
							var variant_tag = segment_language.variants[i];
							var variant = this.findLanguageByIETFTag(variant_tag);
							if (variant) {
								var count = this.getLanguageCharacterCount(text, variant, false);
								if (count > highest_count) {
									highest_count = count;
									variant_used = variant;
								}
							}
						}
					}
					if (variant_used) {
						evt.script = variant_used.script;
						evt.direction = variant_used.direction;
					} else {
						evt.script = '';
						evt.direction = '';
					}
				}
			}
		},
		onOptionSet: function(evt) {
			var name = evt.name;
			var value = evt.value;
			switch (name) {
				case 'use-keyboard':
					if (this.keyboardEnabled != value) {
						this.keyboardEnabled = value;
						this.launchKeyboard();
						this.savePreference('kb', 'enabled', null, this.keyboardEnabled);
					}
					break;
				case 'keyboard-id':
					if (this.keyboardId != value) {
						this.keyboardId = value;
						this.launchKeyboard();
						if (this.language) {
							this.savePreference('kb', 'id', this.language.id, this.keyboardId);
						}
					}
					break;
				case 'show-keyboard':
					if (this.keyboardShow != value) {
						this.keyboardShow = value;
						this.launchKeyboardInterface();
						if (this.language) {
							this.savePreference('kb', 'show', this.language.id, this.keyboardShow);
						}
					}
					break;
				case 'use-converter':
					if (this.converterEnabled != value) {
						this.converterEnabled = value;
						this.launchConverter();
						this.savePreference('cvt', 'enabled', null, this.converterEnabled);
					}
					break;
				case 'converter-id':
					if (this.converterId != value) {
						this.converterId = value;
						this.launchConverter();
						if (this.language) {
							this.savePreference('cvt', 'id', this.language.id, this.converterId);
						}
					}
					break;
			}
		},
		onOptionGet: function(evt) {
			var name = evt.name;
			switch (name) {
				case 'use-keyboard':
					evt.value = this.keyboardEnabled;
					break;
				case 'keyboard-id':
					evt.value = this.keyboardId;
					break;
				case 'show-keyboard':
					evt.value = this.keyboardShow;
					break;
				case 'use-converter':
					evt.value = this.converterEnabled;
					break;
				case 'converter-id':
					evt.value = this.converterId;
					break;
			}
		},
		//--- Private functions
		getLangTag: function(edit) {
			var evt = {
				type: 'CursorGetContainer',
				target: edit,
				container: null
			};
			NFLCIME.dispatchEvent(evt);
			var element = evt.container;
			for (var e = element; e && e.nodeType == 1; e = e.parentNode) {
				var tag = e.getAttribute('lang');
				if (!tag) {
					tag = e.getAttribute('xml:lang')
				}
				if (tag) {
					return tag.toLowerCase();
				}
			}
			return 'unknown';
		},
		findLanguageByIETFTag: function(tag) {
			// see if there's a match for the full tag first
			for (var i = 0, count = this.languages.length; i < count; i++) {
				if (this.languages[i].fullTag == tag) {
					return this.languages[i];
				}
			}
			var match;
			if (match = /^[a-z]{3}/.exec(tag)) {
				var lang = this.findLanguageByThreeLetterCode(match[0]);
				if (!lang) {
					lang = this.findMacroLanguageByThreeLetterCode(match[0]);
				}
				return lang;
			} else if (match = /^[a-z]{2}/.exec(tag)) {
				lang = this.findLanguageByTwoLetterCode(match[0]);
				return lang;
			}
		},
		findLanguageByTwoLetterCode: function(code) {
			for (var i = 0; i < this.languages.length; i++) {
				var lang = this.languages[i];
				if (lang.twoLetterISO == code) {
					return lang;
				}
			}
		},
		findLanguageByThreeLetterCode: function(code) {
			for (var i = 0; i < this.languages.length; i++) {
				var lang = this.languages[i];
				if (lang.threeLetterISO == code) {
					return lang;
				}
			}
		},
		findMacroLanguageByThreeLetterCode: function(code) {
			for (var i = 0; i < this.languages.length; i++) {
				var lang = this.languages[i];
				if (lang.variants) {
					for (var j = 0; j < lang.variants.length; j++) {
						if (lang.variants[j] == code) {
							return lang;
						}
					}
				}
			}
		},
		getLanguageCharacterCount: function(text, language, scanVariants) {
			if (language.characterSet) {
				// see how many letters are removed by String.remove()
				var lang_re = new RegExp('[' + language.characterSet + ']+', 'g');
				var text_with_lang_char_removed = text.replace(lang_re, '');
				return text.length - text_with_lang_char_removed.length;
			} else {
				// character set isn't know--language is written in more than one scripts
				if (scanVariants && language.variants) {
					var highest_count = 0;
					for (var i = 0; i < language.variants.length; i++) {
						var variant_tag = language.variants[i];
						var variant = this.findLanguageByIETFTag(variant_tag);
						if (variant) {
							var count = this.getLanguageCharacterCount(text, variant, false);
							if (count > highest_count) {
								highest_count = count;
							}
						}
					}
					return highest_count;

				} else {
					return 0;
				}
			}
		},
		getEnglishCharacterCount: function(text) {
			var text_with_eng_char_removed = text.replace(/[a-zA-Z]+/g, '');
			return text.length - text_with_eng_char_removed.length;
		},
		matchTextSegmentToLanguage: function(segment, language) {
			if (segment.lang) {
				var tag = segment.lang.toLowerCase();
				var segment_language = this.findLanguageByIETFTag(tag);
				if (segment_language) {
					if (language == segment_language) {
						return true;
					} else {
						// maybe the target language is a variant?
						if (segment_language.variants) {
							var iso3 = language.threeLetterISO;
							for (var i = 0; i < segment_language.variants.length; i++) {
								var variant_tag = segment_language.variants[i];
								if (variant_tag == iso3 || variant_tag == tag) {
									return true;
								}
							}
						}
					}
				}
			}
			// can't find it by the tag--see if the text contain character used by the language
			var count = this.getLanguageCharacterCount(segment.text, language, true);
			if (count > 0) {
				// there's a match if the segment contains more letter specific to that language than English letters
				if (count > this.getEnglishCharacterCount(segment.text)) {
					return true;
				}
			}
			return false;
		},
		launchLanguageInterface: function() {
			
			if (this.language && this.language.kbd) {
				var url = 'ui.lang.' + this.language.id + '.html';
				NFLCIME.dispatchEvent({
					type: 'UIModuleLoad',
					moduleId: 'ui.lang',
					url: url,
					options: {
						hAlign: 'left',
						vAlign: 'bottom'
					}
				});
			} else {
				if (this.languageInterface) {
					NFLCIME.dispatchEvent({
						type: 'ModuleDeactivate',
						module: this.languageInterface,
						animation: 'fade-out'
					});
				}
			}
		},



		/**
		 * Launch onscreen keyboard
		 *
		 * 
		 */

		launchKeyboard: function() {

			if (this.keyboardId && this.keyboardEnabled && this.language.kbd) {
				// load and activate the layout
				NFLCIME.dispatchEvent({
					type: 'ModuleLoad',
					moduleId: this.keyboardId,
					activate: true
				});
			} else {
				// deactivate the current keyboard
				if (this.keyboard) {
					NFLCIME.dispatchEvent({
						type: 'ModuleDeactivate',
						module: this.keyboard
					});
				}
			}
		},

		/**
		 * Launch onscreen keyboard interface
		 *
		 * 
		 */

		launchKeyboardInterface: function() {
			if (this.keyboard && this.keyboardShow) {
				var url = 'ui.' + this.keyboard.id + '.html';
				NFLCIME.dispatchEvent({
					type: 'UIModuleLoad',
					moduleId: 'ui.kb',
					url: url,
					options: {
						hAlign: 'right',
						vAlign: 'top'
					}
				});
			} else {
				if (this.keyboardInterface) {
					NFLCIME.dispatchEvent({
						type: 'ModuleDeactivate',
						module: this.keyboardInterface,
						animation: 'fade-out'
					});
				}
			}
		},
		launchConverter: function() {
			if (this.converterId && this.converterEnabled) {
				// load and activate the converter
				NFLCIME.dispatchEvent({
					type: 'ModuleLoad',
					moduleId: this.converterId,
					activate: true
				});
			} else {
				// deactivate the current converter
				if (this.converter) {
					NFLCIME.dispatchEvent({
						type: 'ModuleDeactivate',
						module: this.converter
					});
				}
			}
		},
		launchConverterInterface: function() {
			if (this.converter) {
				var url = 'ui.cvt.html';
				//NFLCIME.dispatchEvent( { type:'UIModuleLoad', moduleId:'ui.cvt', url:url } );
			}
		},
		savePreference: function(type, name, lang, value) {
			// save it to persistent storage
			var id = type + ((lang) ? '.' + lang : '');
			var evt = {
				type: 'PersistenceSetValue',
				id: id,
				name: name,
				value: value
			};
			NFLCIME.dispatchEvent(evt);
			// save the value in case there is no support
			this.preference[name + '.' + id] = value.toString();
		},
		getPreference: function(type, name, lang) {
			// retrieve it from persistent storage
			var id = type + ((lang) ? '.' + lang : '');
			var value = this.preference[name + '.' + id];
			if (value != undefined) {
				return value;
			}
			var evt = {
				type: 'PersistenceGetValue',
				id: id,
				name: name
			};
			NFLCIME.dispatchEvent(evt);

			return evt.value;
		},
		getPreferenceBoolean: function(type, name, lang) {
			var value = this.getPreference(type, name, lang);
			if (value != undefined) {
				return (value == 'true') ? true : false;
			} else {
				return undefined;
			}
		},
		initialize: function(env, subclassing) {
			console.log('lang initializing!');
			var me = this;
			this.defaultIETFTag = env.configuration.defaultIETFTag;

			NFLCIME.addEventListener('ModuleActivate', this);
			NFLCIME.addEventListener('ModuleDeactivate', this);
			this.keyboardEnabled = me.getPreferenceBoolean('kb', 'enabled');
			this.converterEnabled = me.getPreferenceBoolean('cvt', 'enabled');

			var url = NFLCIME.mapUrlToPackage('languages.json');
			var full_url = (/^\w+:/.test(url) || /^\//.test(url)) ? url : env.scriptURLRoot + url;
			
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && xhr.status == 200) {
					me.languages = JSON.parse(xhr.responseText);
					// sort the list of language by weight so the more common languages appear first
					me.languages.sort(function(a, b) {
						if (a.weight == b.weight) return 0;
						if (a.weight === undefined) return 1;
						if (b.weight === undefined) return -1;
						return (a.weight > b.weight) ? -1 : 1;
					});

				}
			};
			xhr.open('GET', full_url, true);
			xhr.send();
		},
		//--- Private variables
		language: null,
		languageTag: null,
		languageHint: null,
		languageInterface: null,
		keyboard: null,
		keyboardId: null,
		keyboardEnabled: true,
		keyboardShow: true,
		keyboardInterface: null,
		converter: null,
		converterId: null,
		converterEnabled: true,
		converterWindow: false,
		converterInterface: null,
		preference: {},
		languages: null
	}
});
