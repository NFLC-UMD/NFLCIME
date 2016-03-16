/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.arabic.farsi.phonetic
 * Farsi language phonetic keyboard map class.
 *
 * @extends NFLCIME.Keyboard
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.arabic.farsi.phonetic',
		type: 'keyboard layout',
		inheritance: ['kb'],
		/**
		* Lower case key mappings
		* @readonly
		*/
		mapNormal: {
			0xc0: '\u200c', // `
			0x31: '\u06f1', // 1
			0x32: '\u06f2', // 2
			0x33: '\u06f3', // 3
			0x34: '\u06f4', // 4
			0x35: '\u06f5', // 5
			0x36: '\u06f6', // 6
			0x37: '\u06f7', // 7
			0x38: '\u06f8', // 8
			0x39: '\u06f9', // 9
			0x30: '\u06f0', // 0
			0xbd: '-', // -
			0xbb: '=', // =
			0x51: '\u0642', // q
			0x57: '\u0634', // w
			0x45: '\u0639', // e
			0x52: '\u0631', // r
			0x54: '\u062a', // t
			0x59: '\u06cc', // y
			0x55: '\u064e', // u
			0x49: '\u0650', // i
			0x4f: '\u064f', // o
			0x50: '\u067e', // p
			0xdb: '[', // [
			0xdd: ']', // ]
			0xdc: '\\', // \
			0x41: '\u0627', // a
			0x53: '\u0633', // s
			0x44: '\u062f', // d
			0x46: '\u0641', // f
			0x47: '\u06af', // g
			0x48: '\u0647', // h
			0x4a: '\u062c', // j
			0x4b: '\u06a9', // k
			0x4c: '\u0644', // l
			0xba: '\u061b', // ;
			0xde: '\'', // '
			0x0d: '\u000d', // [return]
			0x5a: '\u0632', // z
			0x58: '\u062e', // x
			0x43: '\u0686', // c
			0x56: '\u0648', // v
			0x42: '\u0628', // b
			0x4e: '\u0646', // n
			0x4d: '\u0645', // m
			0xbc: '\u060c', // ,
			0xbe: '.', // .
			0xbf: '/', // /
			0x20: '\u0020' // [space]
		},
		/**
		* Shifted key mappings
		* @readonly
		*/
		mapShift: {
			0xc0: '\u200d', // `
			0x31: '!', // 1
			0x32: '@', // 2
			0x33: '#', // 3
			0x34: '$', // 4
			0x35: '%', // 5
			0x36: '\u00d7', // 6
			0x37: '&', // 7
			0x38: '*', // 8
			0x39: '(', // 9
			0x30: ')', // 0
			0xbd: '_', // -
			0xbb: '+', // =
			0x51: '\u063a', // q
			0x57: '\u0625', // w
			0x45: '\u0621', // e
			0x52: '\u0623', // r
			0x54: '\u0637', // t
			0x59: '\u0626', // y
			0x55: '\u064b', // u
			0x49: '\u00ab', // i
			0x4f: '\u00bb', // o
			0x50: '\u0651', // p
			0xdb: '{', // [
			0xdd: '}', // ]
			0xdc: '|', // \
			0x41: '\u0622', // a
			0x53: '\u0635', // s
			0x44: '\u062b', // d
			0x46: '\u0647\u200c\u06cc', // f
			0x47: '\u06c2', // g
			0x48: '\u062d', // h
			0x4a: '\u0698', // j
			0x4b: '\u0643', // k
			0x4c: '\u06c3', // l
			0xba: ':', // ;
			0xde: '"', // '
			0x0d: '\u000d', // [return]
			0x5a: '\u0636', // z
			0x58: '\u0638', // x
			0x43: '\u0630', // c
			0x56: '\u0624', // v
			0x42: '\u064a', // b
			0x4e: '\u200c\u0647\u0627', // n
			0x4d: '\u0645\u06cc\u200c', // m
			0xbc: '<', // ,
			0xbe: '>', // .
			0xbf: '\u061f', // /
			0x20: '\u0020' // [space]
		},
		/**
		* CTRL-ALT key mappings
		* @readonly
		*/
		mapAltCtrl: {
			0xc0: '~', // `
			0x31: '', // 1
			0x32: '', // 2
			0x33: '', // 3
			0x34: '', // 4
			0x35: '', // 5
			0x36: '', // 6
			0x37: '', // 7
			0x38: '\u066d', // 8
			0x39: '', // 9
			0x30: '\u00f7', // 0
			0xbd: '\u0640', // -
			0xbb: '\u2013', // =
			0x51: '', // q
			0x57: '\u0655', // w
			0x45: '', // e
			0x52: '\u0654', // r
			0x54: '', // t
			0x59: '\u0649', // y
			0x55: '', // u
			0x49: '\u064d', // i
			0x4f: '\u064c', // o
			0x50: '\u0652', // p
			0xdb: '\ufd3e', // [
			0xdd: '\ufd3f', // ]
			0xdc: '\u2014', // \
			0x41: '\u0653', // a
			0x53: '', // s
			0x44: '', // d
			0x46: '', // f
			0x47: '', // g
			0x48: '', // h
			0x4a: '', // j
			0x4b: '', // k
			0x4c: '\u0656', // l
			0xba: ';', // ;
			0xde: '\u0670', // '
			0x0d: '\u000d', // [return]
			0x5a: '', // z
			0x58: '', // x
			0x43: '', // c
			0x56: '', // v
			0x42: '', // b
			0x4e: '', // n
			0x4d: '', // m
			0xbc: ',', // ,
			0xbe: '\u2026', // .
			0xbf: '/', // /
			0x20: '\u0020' // [space]
		}
	}
});
