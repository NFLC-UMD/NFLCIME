/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.greek.greek.windows
 * @extends NFLCIME.Keyboard
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.greek.greek.windows',
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
			0x51: ';', // q
			0x57: '\u03c2', // w
			0x45: '\u03b5', // e
			0x52: '\u03c1', // r
			0x54: '\u03c4', // t
			0x59: '\u03c5', // y
			0x55: '\u03b8', // u
			0x49: '\u03b9', // i
			0x4f: '\u03bf', // o
			0x50: '\u03c0', // p
			0xdb: '[', // [
			0xdd: ']', // ]
			0xdc: '\\', // \
			0x41: '\u03b1', // a
			0x53: '\u03c3', // s
			0x44: '\u03b4', // d
			0x46: '\u03c6', // f
			0x47: '\u03b3', // g
			0x48: '\u03b7', // h
			0x4a: '\u03be', // j
			0x4b: '\u03ba', // k
			0x4c: '\u03bb', // l
			0xba: {
				context: '\u0384',
				insert: ''
			}, // ;
			0xde: '\'', // '
			0x0d: '\u000d', // [return]
			0x5a: '\u03b6', // z
			0x58: '\u03c7', // x
			0x43: '\u03c8', // c
			0x56: '\u03c9', // v
			0x42: '\u03b2', // b
			0x4e: '\u03bd', // n
			0x4d: '\u03bc', // m
			0xbc: ',', // ,
			0xbe: '.', // .
			0xbf: '/', // /
			0x20: '\u0020' // [space]
		},
		mapShift: {
			0xc0: '~', // `
			0x31: '!', // 1
			0x32: '@', // 2
			0x33: '#', // 3
			0x34: '$', // 4
			0x35: '%', // 5
			0x36: '^', // 6
			0x37: '&', // 7
			0x38: '*', // 8
			0x39: '(', // 9
			0x30: ')', // 0
			0xbd: '_', // -
			0xbb: '+', // =
			0x51: ':', // q
			0x57: {
				context: '\u0385',
				insert: ''
			}, // w
			0x45: '\u0395', // e
			0x52: '\u03a1', // r
			0x54: '\u03a4', // t
			0x59: '\u03a5', // y
			0x55: '\u0398', // u
			0x49: '\u0399', // i
			0x4f: '\u039f', // o
			0x50: '\u03a0', // p
			0xdb: '{', // [
			0xdd: '}', // ]
			0xdc: '|', // \
			0x41: '\u0391', // a
			0x53: '\u03a3', // s
			0x44: '\u0394', // d
			0x46: '\u03a6', // f
			0x47: '\u0393', // g
			0x48: '\u0397', // h
			0x4a: '\u039e', // j
			0x4b: '\u039a', // k
			0x4c: '\u039b', // l
			0xba: {
				context: '\u00a8',
				insert: ''
			}, // ;
			0xde: '"', // '
			0x0d: '\u000d', // [return]
			0x5a: '\u0396', // z
			0x58: '\u03a7', // x
			0x43: '\u03a8', // c
			0x56: '\u03a9', // v
			0x42: '\u0392', // b
			0x4e: '\u039d', // n
			0x4d: '\u039c', // m
			0xbc: '<', // ,
			0xbe: '>', // .
			0xbf: '?', // /
			0x20: '\u0020' // [space]
		},
		multikeyCombinations: {
			'\u00a8\u0399': '\u03aa',
			'\u00a8\u03a5': '\u03ab',
			'\u00a8\u03b9': '\u03ca',
			'\u00a8\u03c5': '\u03cb',
			'\u0384\u0391': '\u0386',
			'\u0384\u0395': '\u0388',
			'\u0384\u0397': '\u0389',
			'\u0384\u0399': '\u038a',
			'\u0384\u039f': '\u038c',
			'\u0384\u03a5': '\u038e',
			'\u0384\u03a9': '\u038f',
			'\u0384\u03b1': '\u03ac',
			'\u0384\u03b5': '\u03ad',
			'\u0384\u03b7': '\u03ae',
			'\u0384\u03b9': '\u03af',
			'\u0384\u03bf': '\u03cc',
			'\u0384\u03c5': '\u03cd',
			'\u0384\u03c9': '\u03ce',
			'\u0385\u03b9': '\u0390',
			'\u0385\u03c5': '\u03b0'
		}
	}
});
