/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.devanagari.hindi.phonetic
 * Hindi Devanagari alphabet windows keyboard map class.
 *
 * @extends NFLCIME.Keyboard
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.devanagari.hindi.windows',
		type: 'keyboard layout',
		inheritance: ['kb'],
		mapNormal: {
			0xc0: '', // `
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
			0xbb: '\u0943', // =
			0x51: '\u094c', // q
			0x57: '\u0948', // w
			0x45: '\u093e', // e
			0x52: '\u0940', // r
			0x54: '\u0942', // t
			0x59: '\u092c', // y
			0x55: '\u0939', // u
			0x49: '\u0917', // i
			0x4f: '\u0926', // o
			0x50: '\u091c', // p
			0xdb: '\u0921', // [
			0xdd: '\u093c', // ]
			0xdc: '\u0949', // \
			0x41: '\u094b', // a
			0x53: '\u0947', // s
			0x44: '\u094d', // d
			0x46: '\u093f', // f
			0x47: '\u0941', // g
			0x48: '\u092a', // h
			0x4a: '\u0930', // j
			0x4b: '\u0915', // k
			0x4c: '\u0924', // l
			0xba: '\u091a', // ;
			0xde: '\u091f', // '
			0x0d: '\u000d', // [return]
			0x5a: '', // z
			0x58: '\u0902', // x
			0x43: '\u092e', // c
			0x56: '\u0928', // v
			0x42: '\u0935', // b
			0x4e: '\u0932', // n
			0x4d: '\u0938', // m
			0xbc: ',', // ,
			0xbe: '.', // .
			0xbf: '\u092f', // /
			0x20: '\u0020' // [space]
		},
		mapShift: {
			0xc0: '', // `
			0x31: '\u090d', // 1
			0x32: '\u0945', // 2
			0x33: '\u094d\u0930', // 3
			0x34: '\u0930\u094d', // 4
			0x35: '\u091c\u094d\u091e', // 5
			0x36: '\u0924\u094d\u0930', // 6
			0x37: '\u0915\u094d\u0937', // 7
			0x38: '\u0936\u094d\u0930', // 8
			0x39: '(', // 9
			0x30: '\u0908', // 0
			0xbd: '\u0903', // -
			0xbb: '\u090b', // =
			0x51: '\u0914', // q
			0x57: '\u0910', // w
			0x45: '\u0906', // e
			0x52: '\u0908', // r
			0x54: '\u090a', // t
			0x59: '\u092d', // y
			0x55: '\u0919', // u
			0x49: '\u0918', // i
			0x4f: '\u0927', // o
			0x50: '\u091d', // p
			0xdb: '\u0922', // [
			0xdd: '\u091e', // ]
			0xdc: '\u0911', // \
			0x41: '\u0913', // a
			0x53: '\u090f', // s
			0x44: '\u0905', // d
			0x46: '\u0907', // f
			0x47: '\u0909', // g
			0x48: '\u092b', // h
			0x4a: '\u0931', // j
			0x4b: '\u0916', // k
			0x4c: '\u0925', // l
			0xba: '\u091b', // ;
			0xde: '\u0920', // '
			0x0d: '\u000d', // [return]
			0x5a: '', // z
			0x58: '\u0901', // x
			0x43: '\u0923', // c
			0x56: '', // v
			0x42: '', // b
			0x4e: '\u0933', // n
			0x4d: '\u0936', // m
			0xbc: '\u0937', // ,
			0xbe: '\u0964', // .
			0xbf: '\u095f', // /
			0x20: '\u0020' // [space]
		}
	}
});
