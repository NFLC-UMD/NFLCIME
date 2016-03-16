/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.bengali
 * Base keyboard class for Bengali languages:
 * - Devanagari
 * - Bengali
 * - Burmese
 *
 *
 * Overwrites componentUnicodeGroups and decomposition provided by
 * {@link NFLCIME.kb.brahmi}.
 *
 * @extends NFLCIME.kb.brahmi
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.bengali',
		type: 'contextual input',
		inheritance: ['kb.brahmi'],
		componentUnicodeGroups: [
			// from specific to general
			{
				type: 'consonantAppearingAsSignPre',
				pattern: '\u09b0\u09cd'
			}, // RA halant
			{
				type: 'consonantAppearingAsSignPost',
				pattern: '\u09cd[\u09b0\u09af]'
			}, // halant RA, halant ya
			{
				type: 'consonantHalfForms',
				pattern: '[\u0995-\u09b9\u09dc-\u09df]\u09cd'
			}, {
				type: 'consonant',
				pattern: '[\u0995-\u09b9\u09dc-\u09df]'
			}, {
				type: 'consonantModifiers',
				pattern: '[\u09bc\u09bd]'
			}, {
				type: 'vowelSign',
				pattern: '[\u09c1-\u09c4\u09e2\u09e3]'
			}, {
				type: 'vowelAppearingOnLeft',
				pattern: '[\u09bf\u09c7\u09c8\u09cb\u09cc]'
			}, {
				type: 'vowelAppearingOnRight',
				pattern: '[\u09be\u09c0\u09d7]'
			}, {
				type: 'syllableModifiers',
				pattern: '[\u0981-\u0983]'
			}, {
				type: 'vowelIndependent',
				pattern: '[\u0985-\u0994\u09e0\u09e1]'
			}
		],
		decomposition: [{
			from: '\u0986',
			to: '\u0985\u09be'
		}, {
			from: '\u0986',
			to: '\u0985\u09be'
		}, {
			from: '\u09cb',
			to: '\u09c7\u09be'
		}, {
			from: '\u09cc',
			to: '\u09c7\u09d7'
		}]
	}
});
