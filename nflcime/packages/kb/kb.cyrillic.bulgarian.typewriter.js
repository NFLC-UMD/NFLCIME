/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.cyrillic.bulgarian.typewriter
 * Bulgarian language typewriter keyboard map class.
 *
 * @extends NFLCIME.Keyboard
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.cyrillic.bulgarian.typewriter',
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
			0xbb: '.', // =
			0x51: ',', // q
			0x57: '\u0443', // w
			0x45: '\u0435', // e
			0x52: '\u0438', // r
			0x54: '\u0448', // t
			0x59: '\u0449', // y
			0x55: '\u043a', // u
			0x49: '\u0441', // i
			0x4f: '\u0434', // o
			0x50: '\u0437', // p
			0xdb: '\u0446', // [
			0xdd: ';', // ]
			0xdc: '(', // \
			0x41: '\u044c', // a
			0x53: '\u044f', // s
			0x44: '\u0430', // d
			0x46: '\u043e', // f
			0x47: '\u0436', // g
			0x48: '\u0433', // h
			0x4a: '\u0442', // j
			0x4b: '\u043d', // k
			0x4c: '\u0432', // l
			0xba: '\u043c', // ;
			0xde: '\u0447', // '
			0x0d: '\u000d', // [return]
			0x5a: '\u044e', // z
			0x58: '\u0439', // x
			0x43: '\u044a', // c
			0x56: '\u044d', // v
			0x42: '\u0444', // b
			0x4e: '\u0445', // n
			0x4d: '\u043f', // m
			0xbc: '\u0440', // ,
			0xbe: '\u043b', // .
			0xbf: '\u0431', // /
			0x20: '\u0020' // [space]
		},
		mapShift: {
			0xc0: '~', // `
			0x31: '!', // 1
			0x32: '?', // 2
			0x33: '+', // 3
			0x34: '"', // 4
			0x35: '%', // 5
			0x36: '=', // 6
			0x37: ':', // 7
			0x38: '/', // 8
			0x39: '_', // 9
			0x30: '\u2116', // 0
			0xbd: '\u0406', // -
			0xbb: 'V', // =
			0x51: '\u044b', // q
			0x57: '\u0423', // w
			0x45: '\u0415', // e
			0x52: '\u0418', // r
			0x54: '\u0428', // t
			0x59: '\u0429', // y
			0x55: '\u041a', // u
			0x49: '\u0421', // i
			0x4f: '\u0414', // o
			0x50: '\u0417', // p
			0xdb: '\u0426', // [
			0xdd: '\u00a7', // ]
			0xdc: ')', // \
			0x41: '\u042c', // a
			0x53: '\u042f', // s
			0x44: '\u0410', // d
			0x46: '\u041e', // f
			0x47: '\u0416', // g
			0x48: '\u0413', // h
			0x4a: '\u0422', // j
			0x4b: '\u041d', // k
			0x4c: '\u0412', // l
			0xba: '\u041c', // ;
			0xde: '\u0427', // '
			0x0d: '\u000d', // [return]
			0x5a: '\u042e', // z
			0x58: '\u0419', // x
			0x43: '\u042a', // c
			0x56: '\u042d', // v
			0x42: '\u0424', // b
			0x4e: '\u0425', // n
			0x4d: '\u041f', // m
			0xbc: '\u0420', // ,
			0xbe: '\u041b', // .
			0xbf: '\u0411', // /
			0x20: '\u0020' // [space]
		}
	}
});
