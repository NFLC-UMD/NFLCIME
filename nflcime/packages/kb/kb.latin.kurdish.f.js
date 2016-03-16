/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.latin.kurdish.f
 * @extends NFLCIME.Keyboard
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.latin.kurdish.f',
		type: 'keyboard layout',
		inheritance: ['kb'],

		mapNormal: {
			0xc0: '+', // `
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
			0xbd: '/', // -
			0xbb: '-', // =

			0x51: 'f', // q
			0x57: 'g', // w
			0x45: 'x', // e
			0x52: 'i', // r
			0x54: 'o', // t
			0x59: 'd', // y
			0x55: 'r', // u
			0x49: 'n', // i
			0x4f: 'h', // o
			0x50: 'p', // p
			0xdb: 'q', // [
			0xdd: 'w', // ]
			0xdc: 'x', // \

			0x41: '\u00fb', // a
			0x53: '\u00ee', // s
			0x44: 'e', // d
			0x46: 'a', // f
			0x47: 'u', // g
			0x48: 't', // h
			0x4a: 'k', // j
			0x4b: 'm', // k
			0x4c: 'l', // l
			0xba: 'y', // ;
			0xde: '\u015f', // '
			0x0d: '\u000d', // [return]

			0x5a: 'j', // z
			0x58: '\u00ea', // x
			0x43: 'v', // c
			0x56: 'c', // v
			0x42: '\u00e7', // b
			0x4e: 'z', // n
			0x4d: 's', // m
			0xbc: 'b', // ,
			0xbe: '.', // .
			0xbf: ',', // /

			0x20: '\u0020' // [space]
		},

		mapShift: {
			0xc0: '*', // `
			0x31: '!', // 1
			0x32: '"', // 2
			0x33: '^', // 3
			0x34: '$', // 4
			0x35: '%', // 5
			0x36: '&', // 6
			0x37: '\'', // 7
			0x38: '(', // 8
			0x39: ')', // 9
			0x30: '=', // 0
			0xbd: '?', // -
			0xbb: '_', // =

			0x51: 'F', // q
			0x57: 'G', // w
			0x45: 'X', // e
			0x52: 'I', // r
			0x54: 'O', // t
			0x59: 'D', // y
			0x55: 'R', // u
			0x49: 'N', // i
			0x4f: 'H', // o
			0x50: 'P', // p
			0xdb: 'Q', // [
			0xdd: 'W', // ]
			0xdc: 'X', // \

			0x41: '\u00db', // a
			0x53: '\u00ce', // s
			0x44: 'E', // d
			0x46: 'A', // f
			0x47: 'U', // g
			0x48: 'T', // h
			0x4a: 'K', // j
			0x4b: 'M', // k
			0x4c: 'L', // l
			0xba: 'Y', // ;
			0xde: '\u015e', // '
			0x0d: '\u000d', // [return]

			0x5a: 'J', // z
			0x58: '\u00ca', // x
			0x43: 'V', // c
			0x56: 'C', // v
			0x42: '\u00c7', // b
			0x4e: 'Z', // n
			0x4d: 'S', // m
			0xbc: 'B', // ,
			0xbe: ':', // .
			0xbf: ';', // /

			0x20: '\u0020' // [space]
		},

		mapAltCtrl: {
			0xc0: '\u00ac', // `
			0x31: '\u00b9', // 1
			0x32: '\u00b2', // 2
			0x33: '#', // 3
			0x34: '\u00bc', // 4
			0x35: '\u00bd', // 5
			0x36: '\u00be', // 6
			0x37: '{', // 7
			0x38: '[', // 8
			0x39: ']', // 9
			0x30: '}', // 0
			0xbd: '\\', // -
			0xbb: '|', // =

			0x51: '@', // q
			0x57: '', // w
			0x45: '\u011f', // e
			0x52: '\u00b6', // r
			0x54: '\u00f4', // t
			0x59: '\u00a5', // y
			0x55: '\u00ae', // u
			0x49: '', // i
			0x4f: '\u00b0', // o
			0x50: '\u00a3', // p
			0xdb: '', // [
			0xdd: '~', // ]
			0xdc: '`', // \

			0x41: '\u00fc', // a
			0x53: 'i', // s
			0x44: '\u20ac', // d
			0x46: '\u00e2', // f
			0x47: '\u00fc', // g
			0x48: '\u2122', // h
			0x4a: '', // j
			0x4b: '\u00b5', // k
			0x4c: '', // l
			0xba: '\u00b4', // ;
			0xde: '#', // '
			0x0d: '\u000d', // [return]

			0x5a: '\u00ab', // z
			0x58: '\u00f6', // x
			0x43: '\u201c', // c
			0x56: '\u00a2', // v
			0x42: '\u201d', // b
			0x4e: '', // n
			0x4d: '\u00a7', // m
			0xbc: '\u00d7', // ,
			0xbe: '\u00f7', // .
			0xbf: '\u00b7', // /

			0x20: '\u0020' // [space]
		},

		mapAltCtrlShift: {
			0xc0: '\u00b1', // `
			0x31: '\u00a1', // 1
			0x32: '', // 2
			0x33: '\u00b3', // 3
			0x34: '', // 4
			0x35: '\u215c', // 5
			0x36: '', // 6
			0x37: '', // 7
			0x38: '', // 8
			0x39: '\u00b1', // 9
			0x30: '\u00b0', // 0
			0xbd: '\u00bf', // -
			0xbb: '', // =

			0x51: '', // q
			0x57: '', // w
			0x45: '\u011e', // e
			0x52: '', // r
			0x54: '\u00d4', // t
			0x59: '', // y
			0x55: '', // u
			0x49: '', // i
			0x4f: '', // o
			0x50: '', // p
			0xdb: '', // [
			0xdd: '', // ]
			0xdc: '', // \

			0x41: '\u00dc', // a
			0x53: '\u0130', // s
			0x44: '', // d
			0x46: '\u00c2', // f
			0x47: '\u00dc', // g
			0x48: '', // h
			0x4a: '', // j
			0x4b: '', // k
			0x4c: '', // l
			0xba: '', // ;
			0xde: '', // '
			0x0d: '\u000d', // [return]

			0x5a: '', // z
			0x58: '\u00d6', // x
			0x43: '', // c
			0x56: '\u00a9', // v
			0x42: '', // b
			0x4e: '', // n
			0x4d: '', // m
			0xbc: '\u00a0', // ,
			0xbe: '', // .
			0xbf: '', // /

			0x20: '\u0020' // [space]
		},

		initialize: function() {
			// make alt-ctrl-shift available through ctrl-shift as well (hard to reach otherwise on keyboard without Alt-Gr key)
			this.mapCtrlShift = this.mapAltCtrlShift;
		}
	}
});
