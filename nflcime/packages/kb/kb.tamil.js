/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.tamil
 * @extends NFLCIME.kb.brahmi
 *
 */

// subclass from the kb.brahmi module, which handles all scripts derived from that script (Devanagari, Bengali, Burmese, etc)
NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.tamil',
		type: 'contextual input',
		inheritance: ['kb.brahmi'],
		componentUnicodeGroups: [
			// from specific to general
			{
				type: 'consonantAppearingAsSignPre',
				pattern: '\u0bb0\u0bcd'
			}, // halant RA
			{
				type: 'consonantAppearingAsSignPost',
				pattern: '\u0bcd\u0bb0'
			}, // RA halant
			{
				type: 'consonantHalfForms',
				pattern: '[\u0b95-\u0bb9]\u0bcd'
			}, {
				type: 'consonant',
				pattern: '[\u0b95-\u0bb9]'
			}, {
				type: 'consonantModifiers',
				pattern: '[\u0bcd]'
			}, {
				type: 'vowelSign',
				pattern: '[\u0bc0\u0bc1\u0bc2]'
			}, {
				type: 'vowelAppearingOnLeft',
				pattern: '[\u0bc6-\u0bc8\u0bca-\u0bcc]'
			}, {
				type: 'vowelAppearingOnRight',
				pattern: '[\u0bbe\u0bbf\u0bd7]'
			}, {
				type: 'syllableModifiers',
				pattern: '[\u0b82\u0b83]'
			}, {
				type: 'vowelIndependent',
				pattern: '[\u0b85-\u0b94]'
			}
		],
		decomposition: [{
			from: '\u0b89',
			to: '\u0b89\u0bd7'
		}, {
			from: '\u0b94',
			to: '\u0b92\u0bd7'
		}, {
			from: '\u0bca',
			to: '\u0bc6\u0bbe'
		}, {
			from: '\u0bcb',
			to: '\u0bc7\u0bbe'
		}, {
			from: '\u0bcc',
			to: '\u0bc6\u0bd7'
		}]
	}
});
