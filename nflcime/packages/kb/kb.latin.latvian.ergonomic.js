/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.latin.latvian.ergonomic
 * @extends NFLCIME.Keyboard
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.latin.latvian.ergonomic',
		type: 'keyboard layout',
		inheritance: ['kb'],
		mapNormal: {
			0xc0: '\u00ad', // `
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
			0xbb: 'f', // =
			0x51: '\u016b', // q
			0x57: 'g', // w
			0x45: 'j', // e
			0x52: 'r', // r
			0x54: 'm', // t
			0x59: 'v', // y
			0x55: 'n', // u
			0x49: 'z', // i
			0x4f: '\u0113', // o
			0x50: '\u010d', // p
			0xdb: '\u017e', // [
			0xdd: 'h', // ]
			0xdc: '\u0137', // \
			0x41: '\u0161', // a
			0x53: 'u', // s
			0x44: 's', // d
			0x46: 'i', // f
			0x47: 'l', // g
			0x48: 'd', // h
			0x4a: 'a', // j
			0x4b: 't', // k
			0x4c: 'e', // l
			0xba: 'c', // ;
			0xde: {
				context: '\u00b4',
				insert: ''
			}, // '
			0x0d: '\u000d', // [return]
			0x5a: '\u0146', // z
			0x58: 'b', // x
			0x43: '\u012b', // c
			0x56: 'k', // v
			0x42: 'p', // b
			0x4e: 'o', // n
			0x4d: '\u0101', // m
			0xbc: ',', // ,
			0xbe: '.', // .
			0xbf: '\u013c', // /
			0x20: '\u0020' // [space]
		},
		mapShift: {
			0xc0: '?', // `
			0x31: '!', // 1
			0x32: '\u00ab', // 2
			0x33: '\u00bb', // 3
			0x34: '$', // 4
			0x35: '%', // 5
			0x36: '/', // 6
			0x37: '&', // 7
			0x38: '\u00d7', // 8
			0x39: '(', // 9
			0x30: ')', // 0
			0xbd: '_', // -
			0xbb: 'F', // =
			0x51: '\u016a', // q
			0x57: 'G', // w
			0x45: 'J', // e
			0x52: 'R', // r
			0x54: 'M', // t
			0x59: 'V', // y
			0x55: 'N', // u
			0x49: 'Z', // i
			0x4f: '\u0112', // o
			0x50: '\u010c', // p
			0xdb: '\u017d', // [
			0xdd: 'H', // ]
			0xdc: '\u0136', // \
			0x41: '\u0160', // a
			0x53: 'U', // s
			0x44: 'S', // d
			0x46: 'I', // f
			0x47: 'L', // g
			0x48: 'D', // h
			0x4a: 'A', // j
			0x4b: 'T', // k
			0x4c: 'E', // l
			0xba: 'C', // ;
			0xde: {
				context: '\u00b0',
				insert: ''
			}, // '
			0x0d: '\u000d', // [return]
			0x5a: '\u0145', // z
			0x58: 'B', // x
			0x43: '\u012a', // c
			0x56: 'K', // v
			0x42: 'P', // b
			0x4e: 'O', // n
			0x4d: '\u0100', // m
			0xbc: ';', // ,
			0xbe: ':', // .
			0xbf: '\u013b', // /
			0x20: '\u0020' // [space]
		},
		mapAltCtrl: {
			0xc0: '', // `
			0x31: '\u00ab', // 1
			0x32: '', // 2
			0x33: '', // 3
			0x34: '\u20ac', // 4
			0x35: '"', // 5
			0x36: '\u2019', // 6
			0x37: '', // 7
			0x38: ':', // 8
			0x39: '', // 9
			0x30: '', // 0
			0xbd: '\u2013', // -
			0xbb: '=', // =
			0x51: 'q', // q
			0x57: '\u0123', // w
			0x45: '', // e
			0x52: '\u0157', // r
			0x54: 'w', // t
			0x59: 'y', // y
			0x55: '', // u
			0x49: '', // i
			0x4f: '', // o
			0x50: '', // p
			0xdb: '[', // [
			0xdd: ']', // ]
			0xdc: '', // \
			0x41: '', // a
			0x53: '', // s
			0x44: '', // d
			0x46: '', // f
			0x47: '', // g
			0x48: '', // h
			0x4a: '', // j
			0x4b: '', // k
			0x4c: '\u20ac', // l
			0xba: '', // ;
			0xde: {
				context: '\u00b4',
				insert: ''
			}, // '
			0x0d: '\u000d', // [return]
			0x5a: '', // z
			0x58: 'x', // x
			0x43: '', // c
			0x56: '\u0137', // v
			0x42: '', // b
			0x4e: '\u00f5', // n
			0x4d: '', // m
			0xbc: '<', // ,
			0xbe: '>', // .
			0xbf: '\u013c', // /
			0x20: '\u0020' // [space]
		},
		mapAltCtrlShift: {
			0xc0: '', // `
			0x31: '', // 1
			0x32: '@', // 2
			0x33: '#', // 3
			0x34: '', // 4
			0x35: {
				context: '~',
				insert: ''
			}, // 5
			0x36: '^', // 6
			0x37: '\u00b1', // 7
			0x38: '', // 8
			0x39: '', // 9
			0x30: '', // 0
			0xbd: '\u2014', // -
			0xbb: ';', // =
			0x51: '', // q
			0x57: '\u0122', // w
			0x45: '', // e
			0x52: '\u0156', // r
			0x54: '', // t
			0x59: 'Y', // y
			0x55: '', // u
			0x49: '', // i
			0x4f: '', // o
			0x50: '', // p
			0xdb: '{', // [
			0xdd: '}', // ]
			0xdc: '', // \
			0x41: '', // a
			0x53: '', // s
			0x44: '', // d
			0x46: '', // f
			0x47: '', // g
			0x48: '', // h
			0x4a: '', // j
			0x4b: '', // k
			0x4c: '', // l
			0xba: '', // ;
			0xde: {
				context: '\u00a8',
				insert: ''
			}, // '
			0x0d: '\u000d', // [return]
			0x5a: '\u0145', // z
			0x58: 'X', // x
			0x43: '', // c
			0x56: '\u0136', // v
			0x42: '', // b
			0x4e: '\u00d5', // n
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
