/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.hebrew.hebrew.standard
 * @extends NFLCIME.Keyboard
 *
 */

// see http://en.wikipedia.org/wiki/Image:Hebrew_keyboard_layout.png
// RTL-context automatically reverses the display of the () [] {} <> pairs
// so we can map ( => ( instead of ( => )
NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.hebrew.hebrew.standard',
		type: 'keyboard layout',
		inheritance: ['kb'],
		mapNormal: {
			0xc0: ';', // `
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
			0x51: '/', // q
			0x57: '\'', // w
			0x45: '\u05e7', // e
			0x52: '\u05e8', // r
			0x54: '\u05d0', // t
			0x59: '\u05d8', // y
			0x55: '\u05d5', // u
			0x49: '\u05df', // i
			0x4f: '\u05dd', // o
			0x50: '\u05e4', // p
			0xdb: '[', // [
			0xdd: ']', // ]
			0xdc: '\\', // \
			0x41: '\u05e9', // a
			0x53: '\u05d3', // s
			0x44: '\u05d2', // d
			0x46: '\u05db', // f
			0x47: '\u05e2', // g
			0x48: '\u05d9', // h
			0x4a: '\u05d7', // j
			0x4b: '\u05dc', // k
			0x4c: '\u05da', // l
			0xba: '\u05e3', // ;
			0xde: ',', // '
			0x0d: '\u000d', // [return]
			0x5a: '\u05d6', // z
			0x58: '\u05e1', // x
			0x43: '\u05d1', // c
			0x56: '\u05d4', // v
			0x42: '\u05e0', // b
			0x4e: '\u05de', // n
			0x4d: '\u05e6', // m
			0xbc: '\u05ea', // ,
			0xbe: '\u05e5', // .
			0xbf: '.', // /
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
			0x51: '/', // q
			0x57: '\'', // w
			0x45: '\u05e7', // e
			0x52: '\u05e8', // r
			0x54: '\u05d0', // t
			0x59: '\u05d8', // y
			0x55: '\u05d5', // u
			0x49: '\u05df', // i
			0x4f: '\u05dd', // o
			0x50: '\u05e4', // p
			0xdb: '{', // [
			0xdd: '}', // ]
			0xdc: '|', // \
			0x41: '\u05e9', // a
			0x53: '\u05d3', // s
			0x44: '\u05d2', // d
			0x46: '\u05db', // f
			0x47: '\u05e2', // g
			0x48: '\u05d9', // h
			0x4a: '\u05d7', // j
			0x4b: '\u05dc', // k
			0x4c: '\u05da', // l
			0xba: ':', // ;
			0xde: '"', // '
			0x0d: '\u000d', // [return]
			0x5a: '\u05d6', // z
			0x58: '\u05e1', // x
			0x43: '\u05d1', // c
			0x56: '\u05d4', // v
			0x42: '\u05e0', // b
			0x4e: '\u05de', // n
			0x4d: '\u05e6', // m
			0xbc: '<', // ,
			0xbe: '>', // .
			0xbf: '?', // /
			0x20: '\u0020' // [space]
		},
		mapAltCtrl: {
			0xc0: '', // `
			0x31: '', // 1
			0x32: '', // 2
			0x33: '', // 3
			0x34: '\u20aa', // 4
			0x35: '', // 5
			0x36: '', // 6
			0x37: '', // 7
			0x38: '', // 8
			0x39: '', // 9
			0x30: '', // 0
			0xbd: '', // -
			0xbb: '', // =
			0x51: '', // q
			0x57: '', // w
			0x45: '\u20ac', // e
			0x52: '', // r
			0x54: '', // t
			0x59: '', // y
			0x55: '\u05f0', // u
			0x49: '', // i
			0x4f: '', // o
			0x50: '', // p
			0xdb: '', // [
			0xdd: '', // ]
			0xdc: '\u05c0', // \
			0x41: '', // a
			0x53: '', // s
			0x44: '', // d
			0x46: '', // f
			0x47: '', // g
			0x48: '\u05f2', // h
			0x4a: '\u05f1', // j
			0x4b: '', // k
			0x4c: '', // l
			0xba: '\u05c3', // ;
			0xde: '', // '
			0x0d: '\u000d', // [return]
			0x5a: '', // z
			0x58: '', // x
			0x43: '', // c
			0x56: '', // v
			0x42: '', // b
			0x4e: '', // n
			0x4d: '', // m
			0xbc: '\u05f3', // ,
			0xbe: '\u05f4', // .
			0xbf: '', // /
			0x20: '\u0020' // [space]
		},
		mapCtrlShift: {
			0xc0: '\u05b0', // `
			0x31: '\u05b1', // 1
			0x32: '\u05b2', // 2
			0x33: '\u05b3', // 3
			0x34: '\u05b4', // 4
			0x35: '\u05b5', // 5
			0x36: '\u05b6', // 6
			0x37: '\u05b7', // 7
			0x38: '\u05b8', // 8
			0x39: '\u05c2', // 9
			0x30: '\u05c1', // 0
			0xbd: '\u05b9', // -
			0xbb: '\u05bc', // =
			0x51: '', // q
			0x57: '', // w
			0x45: '', // e
			0x52: '', // r
			0x54: '', // t
			0x59: '', // y
			0x55: '', // u
			0x49: '', // i
			0x4f: '', // o
			0x50: '', // p
			0xdb: '', // [
			0xdd: '', // ]
			0xdc: '\u05bb', // \
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
			0xde: '', // '
			0x0d: '\u000d', // [return]
			0x5a: '', // z
			0x58: '', // x
			0x43: '', // c
			0x56: '', // v
			0x42: '', // b
			0x4e: '', // n
			0x4d: '', // m
			0xbc: '', // ,
			0xbe: '', // .
			0xbf: '', // /
			0x20: '\u0020' // [space]
		},
		initialize: function() {
			// make niqqud available when capslock is set and shift is pressed
			this.mapCapslockShift = this.mapCtrlShift;
		}
	}
});
