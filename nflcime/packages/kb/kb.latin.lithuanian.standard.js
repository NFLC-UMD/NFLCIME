/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.latin.lithuanian.standard
 * @extends NFLCIME.Keyboard
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.latin.lithuanian.standard',
		type: 'keyboard layout',
		inheritance: ['kb'],
		mapNormal: {
			0xc0: '`', // `
			0x31: '!', // 1
			0x32: '-', // 2
			0x33: '/', // 3
			0x34: ';', // 4
			0x35: ':', // 5
			0x36: ',', // 6
			0x37: '.', // 7
			0x38: '=', // 8
			0x39: '(', // 9
			0x30: ')', // 0
			0xbd: '?', // -
			0xbb: 'x', // =
			0x51: '\u0105', // q
			0x57: '\u017e', // w
			0x45: 'e', // e
			0x52: 'r', // r
			0x54: 't', // t
			0x59: 'y', // y
			0x55: 'u', // u
			0x49: 'i', // i
			0x4f: 'o', // o
			0x50: 'p', // p
			0xdb: '\u012f', // [
			0xdd: 'w', // ]
			0xdc: 'q', // \
			0x41: 'a', // a
			0x53: 's', // s
			0x44: 'd', // d
			0x46: '\u0161', // f
			0x47: 'g', // g
			0x48: 'h', // h
			0x4a: 'j', // j
			0x4b: 'k', // k
			0x4c: 'l', // l
			0xba: '\u0173', // ;
			0xde: '\u0117', // '
			0x0d: '\u000d', // [return]
			0x5a: 'z', // z
			0x58: '\u016b', // x
			0x43: 'c', // c
			0x56: 'v', // v
			0x42: 'b', // b
			0x4e: 'n', // n
			0x4d: 'm', // m
			0xbc: '\u010d', // ,
			0xbe: 'f', // .
			0xbf: '\u0119', // /
			0x20: '\u0020' // [space]
		},
		mapShift: {
			0xc0: '~', // `
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
			0xbd: '+', // -
			0xbb: 'X', // =
			0x51: '\u0104', // q
			0x57: '\u017d', // w
			0x45: 'E', // e
			0x52: 'R', // r
			0x54: 'T', // t
			0x59: 'Y', // y
			0x55: 'U', // u
			0x49: 'I', // i
			0x4f: 'O', // o
			0x50: 'P', // p
			0xdb: '\u012e', // [
			0xdd: 'W', // ]
			0xdc: 'Q', // \
			0x41: 'A', // a
			0x53: 'S', // s
			0x44: 'D', // d
			0x46: '\u0160', // f
			0x47: 'G', // g
			0x48: 'H', // h
			0x4a: 'J', // j
			0x4b: 'K', // k
			0x4c: 'L', // l
			0xba: '\u0172', // ;
			0xde: '\u0116', // '
			0x0d: '\u000d', // [return]
			0x5a: 'Z', // z
			0x58: '\u016a', // x
			0x43: 'C', // c
			0x56: 'V', // v
			0x42: 'B', // b
			0x4e: 'N', // n
			0x4d: 'M', // m
			0xbc: '\u010c', // ,
			0xbe: 'F', // .
			0xbf: '\u0118', // /
			0x20: '\u0020' // [space]
		},
		mapAltCtrl: {
			0xc0: '\u00b4', // `
			0x31: '@', // 1
			0x32: '_', // 2
			0x33: '#', // 3
			0x34: '$', // 4
			0x35: '\u00a7', // 5
			0x36: '^', // 6
			0x37: '&', // 7
			0x38: '*', // 8
			0x39: '[', // 9
			0x30: ']', // 0
			0xbd: '\'', // -
			0xbb: '%', // =
			0x51: '', // q
			0x57: '', // w
			0x45: '\u20ac', // e
			0x52: '', // r
			0x54: '', // t
			0x59: '', // y
			0x55: '', // u
			0x49: '', // i
			0x4f: '', // o
			0x50: '', // p
			0xdb: '{', // [
			0xdd: '}', // ]
			0xdc: '|', // \
			0x41: '', // a
			0x53: '', // s
			0x44: '', // d
			0x46: '', // f
			0x47: '', // g
			0x48: '', // h
			0x4a: '', // j
			0x4b: '', // k
			0x4c: '', // l
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
			0xbc: '\u201e', // ,
			0xbe: '\u201c', // .
			0xbf: '\\', // /
			0x20: '\u0020' // [space]
		}
	}
});
