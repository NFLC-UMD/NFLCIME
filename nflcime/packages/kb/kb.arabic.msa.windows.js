/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.arabic.msa.windows
 * Modern Standard Arabic (MSA) language windows keyboard map class.
 *
 * @extends NFLCIME.Keyboard
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.arabic.msa.windows',
		type: 'keyboard layout',
		inheritance: ['kb'],
		mapNormal: {
			0xc0: '\u0630', // `
			0x31: '1', // 1
			0x32: '2', // 2
			0x33: '3', // 3
			0x34: '4', // 4
			0x35: '5', // 5
			0x36: '6', // 6
			0x37: '7', // 7
			0x38: '8', // 8
			0x39: '9', // 9
			0x30: '0', // 0
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
			0xdd: '\u062f', // ]
			0xdc: '\\', // \
			0x41: '\u0634', // a
			0x53: '\u0633', // s
			0x44: '\u064a', // d
			0x46: '\u0628', // f
			0x47: '\u0644', // g
			0x48: '\u0627', // h
			0x4a: '\u062a', // j
			0x4b: '\u0646', // k
			0x4c: '\u0645', // l
			0xba: '\u0643', // ;
			0xde: '\u0637', // '
			0x0d: '\u000d', // [return]
			0x5a: '\u0626', // z
			0x58: '\u0621', // x
			0x43: '\u0624', // c
			0x56: '\u0631', // v
			0x42: '\u0644\u0627', // b
			0x4e: '\u0649', // n
			0x4d: '\u0629', // m
			0xbc: '\u0648', // ,
			0xbe: '\u0632', // .
			0xbf: '\u0638', // /
			0x20: '\u0020' // [space]
		},
		mapShift: {
			0xc0: '\u0651', // `
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
			0x51: '\u064e', // q
			0x57: '\u064b', // w
			0x45: '\u064f', // e
			0x52: '\u064c', // r
			0x54: '\u0644\u0625', // t
			0x59: '\u0625', // y
			0x55: '\u2018', // u
			0x49: '\u00f7', // i
			0x4f: '\u00d7', // o
			0x50: '\u061b', // p
			0xdb: '>', // [
			0xdd: '<', // ]
			0xdc: '|', // \
			0x41: '\u0650', // a
			0x53: '\u064d', // s
			0x44: '[', // d
			0x46: ']', // f
			0x47: '\u0644\u0623', // g
			0x48: '\u0623', // h
			0x4a: '\u0640', // j
			0x4b: '\u060c', // k
			0x4c: '/', // l
			0xba: ':', // ;
			0xde: '"', // '
			0x0d: '\u000d', // [return]
			0x5a: '~', // z
			0x58: '\u0652', // x
			0x43: '{', // c
			0x56: '}', // v
			0x42: '\u0644\u0622', // b
			0x4e: '\u0622', // n
			0x4d: '\u2019', // m
			0xbc: ',', // ,
			0xbe: '.', // .
			0xbf: '\u061f', // /
			0x20: '\u0020' // [space]
		}
	}
});
