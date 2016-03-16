/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.gujarati
 * @extends NFLCIME.kb.brahmi
 *
 */

// subclass from the kb.brahmi module, which handles all scripts derived from that script (Devanagari, Bengali, Burmese, etc)
NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.gujarati',
		type: 'contextual input',
		inheritance: ['kb.brahmi'],
		modifySyllable: function(syllable) {
			// if there's a half form but no full form consonant and an AA sign (which can look like the right-side stem of a consonant),
			// change the half form into full form and remove the sign
			// while no one would really type like this (easier to enter the full form), this is implemented for completeness sake
			if (syllable.components.consonantHalfForms && !syllable.components.consonant && syllable.components.vowelAppearingOnRight == '\u0abe') {
				// second to last character is the consonant
				var s = syllable.components.consonantHalfForms;
				syllable.components.consonant = s.substr(s.length - 2, 1);
				syllable.components.consonantHalfForms = s.substr(0, s.length - 2);
				syllable.components.vowelAppearingOnRight = '';
			}
		},
		componentUnicodeGroups: [
			// from specific to general
			{
				type: 'consonantAppearingAsSignPre',
				pattern: '\u0ab0\u0acd'
			}, // RA halant
			{
				type: 'consonantAppearingAsSignPost',
				pattern: '\u0acd\u0ab0'
			}, // halant RA
			{
				type: 'consonantHalfForms',
				pattern: '[\u0a95-\u0ab9]\u0acd'
			}, {
				type: 'consonant',
				pattern: '[\u0a95-\u0ab9]'
			}, {
				type: 'consonantModifiers',
				pattern: '[\u0abc\u0acd]'
			}, {
				type: 'vowelSign',
				pattern: '[\u0ac1-\u0ac8\u0ae2\u0ae3]'
			}, {
				type: 'vowelAppearingOnLeft',
				pattern: '[\u0abf]'
			}, {
				type: 'vowelAppearingOnRight',
				pattern: '[\u0abe\u0ac0\u0ac9\u0acb\u0acc]'
			}, {
				type: 'syllableModifiers',
				pattern: '[\u0a81-\u0a83]'
			}, {
				type: 'vowelIndependent',
				pattern: '[\u0a85-\u0a94\u0ae0\u0ae1]'
			}
		],
		decomposition: [{
			from: '\u0a86',
			to: '\u0a85\u0abe'
		}, {
			from: '\u0a8d',
			to: '\u0a85\u0ac5'
		}, {
			from: '\u0a8f',
			to: '\u0a85\u0ac7'
		}, {
			from: '\u0a90',
			to: '\u0a85\u0ac8'
		}, {
			from: '\u0a91',
			to: '\u0a85\u0abe\u0ac5'
		}, {
			from: '\u0a93',
			to: '\u0a85\u0abe\u0ac7'
		}, {
			from: '\u0a94',
			to: '\u0a85\u0abe\u0ac8'
		}, {
			from: '\u0ac9',
			to: '\u0abe\u0ac5'
		}, {
			from: '\u0acb',
			to: '\u0abe\u0ac7'
		}, {
			from: '\u0acc',
			to: '\u0abe\u0ac8'
		}]
	}
});
