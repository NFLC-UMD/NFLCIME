/**
 * @docauthor Christopher Rhodes <clrhodes@gmail.com>
 *
 * @class NFLCIME.kb.arabic.pashto.globalwriter
 * Pashto language global keyboard map class.
 *
 * @extends NFLCIME.Keyboard
 *
 */

NFLCIME.dispatchEvent( { type:'ModuleAdd', module:
{
	id:'kb.arabic.pashto.globalwriter',
	type:'keyboard layout',
	inheritance:['kb'],
	mapNormal:{
		0xc0:'', // `
		0x31:'\u06f1', // 1
		0x32:'\u06f2', // 2
		0x33:'\u06f3', // 3
		0x34:'\u06f4', // 4
		0x35:'\u06f5', // 5
		0x36:'\u06f6', // 6
		0x37:'\u06f7', // 7
		0x38:'\u06f8', // 8
		0x39:'\u06f9', // 9
		0x30:'\u06f0', // 0
		0xbd:'\u0626', // -
		0xbb:'\u069a', // =
		0x51:'\u067e', // q
		0x57:'\u0681', // w
		0x45:'\u06d0', // e
		0x52:'\u0642', // r
		0x54:'\u0641', // t
		0x59:'\u063a', // y
		0x55:'\u0639', // u
		0x49:'\u0647', // i
		0x4f:'\u062e', // o
		0x50:'\u0685', // p
		0xdb:'\u062c', // [
		0xdd:'\u0686', // ]
		0xdc:'\u067c', // \
		0x41:'\u0634', // a
		0x53:'\u0633', // s
		0x44:'\u06cc', // d
		0x46:'\u0628', // f
		0x47:'\u0644', // g
		0x48:'\u0627', // h
		0x4a:'\u062a', // j
		0x4b:'\u0646', // k
		0x4c:'\u0645', // l
		0xba:'\u06a9', // ;
		0xde:'\u0693', // '
		0x0d:'\u000d', // [return]
		0x5a:'\u0689', // z
		0x58:'\u062f', // x
		0x43:'\u0698', // c
		0x56:'\u0631', // v
		0x42:'\u0632', // b
		0x4e:'\u06af', // n
		0x4d:'\u0648', // m
		0xbc:'\u060c', // ,
		0xbe:'.', // .
		0xbf:'\u0696', // /
		0x20:'\u0020' // [space]
	},
	mapShift:{
		0xc0:'', // `
		0x31:'!', // 1
		0x32:'\u00ab', // 2
		0x33:'\u00bb', // 3
		0x34:'\u0640', // 4
		0x35:'\u066a', // 5
		0x36:'=', // 6
		0x37:'-', // 7
		0x38:'*', // 8
		0x39:'(', // 9
		0x30:')', // 0
		0xbd:'\u06cd', // -
		0xbb:'+', // =
		0x51:'\u0636', // q
		0x57:'\u0635', // w
		0x45:'\u062b', // e
		0x52:'\'', // r
		0x54:'"', // t
		0x59:'{', // y
		0x55:'}', // u
		0x49:'[', // i
		0x4f:']', // o
		0x50:'\u062d', // p
		0xdb:'\u0623', // [
		0xdd:'\u0621', // ]
		0xdc:'/', // \
		0x41:'', // a
		0x53:'\u00d7', // s
		0x44:'\u064a', // d
		0x46:'\u064e', // f
		0x47:'\u064b', // g
		0x48:'\u0622', // h
		0x4a:'\u0650', // j
		0x4b:'\u06bc', // k
		0x4c:'\u0638', // l
		0xba:'\u0637', // ;
		0xde:'\\', // '
		0x0d:'\u000d', // [return]
		0x5a:'\u0652', // z
		0x58:'\u0651', // x
		0x43:'<', // c
		0x56:'>', // v
		0x42:'\u0630', // b
		0x4e:'\u064f', // n
		0x4d:'\u0624', // m
		0xbc:'\u061b', // ,
		0xbe:':', // .
		0xbf:'\u061F', // /
		0x20:'\u0020' // [space]
	}
}
} );
