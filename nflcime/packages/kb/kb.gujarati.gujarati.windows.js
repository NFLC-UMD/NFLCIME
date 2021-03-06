/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.gujarati.gujarati.windows
 * @extends NFLCIME.Keyboard
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.gujarati.gujarati.windows',
		type: 'keyboard layout',
		inheritance: ['kb'],
		mapNormal: {
			0xc0: '', // `
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
			0xbb: '\u0ac3', // =
			0x51: '\u0acc', // q
			0x57: '\u0ac8', // w
			0x45: '\u0abe', // e
			0x52: '\u0ac0', // r
			0x54: '\u0ac2', // t
			0x59: '\u0aac', // y
			0x55: '\u0ab9', // u
			0x49: '\u0a97', // i
			0x4f: '\u0aa6', // o
			0x50: '\u0a9c', // p
			0xdb: '\u0aa1', // [
			0xdd: '\u0abc', // ]
			0xdc: '\u0ac9', // \
			0x41: '\u0acb', // a
			0x53: '\u0ac7', // s
			0x44: '\u0acd', // d
			0x46: '\u0abf', // f
			0x47: '\u0ac1', // g
			0x48: '\u0aaa', // h
			0x4a: '\u0ab0', // j
			0x4b: '\u0a95', // k
			0x4c: '\u0aa4', // l
			0xba: '\u0a9a', // ;
			0xde: '\u0a9f', // '
			0x0d: '\u000d', // [return]
			0x5a: '', // z
			0x58: '\u0a82', // x
			0x43: '\u0aae', // c
			0x56: '\u0aa8', // v
			0x42: '\u0ab5', // b
			0x4e: '\u0ab2', // n
			0x4d: '\u0ab8', // m
			0xbc: ',', // ,
			0xbe: '.', // .
			0xbf: '\u0aaf', // /
			0x20: '\u0020' // [space]
		},
		mapShift: {
			0xc0: '', // `
			0x31: '\u0a8d', // 1
			0x32: '\u0ac5', // 2
			0x33: '\u0acd\u0ab0', // 3
			0x34: '\u0ab0\u0acd', // 4
			0x35: '\u0a9c\u0acd\u0a9e', // 5
			0x36: '\u0aa4\u0acd\u0ab0', // 6
			0x37: '\u0a95\u0acd\u0ab7', // 7
			0x38: '\u0ab6\u0acd\u0ab0', // 8
			0x39: '(', // 9
			0x30: '\u0a88', // 0
			0xbd: '\u0a83', // -
			0xbb: '\u0a8b', // =
			0x51: '\u0a94', // q
			0x57: '\u0a90', // w
			0x45: '\u0a86', // e
			0x52: '\u0a88', // r
			0x54: '\u0a8a', // t
			0x59: '\u0aad', // y
			0x55: '\u0a99', // u
			0x49: '\u0a98', // i
			0x4f: '\u0aa7', // o
			0x50: '\u0a9d', // p
			0xdb: '\u0aa2', // [
			0xdd: '\u0a9e', // ]
			0xdc: '\u0a91', // \
			0x41: '\u0a93', // a
			0x53: '\u0a8f', // s
			0x44: '\u0a85', // d
			0x46: '\u0a87', // f
			0x47: '\u0a89', // g
			0x48: '\u0aab', // h
			0x4a: '', // j
			0x4b: '\u0a96', // k
			0x4c: '\u0aa5', // l
			0xba: '\u0a9b', // ;
			0xde: '\u0aa0', // '
			0x0d: '\u000d', // [return]
			0x5a: '', // z
			0x58: '\u0a81', // x
			0x43: '\u0aa3', // c
			0x56: '', // v
			0x42: '', // b
			0x4e: '\u0ab3', // n
			0x4d: '\u0ab6', // m
			0xbc: '\u0ab7', // ,
			0xbe: '\u0964', // .
			0xbf: '', // /
			0x20: '\u0020' // [space]
		},
		mapAltCtrl: {
			0xc0: '', // `
			0x31: '\u0ae7', // 1
			0x32: '\u0ae8', // 2
			0x33: '\u0ae9', // 3
			0x34: '\u0aea', // 4
			0x35: '\u0aeb', // 5
			0x36: '\u0aec', // 6
			0x37: '\u0aed', // 7
			0x38: '\u0aee', // 8
			0x39: '\u0aef', // 9
			0x30: '\u0ae6', // 0
			0xbd: '', // -
			0xbb: '\u0ac4', // =
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
			0xdb: '', // [
			0xdd: '', // ]
			0xdc: '', // \
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
			0xde: '', // '
			0x0d: '\u000d', // [return]
			0x5a: '', // z
			0x58: '', // x
			0x43: '', // c
			0x56: '', // v
			0x42: '', // b
			0x4e: '', // n
			0x4d: '', // m
			0xbc: '', // ,
			0xbe: '\u0965', // .
			0xbf: '', // /
			0x20: '\u0020' // [space]
		},
		mapAltCtrlShift: {
			0xc0: '', // `
			0x31: '', // 1
			0x32: '', // 2
			0x33: '', // 3
			0x34: '', // 4
			0x35: '', // 5
			0x36: '', // 6
			0x37: '', // 7
			0x38: '', // 8
			0x39: '', // 9
			0x30: '', // 0
			0xbd: '', // -
			0xbb: '\u0ae0', // =
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
			0xdb: '', // [
			0xdd: '', // ]
			0xdc: '', // \
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
			0xde: '', // '
			0x0d: '\u000d', // [return]
			0x5a: '', // z
			0x58: '\u0ad0', // x
			0x43: '', // c
			0x56: '', // v
			0x42: '', // b
			0x4e: '', // n
			0x4d: '', // m
			0xbc: '', // ,
			0xbe: '\u0abd', // .
			0xbf: '', // /
			0x20: '\u0020' // [space]
		},
		initialize: function() {
			// make alt-ctrl-shift available through ctrl-shift as well (hard to reach otherwise on keyboard without Alt-Gr key)
			this.mapCtrlShift = this.mapAltCtrlShift;
		}
	}
});
