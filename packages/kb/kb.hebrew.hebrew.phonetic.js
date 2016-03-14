NFLCIME.dispatchEvent( { type:'ModuleAdd', module:
{
	id:'kb.hebrew.hebrew.phonetic',
	type:'keyboard layout',
	inheritance:['kb'],
	determineChanges:function(edit, key) {
		var changes = { cursorStart:0, cursorEnd:0, insert:'', context:'' };
		var mappings = this.getKeyMappings();
		var entry;
		if(mappings && (entry = mappings[key])) {
			changes.insert = entry;
			if(/[\u05db\u05de\u05e0\u05e4\u05e6]/.test(this.lastInsertion) && !/[\u05d0-\u05ea]/.test(entry)) {
				var final_form = String.fromCharCode(this.lastInsertion.charCodeAt(0) - 1);
				changes.insert = final_form + changes.insert;
				changes.cursorStart = -1;
			}
		}
		return changes;
	},
	mapNormal:{
		0xc0:'\u05bc', // `
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
		0x51:'\u05e7', // q
		0x57:'\u05e9', // w
		0x45:'\u05e2', // e
		0x52:'\u05e8', // r
		0x54:'\u05ea', // t
		0x59:'\u05d8', // y
		0x55:'\u05d5', // u
		0x49:'\u05d9', // i
		0x4f:'\u05d5', // o
		0x50:'\u05e4', // p
		0xdb:'\u2019', // [
		0xdd:'\u05f2\u05be', // ]
		0xdc:'\u05c1', // \
		0x41:'\u05d0', // a
		0x53:'\u05e1', // s
		0x44:'\u05d3', // d
		0x46:'\u05e4', // f
		0x47:'\u05d2', // g
		0x48:'\u05d4', // h
		0x4a:'\u05d7', // j
		0x4b:'\u05db', // k
		0x4c:'\u05dc', // l
		0xba:';', // ;
		0xde:'\'', // '
		0x0d:'\u000d', // [return]
		0x5a:'\u05d6', // z
		0x58:'\u05e6', // x
		0x43:'\u05db', // c
		0x56:'\u05d5', // v
		0x42:'\u05d1', // b
		0x4e:'\u05e0', // n
		0x4d:'\u05de', // m
		0xbc:',', // ,
		0xbe:'.', // .
		0xbf:'/', // /
		0x20:'\u0020' // [space]
	},
	mapShift:{
		0xc0:'\u05bc', // `
		0x31:'!', // 1
		0x32:'\u201c', // 2
		0x33:'#', // 3
		0x34:'$', // 4
		0x35:'%', // 5
		0x36:'\u201d', // 6
		0x37:'\u20aa', // 7
		0x38:'*', // 8
		0x39:'(', // 9
		0x30:')', // 0
		0xbd:'\u2014', // -
		0xbb:'+', // =
		0x51:'', // q
		0x57:'\u05e9', // w
		0x45:'\u05b5', // e
		0x52:'', // r
		0x54:'\u05d8', // t
		0x59:'\u05ea', // y
		0x55:'\u05d5', // u
		0x49:'', // i
		0x4f:'\u05d5', // o
		0x50:'\u05e3', // p
		0xdb:'{', // [
		0xdd:'}', // ]
		0xdc:'-', // \
		0x41:'\u05b6', // a
		0x53:'\u05e9', // s
		0x44:'\u201e', // d
		0x46:'\u05e3', // f
		0x47:'', // g
		0x48:'\u05ea', // h
		0x4a:'', // j
		0x4b:'\u05da', // k
		0x4c:'\u05dc', // l
		0xba:':', // ;
		0xde:'\u2019', // '
		0x0d:'\u000d', // [return]
		0x5a:'\u05da', // z
		0x58:'\u05e5', // x
		0x43:'\u05db', // c
		0x56:'\u05d1', // v
		0x42:'\u05bc', // b
		0x4e:'\u05df', // n
		0x4d:'\u05dd', // m
		0xbc:'<', // ,
		0xbe:'>', // .
		0xbf:'?', // /
		0x20:'\u0020' // [space]
	}
}
} );