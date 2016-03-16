/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.latin.tagalog.windows
 * @extends NFLCIME.Keyboard
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.latin.tagalog.windows',
		type: 'keyboard layout',
		inheritance: ['kb'],
		mapNormal: {
			0xc0: {
				context: '`',
				insert: ''
			}, // `
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
			0xdb: {
				context: '\u00b4',
				insert: ''
			}, // [
			0xdd: {
				context: '^',
				insert: ''
			}, // ]
			0xdc: '\\', // \
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
			0xc0: '~', // `
			0x31: '!', // 1
			0x32: '"', // 2
			0x33: '#', // 3
			0x34: '$', // 4
			0x35: '%', // 5
			0x36: {
				context: '^',
				insert: ''
			}, // 6
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
		multikeyCombinations: {
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
			'`A': '\u00c0',
			'`a': '\u00e0',
			'`E': '\u00c8',
			'`e': '\u00e8',
			'`I': '\u00cc',
			'`i': '\u00ec',
			'`O': '\u00d2',
			'`o': '\u00f2',
			'`U': '\u00d9',
			'`u': '\u00f9'
		}
	}
});
