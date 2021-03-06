/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.gurmukhi.epunjabi.windows
 * @extends NFLCIME.Keyboard
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.gurmukhi.epunjabi.windows',
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
			0xbb: '', // =

			0x51: '\u0a4c', // q
			0x57: '\u0a48', // w
			0x45: '\u0a3e', // e
			0x52: '\u0a40', // r
			0x54: '\u0a42', // t
			0x59: '\u0a2c', // y
			0x55: '\u0a39', // u
			0x49: '\u0a17', // i
			0x4f: '\u0a26', // o
			0x50: '\u0a1c', // p
			0xdb: '\u0a21', // [
			0xdd: '\u0a3c', // ]
			0xdc: '', // \

			0x41: '\u0a4b', // a
			0x53: '\u0a47', // s
			0x44: '\u0a4d', // d
			0x46: '\u0a3f', // f
			0x47: '\u0a41', // g
			0x48: '\u0a2a', // h
			0x4a: '\u0a30', // j
			0x4b: '\u0a15', // k
			0x4c: '\u0a24', // l
			0xba: '\u0a1a', // ;
			0xde: '\u0a1f', // '
			0x0d: '\u000d', // [return]

			0x5a: '', // z
			0x58: '\u0a70', // x
			0x43: '\u0a2e', // c
			0x56: '\u0a28', // v
			0x42: '\u0a35', // b
			0x4e: '\u0a32', // n
			0x4d: '\u0a38', // m
			0xbc: ',', // ,
			0xbe: '.', // .
			0xbf: '\u0a2f', // /

			0x20: '\u0020' // [space]
		},

		mapShift: {
			0xc0: '\u0a4d\u0a39', // `
			0x31: '\u0a4d\u0a35', // 1
			0x32: '\u0a4d\u0a2f', // 2
			0x33: '\u0a4d\u0a30', // 3
			0x34: '\u0a71', // 4
			0x35: '', // 5
			0x36: '', // 6
			0x37: '', // 7
			0x38: '', // 8
			0x39: '(', // 9
			0x30: ')', // 0
			0xbd: '', // -
			0xbb: '', // =

			0x51: '\u0a14', // q
			0x57: '\u0a10', // w
			0x45: '\u0a06', // e
			0x52: '\u0a08', // r
			0x54: '\u0a0a', // t
			0x59: '\u0a2d', // y
			0x55: '\u0a19', // u
			0x49: '\u0a18', // i
			0x4f: '\u0a27', // o
			0x50: '\u0a1d', // p
			0xdb: '\u0a22', // [
			0xdd: '\u0a1e', // ]
			0xdc: '', // \

			0x41: '\u0a13', // a
			0x53: '\u0a0f', // s
			0x44: '\u0a05', // d
			0x46: '\u0a07', // f
			0x47: '\u0a09', // g
			0x48: '\u0a2b', // h
			0x4a: '\u0a5c', // j
			0x4b: '\u0a16', // k
			0x4c: '\u0a25', // l
			0xba: '\u0a1b', // ;
			0xde: '\u0a20', // '
			0x0d: '\u000d', // [return]

			0x5a: '', // z
			0x58: '\u0a02', // x
			0x43: '\u0a23', // c
			0x56: '', // v
			0x42: '\u0a72', // b
			0x4e: '\u0a33', // n
			0x4d: '\u0a36', // m
			0xbc: '', // ,
			0xbe: '\u0964', // .
			0xbf: '', // /

			0x20: '\u0020' // [space]
		},

		mapAltCtrl: {
			0xc0: '', // `
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
			0xbd: '', // -
			0xbb: '', // =

			0x51: '', // q
			0x57: '', // w
			0x45: '', // e
			0x52: '', // r
			0x54: '', // t
			0x59: '', // y
			0x55: '', // u
			0x49: '\u0a5a', // i
			0x4f: '', // o
			0x50: '\u0a5b', // p
			0xdb: '\u0a5c', // [
			0xdd: '', // ]
			0xdc: '', // \

			0x41: '', // a
			0x53: '', // s
			0x44: '', // d
			0x46: '', // f
			0x47: '', // g
			0x48: '\u0a5e', // h
			0x4a: '', // j
			0x4b: '\u0a59', // k
			0x4c: '', // l
			0xba: '', // ;
			0xde: '', // '
			0x0d: '\u000d', // [return]

			0x5a: '', // z
			0x58: '', // x
			0x43: '', // c
			0x56: '', // v
			0x42: '\u0a73', // b
			0x4e: '', // n
			0x4d: '', // m
			0xbc: '', // ,
			0xbe: '\u0965', // .
			0xbf: '', // /

			0x20: '\u0020' // [space]
		}
	}
});
