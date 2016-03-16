/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.devanagari.hindi.phonetic
 * Hindi Devanagari alphabet phonetic keyboard map class.
 *
 * @extends NFLCIME.Keyboard
 *
 */

NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb.devanagari.hindi.phonetic',
		type: 'keyboard layout',
		inheritance: ['kb'],
		mapNormal: {
			0xc0: '\u093c', // `
			0x31: '\u0967', // 1
			0x32: '\u0968', // 2
			0x33: '\u0969', // 3
			0x34: '\u096a', // 4
			0x35: '\u096b', // 5
			0x36: '\u096c', // 6
			0x37: '\u096d', // 7
			0x38: '\u096e', // 8
			0x39: '\u096f', // 9
			0x30: '\u0966', // 0
			0xbd: '-', // -
			0xbb: '=', // =
			0x51: '\u0958', // q
			0x57: '\u090f', // w
			0x45: '\u0947', // e
			0x52: '\u0930', // r
			0x54: '\u0924', // t
			0x59: '\u092f', // y
			0x55: '\u0941', // u
			0x49: '\u093f', // i
			0x4f: '\u094b', // o
			0x50: '\u092a', // p
			0xdb: '\u0913', // [
			0xdd: '\u090b', // ]
			0xdc: '\u0902', // \
			0x41: '\u0905', // a
			0x53: '\u0938', // s
			0x44: '\u0926', // d
			0x46: '\u094d', // f
			0x47: '\u0917', // g
			0x48: '\u0939', // h
			0x4a: '\u091c', // j
			0x4b: '\u0915', // k
			0x4c: '\u0932', // l
			0xba: '\u0909', // ;
			0xde: '\u0907', // '
			0x0d: '\u000d', // [return]
			0x5a: '\u093e', // z
			0x58: '\u091e', // x
			0x43: '\u091a', // c
			0x56: '\u0935', // v
			0x42: '\u092c', // b
			0x4e: '\u0928', // n
			0x4d: '\u092e', // m
			0xbc: '\u0921', // ,
			0xbe: '\u0964', // .
			0xbf: '.', // /
			0x20: '\u0020' // [space]
		},
		mapShift: {
			0xc0: '\u0950', // `
			0x31: '!', // 1
			0x32: '\u0945', // 2
			0x34: '\u0970', // 4
			0x35: '\u0903', // 5
			0x36: '', // 6
			0x37: '\u0959', // 7
			0x38: '\u095a', // 8
			0x39: '(', // 9
			0x30: ')', // 0
			0xbd: '', // -
			0xbb: '+', // =
			0x51: '', // q
			0x57: '\u0910', // w
			0x45: '\u0948', // e
			0x52: '\u0937', // r
			0x54: '\u0925', // t
			0x59: '', // y
			0x55: '\u0942', // u
			0x49: '\u0940', // i
			0x4f: '\u094c', // o
			0x50: '\u092b', // p
			0xdb: '\u0914', // [
			0xdd: '', // ]
			0xdc: '\u095d', // \
			0x41: '\u0906', // a
			0x53: '\u0936', // s
			0x44: '\u0927', // d
			0x46: '\u0943', // f
			0x47: '\u0918', // g
			0x48: '\u095e', // h
			0x4a: '\u091d', // j
			0x4b: '\u0916', // k
			0x4c: '\u095c', // l
			0xba: '\u090a', // ;
			0xde: '\u0908', // '
			0x0d: '\u000d', // [return]
			0x5a: '\u095b', // z
			0x58: '\u0919', // x
			0x43: '\u091b', // c
			0x56: '\u091F', // v
			0x42: '\u092d', // b
			0x4e: '\u0923', // n
			0x4d: '\u0920', // m
			0xbc: '\u0922', // ,
			0xbe: ',', // .
			0xbf: '?', // /
			0x20: '\u0020' // [space]
		}
	}
});
