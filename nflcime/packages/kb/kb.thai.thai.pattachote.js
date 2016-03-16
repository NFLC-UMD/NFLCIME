/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.thai.thai.pattachote
 * @extends NFLCIME.Keyboard
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.thai.thai.pattachote',
		type: 'keyboard layout',
		inheritance: ['kb'],
		mapNormal: {
			0xc0: '_', // `
			0x31: '=', // 1
			0x32: '\u0e52', // 2
			0x33: '\u0e53', // 3
			0x34: '\u0e54', // 4
			0x35: '\u0e55', // 5
			0x36: '\u0e39', // 6
			0x37: '\u0e57', // 7
			0x38: '\u0e58', // 8
			0x39: '\u0e59', // 9
			0x30: '\u0e50', // 0
			0xbd: '\u0e51', // -
			0xbb: '\u0e56', // =
			0x51: '\u0e47', // q
			0x57: '\u0e15', // w
			0x45: '\u0e22', // e
			0x52: '\u0e2d', // r
			0x54: '\u0e23', // t
			0x59: '\u0e48', // y
			0x55: '\u0e14', // u
			0x49: '\u0e21', // i
			0x4f: '\u0e27', // o
			0x50: '\u0e41', // p
			0xdb: '\u0e43', // [
			0xdd: '\u0e0c', // ]
			0xdc: '', // \
			0x41: '\u0e49', // a
			0x53: '\u0e17', // s
			0x44: '\u0e07', // d
			0x46: '\u0e01', // f
			0x47: '\u0e31', // g
			0x48: '\u0e35', // h
			0x4a: '\u0e32', // j
			0x4b: '\u0e19', // k
			0x4c: '\u0e40', // l
			0xba: '\u0e44', // ;
			0xde: '\u0e02', // '
			0x0d: '\u000d', // [return]
			0x5a: '\u0e1a', // z
			0x58: '\u0e1b', // x
			0x43: '\u0e25', // c
			0x56: '\u0e2b', // v
			0x42: '\u0e34', // b
			0x4e: '\u0e04', // n
			0x4d: '\u0e2a', // m
			0xbc: '\u0e30', // ,
			0xbe: '\u0e08', // .
			0xbf: '\u0e1e', // /
			0x20: '\u0020' // [space]
		},
		mapShift: {
			0xc0: '\u0e3f', // `
			0x31: '+', // 1
			0x32: '"', // 2
			0x33: '/', // 3
			0x34: ',', // 4
			0x35: '?', // 5
			0x36: '\u0e38', // 6
			0x37: '_', // 7
			0x38: '.', // 8
			0x39: '(', // 9
			0x30: ')', // 0
			0xbd: '-', // -
			0xbb: '%', // =
			0x51: '\u0e4a', // q
			0x57: '\u0e24', // w
			0x45: '\u0e46', // e
			0x52: '\u0e0d', // r
			0x54: '\u0e29', // t
			0x59: '\u0e36', // y
			0x55: '\u0e1d', // u
			0x49: '\u0e0b', // i
			0x4f: '\u0e16', // o
			0x50: '\u0e12', // p
			0xdb: '\u0e2f', // [
			0xdd: '\u0e26', // ]
			0xdc: '\u0e4d', // \
			0x41: '\u0e4b', // a
			0x53: '\u0e18', // s
			0x44: '\u0e33', // d
			0x46: '\u0e13', // f
			0x47: '\u0e4c', // g
			0x48: '\u0e37', // h
			0x4a: '\u0e1c', // j
			0x4b: '\u0e0a', // k
			0x4c: '\u0e42', // l
			0xba: '\u0e06', // ;
			0xde: '\u0e11', // '
			0x0d: '\u000d', // [return]
			0x5a: '\u0e0e', // z
			0x58: '\u0e0f', // x
			0x43: '\u0e10', // c
			0x56: '\u0e20', // v
			0x42: '\u0e31', // b
			0x4e: '\u0e28', // n
			0x4d: '\u0e2e', // m
			0xbc: '\u0e1f', // ,
			0xbe: '\u0e09', // .
			0xbf: '\u0e2c', // /
			0x20: '\u0020' // [space]
		}
	}
});
