/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.latin.turkish.f
 * @extends NFLCIME.Keyboard
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.latin.turkish.f',
		type: 'keyboard layout',
		inheritance: ['kb'],
		mapNormal: {
			0xc0: '+', // `
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
			0xbd: '/', // -
			0xbb: '-', // =
			0x51: 'f', // q
			0x57: 'g', // w
			0x45: '\u011f', // e
			0x52: '\u0131', // r
			0x54: 'o', // t
			0x59: 'd', // y
			0x55: 'r', // u
			0x49: 'n', // i
			0x4f: 'h', // o
			0x50: 'p', // p
			0xdb: 'q', // [
			0xdd: 'w', // ]
			0xdc: 'x', // \
			0x41: 'u', // a
			0x53: 'i', // s
			0x44: 'e', // d
			0x46: 'a', // f
			0x47: '\u00fc', // g
			0x48: 't', // h
			0x4a: 'k', // j
			0x4b: 'm', // k
			0x4c: 'l', // l
			0xba: 'y', // ;
			0xde: '\u015f', // '
			0x0d: '\u000d', // [return]
			0x5a: 'j', // z
			0x58: '\u00f6', // x
			0x43: 'v', // c
			0x56: 'c', // v
			0x42: '\u00e7', // b
			0x4e: 'z', // n
			0x4d: 's', // m
			0xbc: 'b', // ,
			0xbe: '.', // .
			0xbf: ',', // /
			0x20: '\u0020' // [space]
		},
		mapShift: {
			0xc0: '*', // `
			0x31: '!', // 1
			0x32: '"', // 2
			0x33: {
				context: '^',
				insert: ''
			}, // 3
			0x34: '$', // 4
			0x35: '%', // 5
			0x36: '&', // 6
			0x37: '\'', // 7
			0x38: '(', // 8
			0x39: ')', // 9
			0x30: '=', // 0
			0xbd: '?', // -
			0xbb: '_', // =
			0x51: 'F', // q
			0x57: 'G', // w
			0x45: '\u011e', // e
			0x52: 'I', // r
			0x54: 'O', // t
			0x59: 'D', // y
			0x55: 'R', // u
			0x49: 'N', // i
			0x4f: 'H', // o
			0x50: 'P', // p
			0xdb: 'Q', // [
			0xdd: 'W', // ]
			0xdc: 'X', // \
			0x41: 'U', // a
			0x53: '\u0130', // s
			0x44: 'E', // d
			0x46: 'A', // f
			0x47: '\u00dc', // g
			0x48: 'T', // h
			0x4a: 'K', // j
			0x4b: 'M', // k
			0x4c: 'L', // l
			0xba: 'Y', // ;
			0xde: '\u015e', // '
			0x0d: '\u000d', // [return]
			0x5a: 'J', // z
			0x58: '\u00d6', // x
			0x43: 'V', // c
			0x56: 'C', // v
			0x42: '\u00c7', // b
			0x4e: 'Z', // n
			0x4d: 'S', // m
			0xbc: 'B', // ,
			0xbe: ':', // .
			0xbf: ';', // /
			0x20: '\u0020' // [space]
		},
		mapAltCtrl: {
			0xc0: '\u00ac', // `
			0x31: '\u00b9', // 1
			0x32: '\u00b2', // 2
			0x33: '#', // 3
			0x34: '\u00bc', // 4
			0x35: '\u00bd', // 5
			0x36: '\u00be', // 6
			0x37: '{', // 7
			0x38: '[', // 8
			0x39: ']', // 9
			0x30: '}', // 0
			0xbd: '\\', // -
			0xbb: '|', // =
			0x51: '@', // q
			0x57: '', // w
			0x45: '', // e
			0x52: '\u00b6', // r
			0x54: '', // t
			0x59: '', // y
			0x55: '', // u
			0x49: '', // i
			0x4f: '\u00f8', // o
			0x50: '\u00a3', // p
			0xdb: {
				context: '\u00a8',
				insert: ''
			}, // [
			0xdd: {
				context: '~',
				insert: ''
			}, // ]
			0xdc: {
				context: '`',
				insert: ''
			}, // \
			0x41: '\u00e6', // a
			0x53: '\u00df', // s
			0x44: '\u20ac', // d
			0x46: '', // f
			0x47: '', // g
			0x48: '', // h
			0x4a: '', // j
			0x4b: '', // k
			0x4c: '', // l
			0xba: {
				context: '\u00b4',
				insert: ''
			}, // ;
			0xde: '', // '
			0x0d: '\u000d', // [return]
			0x5a: '\u00ab', // z
			0x58: '\u00bb', // x
			0x43: '\u00a2', // c
			0x56: '', // v
			0x42: '', // b
			0x4e: '', // n
			0x4d: '\u00b5', // m
			0xbc: '\u00d7', // ,
			0xbe: '\u00f7', // .
			0xbf: '-', // /
			0x20: '\u0020' // [space]
		},
		mapAltCtrlShift: {
			0xc0: '\u00ac', // `
			0x31: '\u00a1', // 1
			0x32: '', // 2
			0x33: '\u00b3', // 3
			0x34: '\u00a4', // 4
			0x35: '', // 5
			0x36: '', // 6
			0x37: '', // 7
			0x38: '', // 8
			0x39: '', // 9
			0x30: '', // 0
			0xbd: '\u00bf', // -
			0xbb: '|', // =
			0x51: '', // q
			0x57: '', // w
			0x45: '', // e
			0x52: '\u00ae', // r
			0x54: '', // t
			0x59: '', // y
			0x55: '', // u
			0x49: '', // i
			0x4f: '\u00d8', // o
			0x50: '', // p
			0xdb: '', // [
			0xdd: '', // ]
			0xdc: '', // \
			0x41: '\u00c6', // a
			0x53: '\u00a7', // s
			0x44: '', // d
			0x46: '\u00aa', // f
			0x47: '', // g
			0x48: '', // h
			0x4a: '', // j
			0x4b: '', // k
			0x4c: '', // l
			0xba: '', // ;
			0xde: '', // '
			0x0d: '\u000d', // [return]
			0x5a: '<', // z
			0x58: '>', // x
			0x43: '\u00a9', // c
			0x56: '', // v
			0x42: '', // b
			0x4e: '', // n
			0x4d: '\u00b0', // m
			0xbc: '', // ,
			0xbe: '', // .
			0xbf: '', // /
			0x20: '\u0020' // [space]
		},
		multikeyCombinations: {
			'\u00a8A': '\u00c4',
			'\u00a8a': '\u00e4',
			'\u00a8E': '\u00cb',
			'\u00a8e': '\u00eb',
			'\u00a8I': '\u00cf',
			'\u00a8i': '\u00ef',
			'\u00a8O': '\u00d6',
			'\u00a8o': '\u00f6',
			'\u00a8U': '\u00dc',
			'\u00a8u': '\u00fc',
			'\u00a8\u0130': '\u00cf',
			'\u00a8\u0131': '\u00ef',
			'\u00b4A': '\u00c1',
			'\u00b4a': '\u00e1',
			'\u00b4E': '\u00c9',
			'\u00b4e': '\u00e9',
			'\u00b4I': '\u00cd',
			'\u00b4i': '\u00ed',
			'\u00b4O': '\u00d3',
			'\u00b4o': '\u00f3',
			'\u00b4U': '\u00da',
			'\u00b4u': '\u00fa',
			'\u00b4\u0130': '\u00cd',
			'\u00b4\u0131': '\u00ed',
			'^A': '\u00c2',
			'^a': '\u00e2',
			'^E': '\u00ca',
			'^e': '\u00ea',
			'^I': '\u00ce',
			'^i': '\u00ee',
			'^O': '\u00d4',
			'^o': '\u00f4',
			'^U': '\u00db',
			'^u': '\u00fb',
			'^\u0130': '\u00ce',
			'^\u0131': '\u00ee',
			'`A': '\u00c0',
			'`a': '\u00e0',
			'`E': '\u00c8',
			'`e': '\u00e8',
			'`I': '\u00cc',
			'`i': '\u00ec',
			'`O': '\u00d2',
			'`o': '\u00f2',
			'`U': '\u00d9',
			'`u': '\u00f9',
			'`\u0130': '\u00cc',
			'`\u0131': '\u00ec',
			'~A': '\u00c3',
			'~a': '\u00e3',
			'~N': '\u00d1',
			'~n': '\u00f1',
			'~O': '\u00d5',
			'~o': '\u00f5'
		},
		initialize: function() {
			// make alt-ctrl-shift available through ctrl-shift as well (hard to reach otherwise on keyboard without Alt-Gr key)
			this.mapCtrlShift = this.mapAltCtrlShift;
		}
	}
});
