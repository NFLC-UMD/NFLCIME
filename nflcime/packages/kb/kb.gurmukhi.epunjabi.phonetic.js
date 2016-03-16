/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.gurmukhi.epunjabi.phonetic
 * @extends NFLCIME.Keyboard
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.gurmukhi.epunjabi.phonetic',
		type: 'keyboard layout',
		inheritance: ['kb'],

		initialize: function() {
			// build the multikeyCombinations table dynamically
			var consonants = [];
			for (var c = 0x0a15; c <= 0x0a39; c++) consonants.push(String.fromCharCode(c));
			for (var c = 0x0a59; c <= 0x0a5e; c++) consonants.push(String.fromCharCode(c));

			// unaspirated consonant + HA = aspirated consonant
			var unaspirated;
			for (unaspirated in this.consonantToAspiratedConsonant) {
				var aspirated = this.consonantToAspiratedConsonant[unaspirated];
				this.multikeyCombinations[unaspirated + '\u0a39'] = aspirated;
			}

			// consonant + independent vowel = consonant + vowel sign
			var independent_vowel;
			for (independent_vowel in this.independentVowelToVowelSign) {
				var vowel_sign = this.independentVowelToVowelSign[independent_vowel];
				for (var i = 0; i < consonants.length; i++) {
					var consonant = consonants[i];
					this.multikeyCombinations[consonant + independent_vowel] = consonant + vowel_sign;
				}
			}

			// vowel sign + independent vowel = consonant + long/short vowel sign
			for (independent_vowel in this.independentVowelToVowelSign) {
				var vowel_sign_short = this.independentVowelToVowelSign[independent_vowel];
				var vowel_sign_long = this.shortVowelSignToLongVowelSign[vowel_sign_short];
				if (vowel_sign_long) {
					for (var i = 0; i < consonants.length; i++) {
						var consonant = consonants[i];
						this.multikeyCombinations[consonant + vowel_sign_short + independent_vowel] = consonant + vowel_sign_long;
						this.multikeyCombinations[consonant + vowel_sign_long + independent_vowel] = consonant + vowel_sign_short;
					}
				}
			}

			// independent vowel + independent vowel = long/short independent vowel
			var independent_vowel_short;
			for (independent_vowel_short in this.shortVowelToLongVowel) {
				var independent_vowel_long = this.shortVowelToLongVowel[independent_vowel_short];
				this.multikeyCombinations[independent_vowel_short + independent_vowel_short] = independent_vowel_long;
				this.multikeyCombinations[independent_vowel_long + independent_vowel_short] = independent_vowel_short;
			}
		},

		consonantToAspiratedConsonant: {
			'\u0a15': '\u0a16',
			'\u0a17': '\u0a18',
			'\u0a1a': '\u0a1b',
			'\u0a1c': '\u0a1d',
			'\u0a1f': '\u0a20',
			'\u0a21': '\u0a22',
			'\u0a24': '\u0a25',
			'\u0a26': '\u0a27',
			'\u0a2a': '\u0a2b',
			'\u0a2c': '\u0a2d'
		},

		independentVowelToVowelSign: {
			'\u0a05': '\u0a3e',
			'\u0a06': '\u0a3e',
			'\u0a07': '\u0a3f',
			'\u0a08': '\u0a40',
			'\u0a09': '\u0a41',
			'\u0a0a': '\u0a42',
			'\u0a0f': '\u0a47',
			'\u0a10': '\u0a48',
			'\u0a13': '\u0a4b',
			'\u0a14': '\u0a4c'
		},

		shortVowelToLongVowel: {
			'\u0a05': '\u0a06',
			'\u0a07': '\u0a08',
			'\u0a09': '\u0a0a',
			'\u0a0f': '\u0a10',
			'\u0a13': '\u0a14'
		},

		shortVowelSignToLongVowelSign: {
			'\u0a3f': '\u0a40',
			'\u0a41': '\u0a42',
			'\u0a47': '\u0a48',
			'\u0a4b': '\u0a4c'
		},

		mapNormal: {
			0xc0: '\u0a02', // `
			0x31: '\u0a67', // 1
			0x32: '\u0a68', // 2
			0x33: '\u0a69', // 3
			0x34: '\u0a6a', // 4
			0x35: '\u0a6b', // 5
			0x36: '\u0a6c', // 6
			0x37: '\u0a6d', // 7
			0x38: '\u0a6e', // 8
			0x39: '\u0a6f', // 9
			0x30: '\u0a66', // 0
			0xbd: '-', // -
			0xbb: '=', // =

			0x51: '\u0a15\u0a3c', // q
			0x57: '', // w
			0x45: '\u0a0f', // e
			0x52: '\u0a30', // r
			0x54: '\u0a24', // t
			0x59: '\u0a2f', // y
			0x55: '\u0a09', // u
			0x49: '\u0a07', // i
			0x4f: '\u0a13', // o
			0x50: '\u0a2a', // p
			0xdb: '[', // [
			0xdd: ']', // ]
			0xdc: '\u0a4d', // \

			0x41: '\u0a05', // a
			0x53: '\u0a38', // s
			0x44: '\u0a26', // d
			0x46: '\u0a5e', // f
			0x47: '\u0a17', // g
			0x48: '\u0a39', // h
			0x4a: '\u0a1c', // j
			0x4b: '\u0a15', // k
			0x4c: '\u0a32', // l
			0xba: ';', // ;
			0xde: '\u0a71', // '
			0x0d: '\u000d', // [return]

			0x5a: '\u0a5b', // z
			0x58: '', // x
			0x43: '\u0a1a', // c
			0x56: '\u0a35', // v
			0x42: '\u0a2c', // b
			0x4e: '\u0a28', // n
			0x4d: '\u0a2e', // m
			0xbc: ',', // ,
			0xbe: '.', // .
			0xbf: '/', // /

			0x20: '\u0020' // [space]
		},

		mapShift: {
			0xc0: '\u0a01', // `
			0x31: '!', // 1
			0x32: '@', // 2
			0x33: '#', // 3
			0x34: '$', // 4
			0x35: '%', // 5
			0x36: '^', // 6
			0x37: '&', // 7
			0x38: '*', // 8
			0x39: '(', // 9
			0x30: ')', // 0
			0xbd: '_', // -
			0xbb: '+', // =

			0x51: '', // q
			0x57: '', // w
			0x45: '\u0a10', // e
			0x52: '\u0a5c', // r
			0x54: '\u0a1f', // t
			0x59: '', // y
			0x55: '\u0a73', // u
			0x49: '\u0a72', // i
			0x4f: '\u0a14', // o
			0x50: '', // p
			0xdb: '', // [
			0xdd: '', // ]
			0xdc: '\u0964', // \

			0x41: '\u0a06', // a
			0x53: '', // s
			0x44: '\u0a21', // d
			0x46: '', // f
			0x47: '\u0a5a', // g
			0x48: '\u0a03', // h
			0x4a: '', // j
			0x4b: '\u0a59', // k
			0x4c: '\u0a33', // l
			0xba: ':', // ;
			0xde: '"', // '
			0x0d: '\u000d', // [return]

			0x5a: '', // z
			0x58: '', // x
			0x43: '', // c
			0x56: '', // v
			0x42: '', // b
			0x4e: '\u0a23', // n
			0x4d: '\u0a74', // m
			0xbc: '<', // ,
			0xbe: '>', // .
			0xbf: '?', // /

			0x20: '\u0020' // [space]
		},

		multikeyCombinations: {}
	}
});
