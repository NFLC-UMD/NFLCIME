/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.latin.latvian.windows
 * @extends NFLCIME.Keyboard
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.latin.latvian.windows',
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
			0xdb: '[', // [
			0xdd: ']', // ]
			0xdc: {
				context: '\u00b0',
				insert: ''
			}, // \
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
			0xde: '\'', // '
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
			0xbf: '/', // /
			0x20: '\u0020' // [space]
		},
		mapShift: {
			0xc0: {
				context: '~',
				insert: ''
			}, // `
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
			0xdb: '{', // [
			0xdd: '}', // ]
			0xdc: '|', // \
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
			0xde: '"', // '
			0x0d: '\u000d', // [return]
			0x5a: 'Z', // z
			0x58: 'X', // x
			0x43: 'C', // c
			0x56: 'V', // v
			0x42: 'B', // b
			0x4e: 'N', // n
			0x4d: 'M', // m
			0xbc: '<', // ,
			0xbe: '>', // .
			0xbf: '?', // /
			0x20: '\u0020' // [space]
		},
		mapAltCtrl: {
			0xc0: '', // `
			0x31: '\u00a0', // 1
			0x32: '\u00ab', // 2
			0x33: '\u00bb', // 3
			0x34: '\u20ac', // 4
			0x35: '', // 5
			0x36: '\u2019', // 6
			0x37: '', // 7
			0x38: '', // 8
			0x39: '', // 9
			0x30: '', // 0
			0xbd: '\u2013', // -
			0xbb: '', // =
			0x51: '', // q
			0x57: '', // w
			0x45: '\u0113', // e
			0x52: '\u0157', // r
			0x54: '', // t
			0x59: '', // y
			0x55: '\u016b', // u
			0x49: '\u012b', // i
			0x4f: '\u00f5', // o
			0x50: '', // p
			0xdb: '', // [
			0xdd: '', // ]
			0xdc: '', // \
			0x41: '\u0101', // a
			0x53: '\u0161', // s
			0x44: '', // d
			0x46: '', // f
			0x47: '\u0123', // g
			0x48: '', // h
			0x4a: '', // j
			0x4b: '\u0137', // k
			0x4c: '\u013c', // l
			0xba: ';', // ;
			0xde: {
				context: '\u00b4',
				insert: ''
			}, // '
			0x0d: '\u000d', // [return]
			0x5a: '\u017e', // z
			0x58: '', // x
			0x43: '\u010d', // c
			0x56: '', // v
			0x42: '', // b
			0x4e: '\u0146', // n
			0x4d: '', // m
			0xbc: ',', // ,
			0xbe: '.', // .
			0xbf: '/', // /
			0x20: '\u0020' // [space]
		},
		mapAltCtrlShift: {
			0xc0: '~', // `
			0x31: '!', // 1
			0x32: '@', // 2
			0x33: '#', // 3
			0x34: '\u00a7', // 4
			0x35: '\u00b0', // 5
			0x36: '^', // 6
			0x37: '\u00b1', // 7
			0x38: '\u00d7', // 8
			0x39: '(', // 9
			0x30: ')', // 0
			0xbd: '\u2014', // -
			0xbb: '+', // =
			0x51: '', // q
			0x57: '', // w
			0x45: '\u0112', // e
			0x52: '\u0156', // r
			0x54: '', // t
			0x59: '', // y
			0x55: '\u016a', // u
			0x49: '\u012a', // i
			0x4f: '\u00d5', // o
			0x50: '', // p
			0xdb: '', // [
			0xdd: '', // ]
			0xdc: '', // \
			0x41: '\u0100', // a
			0x53: '\u0160', // s
			0x44: '', // d
			0x46: '', // f
			0x47: '\u0122', // g
			0x48: '', // h
			0x4a: '', // j
			0x4b: '\u0136', // k
			0x4c: '\u013b', // l
			0xba: '', // ;
			0xde: {
				context: '\u00a8',
				insert: ''
			}, // '
			0x0d: '\u000d', // [return]
			0x5a: '\u017d', // z
			0x58: '', // x
			0x43: '\u010c', // c
			0x56: '', // v
			0x42: '', // b
			0x4e: '\u0145', // n
			0x4d: '', // m
			0xbc: '', // ,
			0xbe: '', // .
			0xbf: '', // /
			0x20: '\u0020' // [space]
		},
		multikeyCombinations: {
			'\u00a8A': '\u00c4',
			'\u00a8a': '\u00e4',
			'\u00a8O': '\u00d6',
			'\u00a8o': '\u00f6',
			'\u00a8U': '\u00dc',
			'\u00a8u': '\u00fc',
			'\u00b0A': '\u00c5',
			'\u00b0a': '\u00e5',
			'\u00b0E': '\u0116',
			'\u00b0e': '\u0117',
			'\u00b0G': '\u0120',
			'\u00b0g': '\u0121',
			'\u00b4C': '\u0106',
			'\u00b4c': '\u0107',
			'\u00b4E': '\u00c9',
			'\u00b4e': '\u00e9',
			'\u00b4N': '\u0143',
			'\u00b4n': '\u0144',
			'\u00b4O': '\u00d3',
			'\u00b4o': '\u00f3',
			'\u00b4S': '\u015a',
			'\u00b4s': '\u015b',
			'\u00b4Z': '\u0179',
			'\u00b4z': '\u017a',
			'~O': '\u00d5',
			'~o': '\u00f5'
		},
		initialize: function() {
			// make alt-ctrl-shift available through ctrl-shift as well (hard to reach otherwise on keyboard without Alt-Gr key)
			this.mapCtrlShift = this.mapAltCtrlShift;
		}
	}
});
