/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.cyrillic.kazakh.windows
 * Kazakh language windows keyboard map class.
 *
 * @extends NFLCIME.Keyboard
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.cyrillic.kazakh.windows',
		type: 'keyboard layout',
		inheritance: ['kb'],

		mapNormal: {
			0xc0: '(', // `
			0x31: '"', // 1
			0x32: '\u04d9', // 2
			0x33: '\u0456', // 3
			0x34: '\u04a3', // 4
			0x35: '\u0493', // 5
			0x36: ',', // 6
			0x37: '.', // 7
			0x38: '\u04af', // 8
			0x39: '\u04b1', // 9
			0x30: '\u049b', // 0
			0xbd: '\u04e9', // -
			0xbb: '\u04bb', // =

			0x51: '\u0439', // q
			0x57: '\u0446', // w
			0x45: '\u0443', // e
			0x52: '\u043a', // r
			0x54: '\u0435', // t
			0x59: '\u043d', // y
			0x55: '\u0433', // u
			0x49: '\u0448', // i
			0x4f: '\u0449', // o
			0x50: '\u0437', // p
			0xdb: '\u0445', // [
			0xdd: '\u044a', // ]
			0xdc: '\\', // \

			0x41: '\u0444', // a
			0x53: '\u044b', // s
			0x44: '\u0432', // d
			0x46: '\u0430', // f
			0x47: '\u043f', // g
			0x48: '\u0440', // h
			0x4a: '\u043e', // j
			0x4b: '\u043b', // k
			0x4c: '\u0434', // l
			0xba: '\u0436', // ;
			0xde: '\u044d', // '
			0x0d: '\u000d', // [return]

			0x5a: '\u044f', // z
			0x58: '\u0447', // x
			0x43: '\u0441', // c
			0x56: '\u043c', // v
			0x42: '\u0438', // b
			0x4e: '\u0442', // n
			0x4d: '\u044c', // m
			0xbc: '\u0431', // ,
			0xbe: '\u044e', // .
			0xbf: '\u2116', // /

			0x20: '\u0020' // [space]
		},

		mapShift: {
			0xc0: ')', // `
			0x31: '!', // 1
			0x32: '\u04d8', // 2
			0x33: '\u0406', // 3
			0x34: '\u04a2', // 4
			0x35: '\u0492', // 5
			0x36: ';', // 6
			0x37: ':', // 7
			0x38: '\u04ae', // 8
			0x39: '\u04b0', // 9
			0x30: '\u049a', // 0
			0xbd: '\u04e8', // -
			0xbb: '\u04ba', // =

			0x51: '\u0419', // q
			0x57: '\u0426', // w
			0x45: '\u0423', // e
			0x52: '\u041a', // r
			0x54: '\u0415', // t
			0x59: '\u041d', // y
			0x55: '\u0413', // u
			0x49: '\u0428', // i
			0x4f: '\u0429', // o
			0x50: '\u0417', // p
			0xdb: '\u0425', // [
			0xdd: '\u042a', // ]
			0xdc: '/', // \

			0x41: '\u0424', // a
			0x53: '\u042b', // s
			0x44: '\u0412', // d
			0x46: '\u0410', // f
			0x47: '\u041f', // g
			0x48: '\u0420', // h
			0x4a: '\u041e', // j
			0x4b: '\u041b', // k
			0x4c: '\u0414', // l
			0xba: '\u0416', // ;
			0xde: '\u042d', // '
			0x0d: '\u000d', // [return]

			0x5a: '\u042f', // z
			0x58: '\u0427', // x
			0x43: '\u0421', // c
			0x56: '\u041c', // v
			0x42: '\u0418', // b
			0x4e: '\u0422', // n
			0x4d: '\u042c', // m
			0xbc: '\u0411', // ,
			0xbe: '\u042e', // .
			0xbf: '?', // /

			0x20: '\u0020' // [space]
		}
	}
});
