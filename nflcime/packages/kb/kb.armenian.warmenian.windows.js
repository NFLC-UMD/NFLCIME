/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.armenian.warmenian.windows
 * Western Armenian language keyboard map class.
 *
 * @extends NFLCIME.Keyboard
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.armenian.warmenian.windows',
		type: 'keyboard layout',
		inheritance: ['kb'],
		mapNormal: {
			0xc0: '\u055d', // `
			0x31: ':', // 1
			0x32: '\u0571', // 2
			0x33: '\u0575', // 3
			0x34: '\u055b', // 4
			0x35: ',', // 5
			0x36: '-', // 6
			0x37: '.', // 7
			0x38: '\u00ab', // 8
			0x39: '\u00bb', // 9
			0x30: '\u0585', // 0
			0xbd: '\u057c', // -
			0xbb: '\u056a', // =
			0x51: '\u056d', // q
			0x57: '\u057e', // w
			0x45: '\u0567', // e
			0x52: '\u0580', // r
			0x54: '\u0564', // t
			0x59: '\u0565', // y
			0x55: '\u0568', // u
			0x49: '\u056b', // i
			0x4f: '\u0578', // o
			0x50: '\u0562', // p
			0xdb: '\u0579', // [
			0xdd: '\u057b', // ]
			0xdc: '\'', // \
			0x41: '\u0561', // a
			0x53: '\u057d', // s
			0x44: '\u057f', // d
			0x46: '\u0586', // f
			0x47: '\u056f', // g
			0x48: '\u0570', // h
			0x4a: '\u0573', // j
			0x4b: '\u0584', // k
			0x4c: '\u056c', // l
			0xba: '\u0569', // ;
			0xde: '\u0583', // '
			0x0d: '\u000d', // [return]
			0x5a: '\u0566', // z
			0x58: '\u0581', // x
			0x43: '\u0563', // c
			0x56: '\u0582', // v
			0x42: '\u057a', // b
			0x4e: '\u0576', // n
			0x4d: '\u0574', // m
			0xbc: '\u0577', // ,
			0xbe: '\u0572', // .
			0xbf: '\u056e', // /
			0x20: '\u0020' // [space]
		},
		mapShift: {
			0xc0: '\u055c', // `
			0x31: '1', // 1
			0x32: '\u0541', // 2
			0x33: '\u0545', // 3
			0x34: '3', // 4
			0x35: '4', // 5
			0x36: '9', // 6
			0x37: '\u0587', // 7
			0x38: '(', // 8
			0x39: ')', // 9
			0x30: '\u0555', // 0
			0xbd: '\u054c', // -
			0xbb: '\u053a', // =
			0x51: '\u053d', // q
			0x57: '\u054e', // w
			0x45: '\u0537', // e
			0x52: '\u0550', // r
			0x54: '\u0534', // t
			0x59: '\u0535', // y
			0x55: '\u0538', // u
			0x49: '\u053b', // i
			0x4f: '\u0548', // o
			0x50: '\u0532', // p
			0xdb: '\u0549', // [
			0xdd: '\u054b', // ]
			0xdc: '\u055e', // \
			0x41: '\u0531', // a
			0x53: '\u054d', // s
			0x44: '\u054f', // d
			0x46: '\u0556', // f
			0x47: '\u053f', // g
			0x48: '\u0540', // h
			0x4a: '\u0543', // j
			0x4b: '\u0554', // k
			0x4c: '\u053c', // l
			0xba: '\u0539', // ;
			0xde: '\u0553', // '
			0x0d: '\u000d', // [return]
			0x5a: '\u0536', // z
			0x58: '\u0551', // x
			0x43: '\u0533', // c
			0x56: '\u0552', // v
			0x42: '\u054a', // b
			0x4e: '\u0546', // n
			0x4d: '\u0544', // m
			0xbc: '\u0547', // ,
			0xbe: '\u0542', // .
			0xbf: '\u053e', // /
			0x20: '\u0020' // [space]
		}
	}
});
