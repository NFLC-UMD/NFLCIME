/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.latin.hausa.windows
 * @extends NFLCIME.Keyboard
 *
 */

/*
0181 = B with thing hanging off back - codepage Latin Extended - B
0182 = b lowercase with hook arm - codepage Latin Extended - B
0253 = b lowercase with hook arm (another variant) - codepage IPA Extensions
018A = D with thing hanging off back - codepage Latin Extended - B
0257 = d lowercase with thing hanging off back - codepage IPA Extensions
01B4 = y with thing hanging of upper right - codepage Latin Extended - B
02C9 = Macron modifier  - codepage Space Modifier Letters
0303 = combining tilde  - codepage Space Modifier Letters
(from source code on http://www.omniglot.com/babel/hausa.htm)
-----------------------------------------------------------------------------------------------------
&#599; = d lower case with thing hanging off back
&#409; = k lower case with thing hanging forward
a&#772; = these chars where combined to form an a with a flat tilde over - not in alphabet?? - Macron modifier?
*/
NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.latin.hausa.windows',
		type: 'keyboard layout',
		inheritance: ['kb'],
		mapNormal: {
			0xc0: '#', // `
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
			0xbb: '\u0257', // =
			0x51: 'q', // q
			0x57: 'w', // w
			0x45: 'e', // e
			0x52: 'r', // r
			0x54: 't', // t
			0x59: 'y', // y
			0x55: 'u', // u
			0x49: 'i', // i
			0x4f: 'o', // o
			0x50: 'p', // p
			0xdb: '\u0253', // [
			0xdd: '\u0199', // ]
			0xdc: '<', // \
			0x41: 'a', // a
			0x53: 's', // s
			0x44: 'd', // d
			0x46: 'f', // f
			0x47: 'g', // g
			0x48: 'h', // h
			0x4a: 'j', // j
			0x4b: 'k', // k
			0x4c: 'l', // l
			0xba: ';', // ;
			0xde: {
				context: '\'',
				insert: ''
			}, // '
			0x0d: '\u000d', // [return]
			0x5a: 'z', // z
			0x58: 'x', // x
			0x43: 'c', // c
			0x56: 'v', // v
			0x42: 'b', // b
			0x4e: 'n', // n
			0x4d: 'm', // m
			0xbc: ',', // ,
			0xbe: '.', // .
			0xbf: '\u00e9', // /
			0x20: '\u0020' // [space]
		},
		mapShift: {
			0xc0: {
				context: '~',
				insert: ''
			}, // `
			0x31: '!', // 1
			0x32: '"', // 2
			0x33: '/', // 3
			0x34: '$', // 4
			0x35: '%', // 5
			0x36: '?', // 6
			0x37: '&', // 7
			0x38: '*', // 8
			0x39: '(', // 9
			0x30: ')', // 0
			0xbd: '_', // -
			0xbb: '\u018a', // =
			0x51: 'Q', // q
			0x57: 'W', // w
			0x45: 'E', // e
			0x52: 'R', // r
			0x54: 'T', // t
			0x59: 'Y', // y
			0x55: 'U', // u
			0x49: 'I', // i
			0x4f: 'O', // o
			0x50: 'P', // p
			0xdb: '\u0181', // [
			0xdd: '\u0198', // ]
			0xdc: '>', // \
			0x41: 'A', // a
			0x53: 'S', // s
			0x44: 'D', // d
			0x46: 'F', // f
			0x47: 'G', // g
			0x48: 'H', // h
			0x4a: 'J', // j
			0x4b: 'K', // k
			0x4c: 'L', // l
			0xba: ':', // ;
			0xde: '`', // '
			0x0d: '\u000d', // [return]
			0x5a: 'Z', // z
			0x58: 'X', // x
			0x43: 'C', // c
			0x56: 'V', // v
			0x42: 'B', // b
			0x4e: 'N', // n
			0x4d: 'M', // m
			0xbc: {
				context: '\'',
				insert: ''
			}, // ,
			0xbe: '.', // .
			0xbf: '\u00c9', // /
			0x20: '\u0020' // [space]
		},
		multikeyCombinations: {
			'\'Y': '\u01b3',
			'\'y': '\u01b4',
			'~R': 'R\u0303',
			'~r': 'r\u0303'
		}
	}
});
