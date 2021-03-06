/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.mkhedruli.georgian.phonetic
 * @extends NFLCIME.Keyboard
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.mkhedruli.georgian.phonetic',
		type: 'keyboard layout',
		inheritance: ['kb'],
		mapNormal: {
			0xc0: '\u10e9', // `
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
			0xbb: '\u10ed', // =
			0x51: '\u10e5', // q
			0x57: '\u10d5', // w
			0x45: '\u10d4', // e
			0x52: '\u10e0', // r
			0x54: '\u10e2', // t
			0x59: '\u10d7', // y
			0x55: '\u10e3', // u
			0x49: '\u10d8', // i
			0x4f: '\u10dd', // o
			0x50: '\u10de', // p
			0xdb: '\u10df', // [
			0xdd: '\u10ec', // ]
			0xdc: '\u10eb', // \
			0x41: '\u10d0', // a
			0x53: '\u10e1', // s
			0x44: '\u10d3', // d
			0x46: '\u10e4', // f
			0x47: '\u10d2', // g
			0x48: '\u10f0', // h
			0x4a: '\u10ef', // j
			0x4b: '\u10d9', // k
			0x4c: '\u10da', // l
			0xba: '\u10e6', // ;
			0xde: '\u10e7', // '
			0x0d: '\u000d', // [return]
			0x5a: '\u10d6', // z
			0x58: '\u10ee', // x
			0x43: '\u10ea', // c
			0x56: '\u10df', // v
			0x42: '\u10d1', // b
			0x4e: '\u10dc', // n
			0x4d: '\u10db', // m
			0xbc: ',', // ,
			0xbe: '.', // .
			0xbf: '/', // /
			0x20: '\u0020' // [space]
		},
		mapShift: {
			0xc0: '\u10e9', // `
			0x31: '!', // 1
			0x32: '\u2116', // 2
			0x33: '"', // 3
			0x34: '$', // 4
			0x35: '%', // 5
			0x36: '[', // 6
			0x37: ']', // 7
			0x38: '*', // 8
			0x39: '(', // 9
			0x30: ')', // 0
			0xbd: '\u2013', // -
			0xbb: '\u10ed', // =
			0x51: '\u10e5', // q
			0x57: '\u10d5', // w
			0x45: '\u10d4', // e
			0x52: '\u10e0', // r
			0x54: '\u10e2', // t
			0x59: '\u10d7', // y
			0x55: '\u10e3', // u
			0x49: '\u10d8', // i
			0x4f: '\u10dd', // o
			0x50: '\u10de', // p
			0xdb: '\u10df', // [
			0xdd: '\u10ec', // ]
			0xdc: '\u10eb', // \
			0x41: '\u10d0', // a
			0x53: '\u10e1', // s
			0x44: '\u10d3', // d
			0x46: '\u10e4', // f
			0x47: '\u10d2', // g
			0x48: '\u10f0', // h
			0x4a: '\u10ef', // j
			0x4b: '\u10d9', // k
			0x4c: '\u10da', // l
			0xba: '\u10e6', // ;
			0xde: '\u10e7', // '
			0x0d: '\u000d', // [return]
			0x5a: '\u10d6', // z
			0x58: '\u10ee', // x
			0x43: '\u10ea', // c
			0x56: '\u10df', // v
			0x42: '\u10d1', // b
			0x4e: '\u10dc', // n
			0x4d: '\u10db', // m
			0xbc: ';', // ,
			0xbe: ':', // .
			0xbf: '?', // /
			0x20: '\u0020' // [space]
		}
	}
});
