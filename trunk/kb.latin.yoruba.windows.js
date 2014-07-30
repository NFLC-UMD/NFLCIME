// based on a QWERTY layout
NFLCIME.dispatchEvent( { type:'ModuleAdd', module:
{
	id:'kb.latin.yoruba.windows',
	type:'keyboard layout',
	inheritance:['kb'],
	mapNormal:{
		0xc0:'`', // `
		0x31:'1', // 1
		0x32:'2', // 2
		0x33:'3', // 3
		0x34:'4', // 4
		0x35:'5', // 5
		0x36:'6', // 6
		0x37:'7', // 7
		0x38:'8', // 8
		0x39:'9', // 9
		0x30:'0', // 0
		0xbd:'-', // -
		0xbb:'=', // =
		0x51:'q', // q
		0x57:'w', // w
		0x45:'e', // e
		0x52:'r', // r
		0x54:'t', // t
		0x59:'y', // y
		0x55:'u', // u
		0x49:'i', // i
		0x4f:'o', // o
		0x50:'p', // p
		0xdb:'[', // [
		0xdd:']', // ]
		0xdc:'\u0323', // \
		0x41:'a', // a
		0x53:'s', // s
		0x44:'d', // d
		0x46:'f', // f
		0x47:'g', // g
		0x48:'h', // h
		0x4a:'j', // j
		0x4b:'k', // k
		0x4c:'l', // l
		0xba:';', // ;
		0xde:'\u00b4', // '
		0x0d:'\u000d', // [return]
		0x5a:'z', // z
		0x58:'x', // x
		0x43:'c', // c
		0x56:'v', // v
		0x42:'b', // b
		0x4e:'n', // n
		0x4d:'m', // m
		0xbc:',', // ,
		0xbe:'.', // .
		0xbf:'/', // /
		0x20:'\u0020' // [space]
	},
	mapShift:{
		0xc0:'~', // `
		0x31:'!', // 1
		0x32:'@', // 2
		0x33:'#', // 3
		0x34:'$', // 4
		0x35:'%', // 5
		0x36:'^', // 6
		0x37:'&', // 7
		0x38:'*', // 8
		0x39:'(', // 9
		0x30:')', // 0
		0xbd:'_', // -
		0xbb:'+', // =
		0x51:'Q', // q
		0x57:'W', // w
		0x45:'E', // e
		0x52:'R', // r
		0x54:'T', // t
		0x59:'Y', // y
		0x55:'U', // u
		0x49:'I', // i
		0x4f:'O', // o
		0x50:'P', // p
		0xdb:'[', // [
		0xdd:']', // ]
		0xdc:'|', // \
		0x41:'A', // a
		0x53:'S', // s
		0x44:'D', // d
		0x46:'F', // f
		0x47:'G', // g
		0x48:'H', // h
		0x4a:'J', // j
		0x4b:'K', // k
		0x4c:'L', // l
		0xba:':', // ;
		0xde:'"', // '
		0x0d:'\u000d', // [return]
		0x5a:'Z', // z
		0x58:'X', // x
		0x43:'C', // c
		0x56:'V', // v
		0x42:'B', // b
		0x4e:'N', // n
		0x4d:'M', // m
		0xbc:'<', // ,
		0xbe:'>', // .
		0xbf:'?', // /
		0x20:'\u0020' // [space]
	},
	multikeyCombinations:{
		// Grave Accent
		"a`":'\u00e0',
		"A`":'\u00c0',
		"e`":'\u00e8',
		"E`":'\u00c8',
		//"\u1eb8`":'\u1eb8\u0300',
		// alternate method: recombine the dot below with the accented character
		// not as strictly correct or consistant, but it looks better (the accent is legible)
		"\u1eb8`":'\u00c8\u0323',
		"\u1eb9`":'\u1eb9\u0300',
		"i`":'\u00ec',
		"I`":'\u00cc',
		"o`":'\u00f2',
		"O`":'\u00d2',
		//"\u1ecc`":'\u1ecc\u0300',
		// alternate method: recombine the dot below with the accented character
		// not as strictly correct or consistant, but it looks better (the accent is legible)
		"\u1ecc`":'\u00d2\u0323',
		"\u1ecd`":'\u1ecd\u0300',
		"u`":'\u00f9',
		"U`":'\u00d9',
		// Acute Accent
		"a\u00b4":'\u00e1',
		"A\u00b4":'\u00c1',
		"e\u00b4":'\u00e9',
		"E\u00b4":'\u00c9',
		//"\u1eb8\u00b4":'\u1eb8\u0301',
		// alternate method: recombine the dot below with the accented character
		// not as strictly correct or consistant, but it looks better (the accent is legible)
		"\u1eb8\u00b4":'\u00c9\u0323',
		"\u1eb9\u00b4":'\u1eb9\u0301',
		"i\u00b4":'\u00ed',
		"I\u00b4":'\u00cd',
		"o\u00b4":'\u00f3',
		"O\u00b4":'\u00d3',
		//"\u1ecc\u00b4":'\u1ecc\u0301',
		// alternate method: recombine the dot below with the accented character
		// not as strictly correct or consistant, but it looks better (the accent is legible)
		"\u1ecc\u00b4":'\u00d3\u0323',
		"\u1ecd\u00b4":'\u1ecd\u0301',
		"u\u00b4":'\u00fa',
		"U\u00b4":'\u00da',
		// Dot below
		'E\u0323':'\u1eb8',
		'e\u0323':'\u1eb9',
		'O\u0323':'\u1ecc',
		'o\u0323':'\u1ecd',
		'S\u0323':'\u1e62',
		's\u0323':'\u1e63'
	}
}
} );