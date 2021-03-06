/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.thai.thai.kedmanee
 * @extends NFLCIME.Keyboard
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.thai.thai.kedmanee',
		type: 'keyboard layout',
		inheritance: ['kb'],
		mapNormal: {
			0xc0: '_', // `
			0x31: '\u0e45', // 1
			0x32: '/', // 2
			0x33: '-', // 3
			0x34: '\u0e20', // 4
			0x35: '\u0e16', // 5
			0x36: '\u0e38', // 6
			0x37: '\u0e36', // 7
			0x38: '\u0e04', // 8
			0x39: '\u0e15', // 9
			0x30: '\u0e08', // 0
			0xbd: '\u0e02', // -
			0xbb: '\u0e0a', // =
			0x51: '\u0e46', // q
			0x57: '\u0e44', // w
			0x45: '\u0e33', // e
			0x52: '\u0e1e', // r
			0x54: '\u0e30', // t
			0x59: '\u0e31', // y
			0x55: '\u0e35', // u
			0x49: '\u0e23', // i
			0x4f: '\u0e19', // o
			0x50: '\u0e22', // p
			0xdb: '\u0e1a', // [
			0xdd: '\u0e25', // ]
			0xdc: '\u0e03', // \
			0x41: '\u0e1f', // a
			0x53: '\u0e2b', // s
			0x44: '\u0e01', // d
			0x46: '\u0e14', // f
			0x47: '\u0e40', // g
			0x48: '\u0e49', // h
			0x4a: '\u0e48', // j
			0x4b: '\u0e32', // k
			0x4c: '\u0e2a', // l
			0xba: '\u0e27', // ;
			0xde: '\u0e07', // '
			0x0d: '\u000d', // [return]
			0x5a: '\u0e1c', // z
			0x58: '\u0e1b', // x
			0x43: '\u0e41', // c
			0x56: '\u0e2d', // v
			0x42: '\u0e34', // b
			0x4e: '\u0e37', // n
			0x4d: '\u0e17', // m
			0xbc: '\u0e21', // ,
			0xbe: '\u0e43', // .
			0xbf: '\u0e1d', // /
			0x20: '\u0020' // [space]
		},
		mapShift: {
			0xc0: '%', // `
			0x31: '+', // 1
			0x32: '\u0e51', // 2
			0x33: '\u0e52', // 3
			0x34: '\u0e53', // 4
			0x35: '\u0e54', // 5
			0x36: '\u0e39', // 6
			0x37: '\u0e3f', // 7
			0x38: '\u0e55', // 8
			0x39: '\u0e56', // 9
			0x30: '\u0e57', // 0
			0xbd: '\u0e58', // -
			0xbb: '\u0e59', // =
			0x51: '\u0e50', // q
			0x57: '"', // w
			0x45: '\u0e0e', // e
			0x52: '\u0e11', // r
			0x54: '\u0e18', // t
			0x59: '\u0e4d', // y
			0x55: '\u0e4a', // u
			0x49: '\u0e13', // i
			0x4f: '\u0e2f', // o
			0x50: '\u0e0d', // p
			0xdb: '\u0e10', // [
			0xdd: ',', // ]
			0xdc: '\u0e05', // \
			0x41: '\u0e24', // a
			0x53: '\u0e06', // s
			0x44: '\u0e0f', // d
			0x46: '\u0e42', // f
			0x47: '\u0e0c', // g
			0x48: '\u0e47', // h
			0x4a: '\u0e4b', // j
			0x4b: '\u0e29', // k
			0x4c: '\u0e28', // l
			0xba: '\u0e0b', // ;
			0xde: '.', // '
			0x0d: '\u000d', // [return]
			0x5a: '(', // z
			0x58: ')', // x
			0x43: '\u0e09', // c
			0x56: '\u0e2e', // v
			0x42: '\u0e3a', // b
			0x4e: '\u0e4c', // n
			0x4d: '?', // m
			0xbc: '\u0e12', // ,
			0xbe: '\u0e2c', // .
			0xbf: '\u0e26', // /
			0x20: '\u0020' // [space]
		}
	}
});
