/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.arabic.kurdish.globalwriter
 * Kashmiri language global keyboard map class.
 *
 * @extends NFLCIME.Keyboard
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.arabic.kurdish.globalwriter',
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
			0xbd: '\u06b5', // -
			0xbb: '\u0695', // =
			0x51: '\u0642', // q
			0x57: '\u0648', // w
			0x45: '\u06d5', // e
			0x52: '\u0631', // r
			0x54: '\u062a', // t
			0x59: '\u06cc', // y
			0x55: '\u0648', // u
			0x49: '\u0650', // i
			0x4f: '\u06c6', // o
			0x50: '\u067e', // p
			0xdb: '\u062d', // [
			0xdd: '\u063a', // ]
			0xdc: '\u0648\u0648', // \
			0x41: '\u0627', // a
			0x53: '\u0633', // s
			0x44: '\u062f', // d
			0x46: '\u0641', // f
			0x47: '\u06af', // g
			0x48: '\u0647', // h
			0x4a: '\u0698', // j
			0x4b: '\u0643', // k
			0x4c: '\u0644', // l
			0xba: '\u06ce', // ;
			0xde: '\u064a', // '
			0x0d: '\u000d', // [return]
			0x5a: '\u0632', // z
			0x58: '\u062e', // x
			0x43: '\u062c', // c
			0x56: '\u06a4', // v
			0x42: '\u0628', // b
			0x4e: '\u0646', // n
			0x4d: '\u0645', // m
			0xbc: '\u060c', // ,
			0xbe: '\u0686', // .
			0xbf: '\u0634', // /
			0x20: '\u0020' // [space]
		},
		mapShift: {
			0xc0: '', // `
			0x31: '!', // 1
			0x32: '\u00ab', // 2
			0x33: '\u00bb', // 3
			0x34: '\u0640', // 4
			0x35: '\u066a', // 5
			0x36: ',', // 6
			0x37: '-', // 7
			0x38: '=', // 8
			0x39: '(', // 9
			0x30: ')', // 0
			0xbd: '{', // -
			0xbb: '}', // =
			0x51: '"', // q
			0x57: '/', // w
			0x45: '\u0626\u06d5', // e
			0x52: '\u0692', // r
			0x54: '\u0621', // t
			0x59: '\u064a', // y
			0x55: '\u0626\u0648', // u
			0x49: '\u0626', // i
			0x4f: '\u0626\u06c6', // o
			0x50: '\'', // p
			0xdb: '\u063a', // [
			0xdd: '\u0639', // ]
			0xdc: '\u0626\u0648\u0648', // \
			0x41: '\u0626\u0627', // a
			0x53: '\u064d', // s
			0x44: '', // d
			0x46: '', // f
			0x47: '\u064e', // g
			0x48: '\u064b', // h
			0x4a: '', // j
			0x4b: '', // k
			0x4c: '', // l
			0xba: '\u0626\u06ce', // ;
			0xde: '\u0626', // '
			0x0d: '\u000d', // [return]
			0x5a: '\u0670', // z
			0x58: '\u0651', // x
			0x43: '\u0652', // c
			0x56: '', // v
			0x42: '', // b
			0x4e: '\u064c', // n
			0x4d: '\u064f', // m
			0xbc: '.', // ,
			0xbe: '\u061b', // .
			0xbf: '\u061F', // /
			0x20: '\u0020' // [space]
		},
		multikeyCombinations: {
			'\u0627\u0621': '\u0623'
		}
	}
});
