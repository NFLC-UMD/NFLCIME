/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.arabic.farsi.windows
 * Farsi language windows keyboard map class.
 *
 * @extends NFLCIME.Keyboard
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.arabic.farsi.windows',
		type: 'keyboard layout',
		inheritance: ['kb'],
		/**
		* Lower case key mappings
		* @readonly
		*/
		mapNormal: {
			0xc0: '\u00f7', // `
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
			0x51: '\u0636', // q
			0x57: '\u0635', // w
			0x45: '\u062b', // e
			0x52: '\u0642', // r
			0x54: '\u0641', // t
			0x59: '\u063a', // y
			0x55: '\u0639', // u
			0x49: '\u0647', // i
			0x4f: '\u062e', // o
			0x50: '\u062d', // p
			0xdb: '\u062c', // [
			0xdd: '\u0686', // ]
			0xdc: '\u067e', // \
			0x41: '\u0634', // a
			0x53: '\u0633', // s
			0x44: '\u06cc', // d
			0x46: '\u0628', // f
			0x47: '\u0644', // g
			0x48: '\u0627', // h
			0x4a: '\u062a', // j
			0x4b: '\u0646', // k
			0x4c: '\u0645', // l
			0xba: '\u06a9', // ;
			0xde: '\u06af', // '
			0x0d: '\u000d', // [return]
			0x5a: '\u0638', // z
			0x58: '\u0637', // x
			0x43: '\u0632', // c
			0x56: '\u0631', // v
			0x42: '\u0630', // b
			0x4e: '\u062f', // n
			0x4d: '\u0626', // m
			0xbc: '\u0648', // ,
			0xbe: '.', // .
			0xbf: '/', // /
			0x20: '\u0020' // [space]
		},
		/**
		* Shifted key mappings
		* @readonly
		*/
		mapShift: {
			0xc0: '\u00d7', // `
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
			0x51: '\u064B', // q
			0x57: '\u064c', // w
			0x45: '\u064d', // e
			0x52: '\u0631\u064a\u0627\u0644', // r
			0x54: '\u060c', // t
			0x59: '\u061b', // y
			0x55: ',', // u
			0x49: '[', // i
			0x4f: ']', // o
			0x50: '\\', // p
			0xdb: '{', // [
			0xdd: '}', // ]
			0xdc: '|', // \
			0x41: '\u064e', // a
			0x53: '\u064f', // s
			0x44: '\u0650', // d
			0x46: '\u0651', // f
			0x47: '\u06c0', // g
			0x48: '\u0622', // h
			0x4a: '\u0640', // j
			0x4b: '\u00bb', // k
			0x4c: '\u00ab', // l
			0xba: ':', // ;
			0xde: '"', // '
			0x0d: '\u000d', // [return]
			0x5a: '\u0629', // z
			0x58: '\u064a', // x
			0x43: '\u0698', // c
			0x56: '\u0624', // v
			0x42: '\u0625', // b
			0x4e: '\u0623', // n
			0x4d: '\u0621', // m
			0xbc: '<', // ,
			0xbe: '>', // .
			0xbf: '\u061f', // /
			0x20: '\u0020' // [space]
		}
	}
});
