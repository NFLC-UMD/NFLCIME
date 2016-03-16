/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.devanagari.hindi.phonetic
 * Hindi Devanagari alphabet remington keyboard map class.
 *
 * @extends NFLCIME.kb.devanagari
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.devanagari.hindi.remington',
		type: 'keyboard layout',
		inheritance: ['kb.devanagari'],
		mapNormal: {
			0xc0: '\u093c', // `
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
			0xbd: ',', // -
			0xbb: '\u0943', // =
			0x51: '\u0941', // q
			0x57: '\u0942', // w
			0x45: '\u092e', // e
			0x52: '\u0924', // r
			0x54: '\u091c', // t
			0x59: '\u0932', // y
			0x55: '\u0928', // u
			0x49: '\u092a', // i
			0x4f: '\u0935', // o
			0x50: '\u091a', // p
			0xdb: '\u0916\u094d', // [
			0xdd: ',', // ]
			0xdc: '(', // \
			0x41: '\u0902', // a
			0x53: '\u0947', // s
			0x44: '\u0915', // d
			0x46: '\u093f', // f
			0x47: '\u0939', // g
			0x48: '\u0940', // h
			0x4a: '\u0930', // j
			0x4b: '\u093e', // k
			0x4c: '\u0938', // l
			0xba: '\u092f', // ,
			0xde: '\u0936\u094d', // '
			0x0d: '\u000d', // [return]
			0x5a: '\u094d\u0930', // z
			0x58: '\u0917', // x
			0x43: '\u092c', // c
			0x56: '\u0905', // v
			0x42: '\u0907', // b
			0x4e: '\u0926', // n
			0x4d: '\u0909', // m
			0xbc: '\u090f', // ,
			0xbe: '\u0923\u094d', // .
			0xbf: '\u0927\u094d', // /
			0x20: '\u0020' // [space]
		},
		mapShift: {
			0xc0: '\u0926\u094d\u092f', // `
			0x31: '\u0964', // 1
			0x32: '/', // 2
			0x33: ':', // 3
			0x34: '*', // 4
			0x35: '-', // 5
			0x36: '\'', // 6
			0x37: '"', // 7
			0x38: '\u0926\u094d\u0927', // 8
			0x39: '\u0924\u094d\u0930', // 9
			0x30: '\u090b', // 0
			0xbd: '.', // -
			0xbb: '\u094d', // =
			0x51: '\u092b', // q
			0x57: '\u0945', // w
			0x45: '\u092e\u094d', // e
			0x52: '\u0924\u094d', // r
			0x54: '\u091c\u094d', // t
			0x59: '\u0932\u094d', // y
			0x55: '\u0928\u094d', // u
			0x49: '\u092a\u094d', // i
			0x4f: '\u0935\u094d', // o
			0x50: '\u091a\u094d', // p
			0xdb: '\u0915\u094d\u0937\u094d', // [
			0xdd: '\u0926\u094d\u0935', // ]
			0xdc: ')', // \
			0x41: '\u093e', // a
			0x53: '\u0948', // s
			0x44: '\u0915\u094d', // d
			0x46: '\u0925\u094d', // f
			0x47: '\u0933', // g
			0x48: '\u092d\u094d', // h
			0x4a: '\u0936\u094d\u0930', // j
			0x4b: '\u091c\u094d\u091e', // k
			0x4c: '\u0938\u094d', // l
			0xba: '\u0930\u0942', // ,
			0xde: '\u0937\u094d', // '
			0x0d: '\u000d', // [return]
			0x5a: '\u0930\u094d', // z
			0x58: '\u0917\u094d', // x
			0x43: '\u092c\u094d', // c
			0x56: '\u091f', // v
			0x42: '\u0920', // b
			0x4e: '\u091b', // n
			0x4d: '\u0921', // m
			0xbc: '\u0922', // ,
			0xbe: '\u091d', // .
			0xbf: '\u0918\u094d', // /
			0x20: '\u0020' // [space]
		}
	}
});
