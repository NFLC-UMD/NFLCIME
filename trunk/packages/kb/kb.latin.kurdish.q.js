NFLCIME.dispatchEvent( { type:'ModuleAdd', module:
{
	id:'kb.latin.kurdish.q',
	type:'keyboard layout',
	inheritance:['kb'],

	mapNormal:{
		0xc0:'"', // `
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
		0xbd:'*', // -
		0xbb:'-', // =

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
		0xdb:'x', // [
		0xdd:'\u00fb', // ]
		0xdc:',', // \

		0x41:'a', // a
		0x53:'s', // s
		0x44:'d', // d
		0x46:'f', // f
		0x47:'g', // g
		0x48:'h', // h
		0x4a:'j', // j
		0x4b:'k', // k
		0x4c:'l', // l
		0xba:'\u015f', // ;
		0xde:'\u00ee', // '
		0x0d:'\u000d', // [return]

		0x5a:'z', // z
		0x58:'x', // x
		0x43:'c', // c
		0x56:'v', // v
		0x42:'b', // b
		0x4e:'n', // n
		0x4d:'m', // m
		0xbc:'\u00ea', // ,
		0xbe:'\u00e7', // .
		0xbf:'.', // /

		0x20:'\u0020' // [space]
	},

	mapShift:{
		0xc0:'\u00e9', // `
		0x31:'!', // 1
		0x32:'\'', // 2
		0x33:'^', // 3
		0x34:'+', // 4
		0x35:'%', // 5
		0x36:'&', // 6
		0x37:'/', // 7
		0x38:'(', // 8
		0x39:')', // 9
		0x30:'=', // 0
		0xbd:'?', // -
		0xbb:'_', // =

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
		0xdb:'X', // [
		0xdd:'\u00db', // ]
		0xdc:';', // \

		0x41:'A', // a
		0x53:'S', // s
		0x44:'D', // d
		0x46:'F', // f
		0x47:'G', // g
		0x48:'H', // h
		0x4a:'J', // j
		0x4b:'K', // k
		0x4c:'L', // l
		0xba:'\u015e', // ;
		0xde:'\u00ce', // '
		0x0d:'\u000d', // [return]

		0x5a:'Z', // z
		0x58:'X', // x
		0x43:'C', // c
		0x56:'V', // v
		0x42:'B', // b
		0x4e:'N', // n
		0x4d:'M', // m
		0xbc:'\u00ca', // ,
		0xbe:'\u00c7', // .
		0xbf:':', // /

		0x20:'\u0020' // [space]
	},

	mapAltCtrl:{
		0xc0:'<', // `
		0x31:'>', // 1
		0x32:'\u00a3', // 2
		0x33:'#', // 3
		0x34:'$', // 4
		0x35:'\u00bd', // 5
		0x36:'\u00be', // 6
		0x37:'{', // 7
		0x38:'[', // 8
		0x39:']', // 9
		0x30:'}', // 0
		0xbd:'\\', // -
		0xbb:'|', // =

		0x51:'@', // q
		0x57:'', // w
		0x45:'\u20ac', // e
		0x52:'\u00b6', // r
		0x54:'\u2122', // t
		0x59:'\u2190', // y
		0x55:'\u00fb', // u
		0x49:'\u0131', // i
		0x4f:'\u00f4', // o
		0x50:'', // p
		0xdb:'\u011f', // [
		0xdd:'~', // ]
		0xdc:'`', // \

		0x41:'\u00e2', // a
		0x53:'\u00a7', // s
		0x44:'', // d
		0x46:'\u00aa', // f
		0x47:'', // g
		0x48:'', // h
		0x4a:'', // j
		0x4b:'', // k
		0x4c:'j', // l
		0xba:'\u00b4', // ;
		0xde:'\'', // '
		0x0d:'\u000d', // [return]

		0x5a:'\u00ab', // z
		0x58:'\u00bb', // x
		0x43:'\u00a2', // c
		0x56:'\u201c', // v
		0x42:'\u201d', // b
		0x4e:'n', // n
		0x4d:'\u00b5', // m
		0xbc:'\u00f6', // ,
		0xbe:'\u00b7', // .
		0xbf:'', // /

		0x20:'\u0020' // [space]
	},

	mapAltCtrlShift:{
		0xc0:'\u00b0', // `
		0x31:'\u00a1', // 1
		0x32:'\u00b2', // 2
		0x33:'\u00b3', // 3
		0x34:'\u00bc', // 4
		0x35:'\u215c', // 5
		0x36:'', // 6
		0x37:'', // 7
		0x38:'', // 8
		0x39:'\u00b1', // 9
		0x30:'\u00b0', // 0
		0xbd:'\u00bf', // -
		0xbb:'', // =

		0x51:'\u03a9', // q
		0x57:'', // w
		0x45:'', // e
		0x52:'\u00ae', // r
		0x54:'', // t
		0x59:'\u00a5', // y
		0x55:'\u00db', // u
		0x49:'I', // i
		0x4f:'\u00d4', // o
		0x50:'', // p
		0xdb:'\u011e', // [
		0xdd:'', // ]
		0xdc:'', // \

		0x41:'\u00c2', // a
		0x53:'', // s
		0x44:'', // d
		0x46:'', // f
		0x47:'', // g
		0x48:'', // h
		0x4a:'J', // j
		0x4b:'', // k
		0x4c:'', // l
		0xba:'', // ;
		0xde:'', // '
		0x0d:'\u000d', // [return]

		0x5a:'<', // z
		0x58:'>', // x
		0x43:'\u00a9', // c
		0x56:'\u2018', // v
		0x42:'\u2019', // b
		0x4e:'N', // n
		0x4d:'\u00ba', // m
		0xbc:'\u00d6', // ,
		0xbe:'\u00f7', // .
		0xbf:'', // /

		0x20:'\u0020' // [space]
	},

	initialize:function() {
		// make alt-ctrl-shift available through ctrl-shift as well (hard to reach otherwise on keyboard without Alt-Gr key)
		this.mapCtrlShift = this.mapAltCtrlShift;
	}
}
} );
