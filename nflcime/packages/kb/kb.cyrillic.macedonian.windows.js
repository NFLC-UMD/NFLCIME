/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.cyrillic.macedonian.windows
 * Macedonian language keyboard map class.
 *
 * @extends NFLCIME.Keyboard
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.cyrillic.macedonian.windows',
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

			0x51: '\u0459', // q
			0x57: '\u045a', // w
			0x45: '\u0435', // e
			0x52: '\u0440', // r
			0x54: '\u0442', // t
			0x59: '\u0455', // y
			0x55: '\u0443', // u
			0x49: '\u0438', // i
			0x4f: '\u043e', // o
			0x50: '\u043f', // p
			0xdb: '\u0448', // [
			0xdd: '\u0453', // ]
			0xdc: '\u0436', // \

			0x41: '\u0430', // a
			0x53: '\u0441', // s
			0x44: '\u0434', // d
			0x46: '\u0444', // f
			0x47: '\u0433', // g
			0x48: '\u0445', // h
			0x4a: '\u0458', // j
			0x4b: '\u043a', // k
			0x4c: '\u043b', // l
			0xba: '\u0447', // ;
			0xde: '\u045c', // '
			0x0d: '\u000d', // [return]

			0x5a: '\u0437', // z
			0x58: '\u045f', // x
			0x43: '\u0446', // c
			0x56: '\u0432', // v
			0x42: '\u0431', // b
			0x4e: '\u043d', // n
			0x4d: '\u043c', // m
			0xbc: ',', // ,
			0xbe: '.', // .
			0xbf: '/', // /

			0x20: '\u0020' // [space]
		},

		mapShift: {
			0xc0: '~', // `
			0x31: '!', // 1
			0x32: '\u201e', // 2
			0x33: '\u201c', // 3
			0x34: '\u2019', // 4
			0x35: '%', // 5
			0x36: '\u2018', // 6
			0x37: '&', // 7
			0x38: '*', // 8
			0x39: '(', // 9
			0x30: ')', // 0
			0xbd: '_', // -
			0xbb: '+', // =

			0x51: '\u0409', // q
			0x57: '\u040a', // w
			0x45: '\u0415', // e
			0x52: '\u0420', // r
			0x54: '\u0422', // t
			0x59: '\u0405', // y
			0x55: '\u0423', // u
			0x49: '\u0418', // i
			0x4f: '\u041e', // o
			0x50: '\u041f', // p
			0xdb: '\u0428', // [
			0xdd: '\u0403', // ]
			0xdc: '\u0416', // \

			0x41: '\u0410', // a
			0x53: '\u0421', // s
			0x44: '\u0414', // d
			0x46: '\u0424', // f
			0x47: '\u0413', // g
			0x48: '\u0425', // h
			0x4a: '\u0408', // j
			0x4b: '\u041a', // k
			0x4c: '\u041b', // l
			0xba: '\u0427', // ;
			0xde: '\u040c', // '
			0x0d: '\u000d', // [return]

			0x5a: '\u0417', // z
			0x58: '\u040f', // x
			0x43: '\u0426', // c
			0x56: '\u0412', // v
			0x42: '\u0411', // b
			0x4e: '\u041d', // n
			0x4d: '\u041c', // m
			0xbc: ';', // ,
			0xbe: ':', // .
			0xbf: '?', // /

			0x20: '\u0020' // [space]
		}
	}
});
