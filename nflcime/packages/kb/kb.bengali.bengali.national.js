/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.bengali.bengali.national
 * Bengali language national keyboard map class.
 *
 * @extends NFLCIME.Keyboard
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.bengali.bengali.national',
		type: 'keyboard layout',
		inheritance: ['kb'],
		mapNormal: {
			0xc0: '`', // `
			0x31: '\u09e7', // 1
			0x32: '\u09e8', // 2
			0x33: '\u09e9', // 3
			0x34: '\u09ea', // 4
			0x35: '\u09eb', // 5
			0x36: '\u09ec', // 6
			0x37: '\u09ed', // 7
			0x38: '\u09ee', // 8
			0x39: '\u09ef', // 9
			0x30: '\u09e6', // 0
			0xbd: '-', // -
			0xbb: '=', // =
			0x51: '\u0999', // q
			0x57: '\u09af', // w
			0x45: '\u09a1', // e
			0x52: '\u09aa', // r
			0x54: '\u099f', // t
			0x59: '\u099a', // y
			0x55: '\u099c', // u
			0x49: '\u09b9', // i
			0x4f: '\u0997', // o
			0x50: '\u09dc', // p
			0xdb: '[', // [
			0xdd: ']', // ]
			0xdc: '\\', // \
			0x41: '\u09c3', // a
			0x53: '\u09c1', // s
			0x44: '\u09bf', // d
			0x46: '\u09ac', // f
			0x47: '\u09cd', // g
			0x48: '\u09be', // h
			0x4a: '\u0995', // j
			0x4b: '\u09a4', // k
			0x4c: '\u09a6', // l
			0xba: ';', // ;
			0xde: '\'', // '
			0x0d: '\u000d', // [return]
			0x5a: '\u0981', // z
			0x58: '\u09cb', // x
			0x43: '\u09c7', // c
			0x56: '\u09b0', // v
			0x42: '\u09a8', // b
			0x4e: '\u09b8', // n
			0x4d: '\u09ae', // m
			0xbc: ',', // ,
			0xbe: '.', // .
			0xbf: '/', // /
			0x20: '\u0020' // [space]
		},
		mapShift: {
			0xc0: '\u201c', // `
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
			0x51: '\u0982', // q
			0x57: '\u09df', // w
			0x45: '\u09a2', // e
			0x52: '\u09ab', // r
			0x54: '\u09a0', // t
			0x59: '\u099b', // y
			0x55: '\u099d', // u
			0x49: '\u099e', // i
			0x4f: '\u0998', // o
			0x50: '\u09dd', // p
			0xdb: '{', // [
			0xdd: '}', // ]
			0xdc: '|', // \
			0x41: '\u09d7', // a
			0x53: '\u09c2', // s
			0x44: '\u09c0', // d
			0x46: '\u09ad', // f
			0x47: '\u0964', // g
			0x48: '\u0985', // h
			0x4a: '\u0996', // j
			0x4b: '\u09a5', // k
			0x4c: '\u09a7', // l
			0xba: ':', // ;
			0xde: '"', // '
			0x0d: '\u000d', // [return]
			0x5a: '\u0983', // z
			0x58: '\u09cc', // x
			0x43: '\u09c8', // c
			0x56: '\u09b2', // v
			0x42: '\u09a3', // b
			0x4e: '\u09b7', // n
			0x4d: '\u09b6', // m
			0xbc: '<', // ,
			0xbe: '>', // .
			0xbf: '?', // /
			0x20: '\u0020' // [space]
		},
		mapAltCtrl: {
			0xc0: '', // `
			0x31: '\u09f4', // 1
			0x32: '\u09f5', // 2
			0x33: '\u09f6', // 3
			0x34: '\u09f3', // 4
			0x35: '\u09f7', // 5
			0x36: '\u09f8', // 6
			0x37: '\u0902', // 7
			0x38: '', // 8
			0x39: '', // 9
			0x30: '\u09f9', // 0
			0xbd: '\u200c', // -
			0xbb: '\u200d', // =
			0x51: '\u09e2', // q
			0x57: '\u09cd\u09af', // w
			0x45: '\u09c4', // e
			0x52: '', // r
			0x54: '', // t
			0x59: '', // y
			0x55: '\u09bd', // u
			0x49: '', // i
			0x4f: '', // o
			0x50: '', // p
			0xdb: '', // [
			0xdd: '', // ]
			0xdc: '', // \
			0x41: '\u098b', // a
			0x53: '\u0989', // s
			0x44: '\u0987', // d
			0x46: '\u09f0', // f
			0x47: '\u0965', // g
			0x48: '\u0986', // h
			0x4a: '\u0995\u09cd\u09b7', // j
			0x4b: '\u09a4\u09cd\u200d', // k
			0x4c: '\u098c', // l
			0xba: '', // ;
			0xde: '', // '
			0x0d: '\u000d', // [return]
			0x5a: '\u09fa', // z
			0x58: '\u0993', // x
			0x43: '\u098f', // c
			0x56: '\u09cd\u09b0', // v
			0x42: '', // b
			0x4e: '', // n
			0x4d: '', // m
			0xbc: '', // ,
			0xbe: '\u09bc', // .
			0xbf: '', // /
			0x20: '\u0020' // [space]
		},
		mapAltCtrlShift: {
			0xc0: '', // `
			0x31: '', // 1
			0x32: '', // 2
			0x33: '', // 3
			0x34: '\u09f2', // 4
			0x35: '', // 5
			0x36: '\u09cd\u09ac', // 6
			0x37: '', // 7
			0x38: '', // 8
			0x39: '', // 9
			0x30: '\u098b', // 0
			0xbd: '\u200c', // -
			0xbb: '\u200d', // =
			0x51: '\u09e3', // q
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
			0xdc: '', // \
			0x41: '\u09e0', // a
			0x53: '\u098a', // s
			0x44: '\u0988', // d
			0x46: '\u09f1', // f
			0x47: '', // g
			0x48: '', // h
			0x4a: '', // j
			0x4b: '', // k
			0x4c: '\u09e1', // l
			0xba: '', // ;
			0xde: '', // '
			0x0d: '\u000d', // [return]
			0x5a: '', // z
			0x58: '\u0994', // x
			0x43: '\u0990', // c
			0x56: '\u09cd\u09b0', // v
			0x42: '', // b
			0x4e: '', // n
			0x4d: '', // m
			0xbc: '', // ,
			0xbe: '', // .
			0xbf: '', // /
			0x20: '\u0020' // [space]
		},
		initialize: function() {
			// make alt-ctrl-shift available through ctrl-shift as well (hard to reach otherwise on keyboard without Alt-Gr key)
			this.mapCtrlShift = this.mapAltCtrlShift;
		}
	}
});
