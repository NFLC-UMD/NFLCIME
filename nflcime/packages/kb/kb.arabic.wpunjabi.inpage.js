/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.arabic.wpunjabi.inpage
 * Western Punjabi language keyboard map class.
 *
 * @extends NFLCIME.Keyboard
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.arabic.wpunjabi.inpage',
		type: 'keyboard layout',
		inheritance: ['kb'],
		mapNormal: {
			0xc0: '\u064d', // `
			0x31: '\u06f1', // 1
			0x32: '\u06f2', // 2
			0x33: '\u06f3', // 3
			0x34: '\u06f4', // 4
			0x35: '\u06f5', // 5
			0x36: '\u06f6', // 6
			0x37: '\u06f7', // 7
			0x38: '\u06f8', // 8
			0x39: '\u06f9', // 9
			0x30: '\u06f0', // 0
			0xbd: '\u0623', // -
			0xbb: '\u0624', // =
			0x51: '\u0642', // q
			0x57: '\u0648', // w
			0x45: '\u0639', // e
			0x52: '\u0631', // r
			0x54: '\u062a', // t
			0x59: '\u06d2', // y
			0x55: '\u0621', // u
			0x49: '\u06cc', // i
			0x4f: '\u06c1', // o
			0x50: '\u067e', // p
			0xdb: ']', // [
			0xdd: '[', // ]
			0xdc: '\u06e3', // \
			0x41: '\u0627', // a
			0x53: '\u0633', // s
			0x44: '\u062f', // d
			0x46: '\u0641', // f
			0x47: '\u06af', // g
			0x48: '\u06be', // h
			0x4a: '\u062c', // j
			0x4b: '\u06a9', // k
			0x4c: '\u0644', // l
			0xba: '\u061b', // ;
			0xde: '.', // '
			0x0d: '\u000d', // [return]
			0x5a: '\u0632', // z
			0x58: '\u0634', // x
			0x43: '\u0686', // c
			0x56: '\u0637', // v
			0x42: '\u0628', // b
			0x4e: '\u0646', // n
			0x4d: '\u0645', // m
			0xbc: '\u060c', // ,
			0xbe: '\u06d4', // .
			0xbf: '\u0652', // /
			0x20: '\u0020' // [space]
		},
		mapShift: {
			0xc0: '\u064B', // `
			0x31: '!', // 1
			0x32: ',', // 2
			0x33: '/', // 3
			0x34: '\u0626', // 4
			0x35: '\u064a', // 5
			0x36: '\u06d6', // 6
			0x37: '\u0654', // 7
			0x38: '\u064c', // 8
			0x39: ')', // 9
			0x30: '(', // 0
			0xbd: '\u0651', // -
			0xbb: '\u0622', // =
			0x51: '', // q
			0x57: '\uFDFA', // w
			0x45: '\u06dc', // e
			0x52: '\u0691', // r
			0x54: '\u0679', // t
			0x59: '\u06e6', // y
			0x55: '\u0652', // u
			0x49: '\u0670', // i
			0x4f: '\u0629', // o
			0x50: '\u064f', // p
			0xdb: '\u2018', // [
			0xdd: '\u2019', // ]
			0xdc: '\u06d8', // \
			0x41: '\u0653', // a
			0x53: '\u0635', // s
			0x44: '\u0688', // d
			0x46: '\u06ed', // f
			0x47: '\u063a', // g
			0x48: '\u062d', // h
			0x4a: '\u0636', // j
			0x4b: '\u062e', // k
			0x4c: '\u06da', // l
			0xba: ':', // ;
			0xde: '\u0640', // '
			0x0d: '\u000d', // [return]
			0x5a: '\u0630', // z
			0x58: '\u0698', // x
			0x43: '\u062b', // c
			0x56: '\u0638', // v
			0x42: '\u06d7', // b
			0x4e: '\u06ba', // n
			0x4d: '\u0625', // m
			0xbc: '\u064e', // ,
			0xbe: '\u0650', // .
			0xbf: '\u061F', // /
			0x20: '\u0020' // [space]
		},
		multikeyCombinations: {
			'\u2018\u2018': '\u201c',
			'\u2019\u2019': '\u201d',
			'\u0621\u06d2': '\u0626\u06d2',
			'\u0621\u06cc': '\u0626\u06cc',
			'\u06d2\u0621': '\u0626\u06d2',
			'\u06cc\u0621': '\u0626\u06cc'
		}
	}
});
