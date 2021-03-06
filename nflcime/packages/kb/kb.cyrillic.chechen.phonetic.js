/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.cyrillic.chechen.phonetic
 * Chechen language phonetic keyboard map class.
 *
 * @extends NFLCIME.Keyboard
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.cyrillic.chechen.phonetic',
		type: 'keyboard layout',
		inheritance: ['kb'],
		mapNormal: {
			0xc0: '\u0451', // `
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
			0x51: '\u044f', // q
			0x57: '\u0436', // w
			0x45: '\u0435', // e
			0x52: '\u0440', // r
			0x54: '\u0442', // t
			0x59: '\u044b', // y
			0x55: '\u0443', // u
			0x49: '\u0438', // i
			0x4f: '\u043e', // o
			0x50: '\u043f', // p
			0xdb: '\u0448', // [
			0xdd: '\u0449', // ]
			0xdc: 'I', // \
			0x41: '\u0430', // a
			0x53: '\u0441', // s
			0x44: '\u0434', // d
			0x46: '\u0444', // f
			0x47: '\u0433', // g
			0x48: '\u0445', // h
			0x4a: '\u0439', // j
			0x4b: '\u043a', // k
			0x4c: '\u043b', // l
			0xba: '\u044e', // ;
			0xde: '\u044d', // '
			0x0d: '\u000d', // [return]
			0x5a: '\u0437', // z
			0x58: '\u0447', // x
			0x43: '\u0446', // c
			0x56: '\u0432', // v
			0x42: '\u0431', // b
			0x4e: '\u043d', // n
			0x4d: '\u043c', // m
			0xbc: '\u044c', // ,
			0xbe: '\u044a', // .
			0xbf: '.', // /
			0x20: '\u0020' // [space]
		},
		mapShift: {
			0xc0: '\u0401', // `
			0x31: '!', // 1
			0x32: '"', // 2
			0x33: '\u2116', // 3
			0x34: ';', // 4
			0x35: '%', // 5
			0x36: ':', // 6
			0x37: '?', // 7
			0x38: '*', // 8
			0x39: '(', // 9
			0x30: ')', // 0
			0xbd: '_', // -
			0xbb: '+', // =
			0x51: '\u042f', // q
			0x57: '\u0416', // w
			0x45: '\u0415', // e
			0x52: '\u0420', // r
			0x54: '\u0422', // t
			0x59: '\u042b', // y
			0x55: '\u0423', // u
			0x49: '\u0418', // i
			0x4f: '\u041e', // o
			0x50: '\u041f', // p
			0xdb: '\u0428', // [
			0xdd: '\u0429', // ]
			0xdc: '/', // \
			0x41: '\u0410', // a
			0x53: '\u0421', // s
			0x44: '\u0414', // d
			0x46: '\u0424', // f
			0x47: '\u0413', // g
			0x48: '\u0425', // h
			0x4a: '\u0419', // j
			0x4b: '\u041a', // k
			0x4c: '\u041b', // l
			0xba: '\u042e', // ;
			0xde: '\u042d', // '
			0x0d: '\u000d', // [return]
			0x5a: '\u0417', // z
			0x58: '\u0427', // x
			0x43: '\u0426', // c
			0x56: '\u0412', // v
			0x42: '\u0411', // b
			0x4e: '\u041d', // n
			0x4d: '\u041c', // m
			0xbc: '\u042c', // ,
			0xbe: '\u042a', // .
			0xbf: ',', // /
			0x20: '\u0020' // [space]
		}
	}
});
