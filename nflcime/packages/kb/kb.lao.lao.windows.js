/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.lao.lao.windows
 * @extends NFLCIME.Keyboard
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.lao.lao.windows',
		type: 'keyboard layout',
		inheritance: ['kb'],

		mapNormal: {
			0xc0: '"', // `
			0x31: '\u0ea2', // 1
			0x32: '\u0e9f', // 2
			0x33: '\u0ec2', // 3
			0x34: '\u0e96', // 4
			0x35: '\u0eb8', // 5
			0x36: '\u0eb9', // 6
			0x37: '\u0e84', // 7
			0x38: '\u0e95', // 8
			0x39: '\u0e88', // 9
			0x30: '\u0e82', // 0
			0xbd: '\u0e8a', // -
			0xbb: '\u0ecd', // =

			0x51: '\u0ebb', // q
			0x57: '\u0ec4', // w
			0x45: '\u0eb3', // e
			0x52: '\u0e9e', // r
			0x54: '\u0eb0', // t
			0x59: '\u0eb4', // y
			0x55: '\u0eb5', // u
			0x49: '\u0eae', // i
			0x4f: '\u0e99', // o
			0x50: '\u0e8d', // p
			0xdb: '\u0e9a', // [
			0xdd: '\u0ea5', // ]
			0xdc: '/', // \

			0x41: '\u0eb1', // a
			0x53: '\u0eab', // s
			0x44: '\u0e81', // d
			0x46: '\u0e94', // f
			0x47: '\u0ec0', // g
			0x48: '\u0ec9', // h
			0x4a: '\u0ec8', // j
			0x4b: '\u0eb2', // k
			0x4c: '\u0eaa', // l
			0xba: '\u0ea7', // ;
			0xde: '\u0e87', // '
			0x0d: '\u000d', // [return]

			0x5a: '\u0e9c', // z
			0x58: '\u0e9b', // x
			0x43: '\u0ec1', // c
			0x56: '\u0ead', // v
			0x42: '\u0eb6', // b
			0x4e: '\u0eb7', // n
			0x4d: '\u0e97', // m
			0xbc: '\u0ea1', // ,
			0xbe: '\u0ec3', // .
			0xbf: '\u0e9d', // /

			0x20: '\u0020' // [space]
		},

		mapShift: {
			0xc0: '\'', // `
			0x31: '1', // 1
			0x32: '2', // 2
			0x33: '3', // 3
			0x34: '4', // 4
			0x35: '\u0ecc', // 5
			0x36: '\u0ebc', // 6
			0x37: '5', // 7
			0x38: '6', // 8
			0x39: '7', // 9
			0x30: '8', // 0
			0xbd: '9', // -
			0xbb: '\u0ecd\u0ec8', // =

			0x51: '\u0ebb\u0ec9', // q
			0x57: '0', // w
			0x45: '*', // e
			0x52: '_', // r
			0x54: '+', // t
			0x59: '\u0eb4\u0ec9', // y
			0x55: '\u0eb5\u0ec9', // u
			0x49: '\u0ea3', // i
			0x4f: '\u0edc', // o
			0x50: '\u0ebd', // p
			0xdb: '-', // [
			0xdd: '\u0eab\u0ebc', // ]
			0xdc: '\\', // \

			0x41: '\u0eb1\u0ec9', // a
			0x53: ';', // s
			0x44: '.', // d
			0x46: ',', // f
			0x47: ':', // g
			0x48: '\u0eca', // h
			0x4a: '\u0ecb', // j
			0x4b: '!', // k
			0x4c: '?', // l
			0xba: '%', // ;
			0xde: '=', // '
			0x0d: '\u000d', // [return]

			0x5a: '\u20ad', // z
			0x58: '(', // x
			0x43: '\u0eaf', // c
			0x56: 'x', // v
			0x42: '\u0eb6\u0ec9', // b
			0x4e: '\u0eb7\u0ec9', // n
			0x4d: '\u0ec6', // m
			0xbc: '\u0edd', // ,
			0xbe: '$', // .
			0xbf: ')', // /

			0x20: '\u0020' // [space]
		},

		mapAltCtrl: {
			0xc0: '', // `
			0x31: '\u0ed1', // 1
			0x32: '\u0ed2', // 2
			0x33: '\u0ed3', // 3
			0x34: '\u0ed4', // 4
			0x35: '\u0ed5', // 5
			0x36: '\u0ed6', // 6
			0x37: '\u0ed7', // 7
			0x38: '\u0ed8', // 8
			0x39: '\u0ed9', // 9
			0x30: '\u0ed0', // 0
			0xbd: '', // -
			0xbb: '', // =

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
			0xbe: '', // .
			0xbf: '', // /

			0x20: '\u0020' // [space]
		}
	}
});
