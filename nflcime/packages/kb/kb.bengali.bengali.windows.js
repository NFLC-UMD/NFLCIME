/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.bengali.bengali.windows
 * Bengali language national keyboard map class.
 *
 * @extends NFLCIME.Keyboard
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.bengali.bengali.windows',
		type: 'keyboard layout',
		inheritance: ['kb'],
		mapNormal: {
			0xc0: '`', // `
			0x31: '\u09e7', // 1
			0x32: '\u09e8', // 2
			0x33: '\u09e9', // 3
			0x34: '\u09ea', // 4
			0x35: '\u09eb', // 5
			0x36: '\u09ec', // 6
			0x37: '\u09ed', // 7
			0x38: '\u09ee', // 8
			0x39: '\u09ef', // 9
			0x30: '\u09e6', // 0
			0xbd: '-', // -
			0xbb: '\u09c3', // =
			0x51: '\u09cc', // q
			0x57: '\u09c8', // w
			0x45: '\u09be', // e
			0x52: '\u09c0', // r
			0x54: '\u09c2', // t
			0x59: '\u09ac', // y
			0x55: '\u09b9', // u
			0x49: '\u0997', // i
			0x4f: '\u09a6', // o
			0x50: '\u099c', // p
			0xdb: '\u09a1', // [
			0xdd: '\u09bc', // ]
			0xdc: '\\', // \
			0x41: '\u09cb', // a
			0x53: '\u09c7', // s
			0x44: '\u09cd', // d
			0x46: '\u09bf', // f
			0x47: '\u09c1', // g
			0x48: '\u09aa', // h
			0x4a: '\u09b0', // j
			0x4b: '\u0995', // k
			0x4c: '\u09a4', // l
			0xba: '\u099a', // ;
			0xde: '\u099f', // '
			0x0d: '\u000d', // [return]
			0x5a: '', // z
			0x58: '\u0982', // x
			0x43: '\u09ae', // c
			0x56: '\u09a8', // v
			0x42: '\u09ac', // b
			0x4e: '\u09b2', // n
			0x4d: '\u09b8', // m
			0xbc: ',', // ,
			0xbe: '.', // .
			0xbf: '\u09df', // /
			0x20: '\u0020' // [space]
		},
		mapShift: {
			0xc0: '', // `
			0x31: '!', // 1
			0x32: '@', // 2
			0x33: '', // 3
			0x34: '', // 4
			0x35: '', // 5
			0x36: '', // 6
			0x37: '', // 7
			0x38: '', // 8
			0x39: '(', // 9
			0x30: ')', // 0
			0xbd: '\u0983', // -
			0xbb: '\u098b', // =
			0x51: '\u0994', // q
			0x57: '\u0990', // w
			0x45: '\u0986', // e
			0x52: '\u0988', // r
			0x54: '\u098a', // t
			0x59: '\u09ad', // y
			0x55: '\u0999', // u
			0x49: '\u0998', // i
			0x4f: '\u09a7', // o
			0x50: '\u099d', // p
			0xdb: '\u09a2', // [
			0xdd: '\u099e', // ]
			0xdc: '|', // \
			0x41: '\u0993', // a
			0x53: '\u098f', // s
			0x44: '\u0985', // d
			0x46: '\u0987', // f
			0x47: '\u0989', // g
			0x48: '\u09ab', // h
			0x4a: '', // j
			0x4b: '\u0996', // k
			0x4c: '\u09a5', // l
			0xba: '\u099b', // ;
			0xde: '\u09a0', // '
			0x0d: '\u000d', // [return]
			0x5a: '', // z
			0x58: '\u0981', // x
			0x43: '\u09a3', // c
			0x56: '', // v
			0x42: '', // b
			0x4e: '', // n
			0x4d: '\u09b6', // m
			0xbc: '\u09b7', // ,
			0xbe: '', // .
			0xbf: '\u09af', // /
			0x20: '\u0020' // [space]
		}
	}
});
