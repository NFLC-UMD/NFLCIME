/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.arabic.uighur.windows
 * Uighur or Uyghur language windows keyboard map class.
 *
 * @extends NFLCIME.Keyboard
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.arabic.uighur.windows',
		type: 'keyboard layout',
		inheritance: ['kb'],
		mapNormal: {
			0xc0: '`', // `
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
			0x51: '\u0686', // q
			0x57: '\u06cb', // w
			0x45: '\u06d0', // e
			0x52: '\u0631', // r
			0x54: '\u062a', // t
			0x59: '\u064a', // y
			0x55: '\u06c7', // u
			0x49: '\u06ad', // i
			0x4f: '\u0648', // o
			0x50: '\u067e', // p
			0xdb: ']', // [
			0xdd: '[', // ]
			0xdc: '\\', // \
			0x41: '\u06be', // a
			0x53: '\u0633', // s
			0x44: '\u062f', // d
			0x46: '\u0627', // f
			0x47: '\u06d5', // g
			0x48: '\u0649', // h
			0x4a: '\u0642', // j
			0x4b: '\u0643', // k
			0x4c: '\u0644', // l
			0xba: '\u061b', // ;
			0xde: '\'', // '
			0x0d: '\u000d', // [return]
			0x5a: '\u0632', // z
			0x58: '\u0634', // x
			0x43: '\u063a', // c
			0x56: '\u06c8', // v
			0x42: '\u0628', // b
			0x4e: '\u0646', // n
			0x4d: '\u0645', // m
			0xbc: '\u060c', // ,
			0xbe: '.', // .
			0xbf: '\u0626', // /
			0x20: '\u0020' // [space]
		},
		mapShift: {
			0xc0: '~', // `
			0x31: '!', // 1
			0x32: '@', // 2
			0x33: '#', // 3
			0x34: '$', // 4
			0x35: '%', // 5
			0x36: '^', // 6
			0x37: '&', // 7
			0x38: '*', // 8
			0x39: ')', // 9
			0x30: '(', // 0
			0xbd: '_', // -
			0xbb: '+', // =
			0x51: '', // q
			0x57: '', // w
			0x45: '', // e
			0x52: '', // r
			0x54: '', // t
			0x59: '', // y
			0x55: '', // u
			0x49: '', // i
			0x4f: '', // o
			0x50: '', // p
			0xdb: '\u00bb', // [
			0xdd: '\u00ab', // ]
			0xdc: '', // \
			0x41: '', // a
			0x53: '', // s
			0x44: '\u0698', // d
			0x46: '\u0641', // f
			0x47: '\u06af', // g
			0x48: '\u062e', // h
			0x4a: '\u062c', // j
			0x4b: '\u06c6', // k
			0x4c: '\u0644\u0627', // l
			0xba: '', // ;
			0xde: '"', // '
			0x0d: '\u000d', // [return]
			0x5a: '', // z
			0x58: '', // x
			0x43: '', // c
			0x56: '', // v
			0x42: '', // b
			0x4e: '', // n
			0x4d: '', // m
			0xbc: '>', // ,
			0xbe: '<', // .
			0xbf: '\u061f', // /
			0x20: '\u0020' // [space]
		}
	}
});
