NFLCIME.dispatchEvent( { type:'ModuleAdd', module:
{
	id:'cvt.devanagari.hindi.jaipur',
	type:'encoding converter',
	inheritance:['cvt'],
	lang:'hi',
	// TODO: replace this early, state-machine implementation with RegExp based conversion for consistency sake
	insertBeforeConsonants:function(s, c) {
		var i = s.length - 1;
		while(cc = s.charCodeAt(i), !(cc >= 0x0915 && cc <= 0x0939) && i > 0) i--;
		if(i > 0) {
			while(s.charCodeAt(i - 1) == 0x094d) i -= 2;
		}
		return s.substr(0, i) + c + s.substr(i);
	},
	insertAfterConsonants:function(s, c) {
		var i = s.length - 1;
		while(cc = s.charCodeAt(i), !(cc >= 0x0915 && cc <= 0x0939) && i > 0) i--;
		return s.substr(0, i + 1) + c + s.substr(i + 1);
	},
	convertTextSegment:function(segment) {
		segment.text = this.convertText(segment.text);
	},
	convertText:function(text) {
		var v = this.vowelMap;
		var f = this.fullFormMap
		var h = this.halfFormMap
		var m = this.signMap;
		var li = this.vowelLigatureMap;
		var lines = text.split('\r\n');
		var res = '';
		for(var i = 0, lc = lines.length; i < lc; i++) {
			var words = lines[i].split(' ');
			var i_sign =  false;
			for(var j = 0, wc = words.length; j < wc; j++) {
				var w1 = words[j];
				var w2 = '';
				for(var k = 0; k < w1.length; k++) {
					var c = w1.charCodeAt(k);
					var x;
					if(x = f[c]) {
						w2 += x;
						if(i_sign) {
							w2 += '\u093f';
							i_sign = false;
						}
					}
					else if(x = v[c]) {
						w2 += x;
					}
					else if(x = h[c]) {
						w2 += x + '\u094D';
					}
					else if(x = m[c]) {
						if(x.charCodeAt(0) == 0x094d) {
							w2 = this.insertAfterConsonants(w2, x);
						}
						else {
							w2 += x;
						}
					}
					else if(c == 0x0069) {
						i_sign = true;
					}
					else if(c == 0x0025 || c == 0x0052) {
						w2 = this.insertBeforeConsonants(w2, '\u0930\u094d');
					}
					else {
						w2 += String.fromCharCode(c);
					}
				}
				res += w2 + ' ';
			}
			res += '\r\n';
		}
		for(combo in li) {
			res = res.replace(new RegExp(combo, 'g'), li[combo]);
		}
		res = res.replace(new RegExp('\u0902([\u093e-\u094c])', 'g'), '$1\u0902');
		res = res.replace(new RegExp('([\u093e\u0949-\u094c])([\u0941-\u0948])', 'g'), '$2$1');
		res = res.replace(new RegExp(' ([\u0941-\u0948])', 'g'), '$1 ');
		res = res.replace(new RegExp('\u0902\u0902', 'g'), '\u0902');
		res = res.replace(new RegExp('\u0947\u0947', 'g'), '\u0947');
		return res;
	},
	vowelMap:{
		0x26:'\u0941',
		0x2a:'\u0942',
		0x45:'\u0948',
		0x46:'\u0944',
		0x49:'\u0940',
		0x4f:'\u094C',
		0x55:'\u0942',
		0x56:'\u0944',
		0x57:'\u0948',
		0x5a:'\u0943',
		0x5e:'\u0907',
		0x61:'\u093e',
		0x65:'\u0947',
		0x66:'\u0943',
		0x6f:'\u094b',
		0x75:'\u0941',
		0x77:'\u0947',
		0xa8:'\u0909',
		0xb4:'\u090f',
		0xc8:'\u0908',
		0xcb:'\u090a',
		0xcf:'\u090b',
		0xe5:'\u0905',
		0x2264:'\u0910'
	},
	fullFormMap:{
		0x40:'\u095C',
		0x42:'\u092d',
		0x43:'\u091b',
		0x44:'\u0927',
		0x47:'\u0918',
		0x4a:'\u091d',
		0x4b:'\u0916',
		0x4c:'\u0933',
		0x4e:'\u0923',
		0x50:'\u092b',
		0x51:'\u0920',
		0x54:'\u0925',
		0x58:'\u091e',
		0x5c:'\u0921',
		0x62:'\u092c',
		0x63:'\u091a',
		0x64:'\u0926',
		0x67:'\u0917',
		0x68:'\u0939',
		0x6a:'\u091c',
		0x6b:'\u0915',
		0x6c:'\u0932',
		0x6d:'\u092e',
		0x6e:'\u0928',
		0x70:'\u092a',
		0x71:'\u091f',
		0x72:'\u0930',
		0x73:'\u0938',
		0x74:'\u0924',
		0x76:'\u0935',
		0x78:'\u0936',
		0x79:'\u092f',
		0x59:'\u092f',
		0x7a:'\u0937',
		0x7c:'\u0922',
		0xd1:'\u095e',
		0xd2:'\u095d',
		0xf1:'\u0958',
		0xf2:'\u0959',
		0xf3:'\u095a',
		0xf4:'\u095b',
		0x0101:'\u0958',
		0x0102:'\u0959',
		0x0103:'\u095a',
		0x0104:'\u095b',
		0x0105:'\u095e',
		0x0106:'\u095c',
		0x0107:'\u095d',
		0xffff:'\u0919',
		0x3c:'\u0930\u0941',
		0x3e:'\u0930\u0942',
		0x48:'\u0939\u090b',
		0x7b:'\u0926\u0943',
		0x7d:'\u0926\u0944',
		0xa1:'\u0915\u094d\u0930',
		0xa4:'\u0919\u094d\u0916',
		0xb0:'\u0939\u094d\u092e',
		0xb1:'\u0939\u094d\u0935',
		0xbb:'\u0926\u094d\u0935',
		0xc0:'\u091e\u094d\u0935',
		0xc1:'\u0926\u094d\u0927',
		0xc3:'\u0915\u094d\u0924',
		0xc4:'\u0917\u094d\u0930',
		0xc6:'\u0926\u094d\u092d',
		0xc7:'\u0936\u094d\u0930',
		0xcd:'\u0938\u094d\u0930',
		0xd5:'\u0937\u094d\u0920',
		0xd6:'\u0918\u094d\u0930',
		0xd8:'\u0922\u094d\u092e',
		0xdb:'\u091f\u094d\u0920',
		0xdc:'\u091b\u094d\u0930',
		0xe0:'\u091f\u094d\u0930',
		0xe1:'\u091c\u094d\u0930',
		0xe2:'\u0921\u094d\u0930',
		0xe3:'\u0928\u094d\u0930',
		0xe4:'\u0927\u094d\u0930',
		0xe8:'\u092b\u094d\u0930',
		0xe9:'\u092a\u094d\u0930',
		0xea:'\u092c\u094d\u0930',
		0xeb:'\u092d\u094d\u0930',
		0xec:'\u0935\u094d\u0930',
		0xed:'\u092e\u094d\u0930',
		0xf5:'\u092a\u094d\u0924',
		0xf6:'\u0936\u094d\u0935',
		0xf9:'\u0936\u094d\u091a',
		0xfa:'\u0936\u094d\u0928',
		0xfb:'\u092a\u094d\u0928',
		0xfc:'\u091e\u094d\u091c',
		0xff:'\u0937\u094d\u091f',
		0x0152:'\u0926\u094d\u0917',
		0x0153:'\u0915\u094d\u0937',
		0x02d9:'\u091c\u094d\u091e',
		0x02db:'\u0928\u094d\u0928',
		0x2013:'\u0924\u094d\u0924',
		0x2014:'\u0939\u094d\u0932',
		0x2019:'\u0926\u094d\u0930',
		0x201a:'\u0939\u094d\u0930',
		0x201c:'\u0924\u094d\u0930',
		0x201d:'\u0926\u094d\u092f',
		0x201e:'\u0926\u094d\u0927',
		0x2021:'\u0939\u094d\u0928',
		0x2030:'\u0926\u094d\u0926',
		0x2039:'\u0919\u094d\u0917',
		0x203a:'\u0919\u094d\u0918',
		0x2044:'\u0919\u094d\u0915',
		0xb7:'\u0939\u094d\u092f',
		0x2219:'\u0939\u094d\u092f',
		0xf001:'\u091f\u094d\u091f',
		0xf002:'\u0939\u094d\u0923'
	},
	halfFormMap:{
		0x7e:'\u0928',
		0xa3:'\u091e',
		0xa5:'\u092f',
		0xa9:'\u0917',
		0xac:'\u0932',
		0xaf:'\u095e',
		0xb8:'\u0921',
		0xbe:'\u095b',
		0xc9:'\u0939',
		0xca:'\u0925',
		0xcc:'\u0918',
		0xce:'\u0927',
		0xd0:'\u0916',
		0xd3:'\u091c\u094d\u091e',
		0xd4:'\u091d',
		0xd9:'\u091e',
		0xdf:'\u0938',
		0xe7:'\u091a',
		0xee:'\u091b',
		0xef:'\u0926',
		0xf0:'\u0958',
		0x0131:'\u092d',
		0x0178:'\u0919',
		0x02c6:'\u0923',
		0x02da:'\u0915',
		0x02dd:'\u091f',
		0x0394:'\u091c',
		0x2206:'\u091c',
		0x03bc:'\u092e',
		0x03C0:'\u092a',
		0x03A9:'\u0937',
		0x2126:'\u0937',
		0xB5:'\u092E',
		0x03BC:'\u092E',
		0x2018:'\u0924\u094d\u0930',
		0x2020:'\u0924',
		0x220F:'\u092B',
		0x221A:'\u0935',
		0x222B:'\u092C',
		0x2248:'\u0936',
		0x22F2:'\u0936',
		0x2211:'\u0915\u094d\u0937',
		0x2260:'\u0924\u094d\u0924',
		0x25ca:'\u0936\u094d\u0930',
		0xF000:'\u0916'
	},
	signMap:{
		0x23:'\u0902',
		0x41:'\u0901',
		0x4d:'\u0902',
		0x5f:'\u0952',
		0x60:'\u094d',
		0xab:'\u0951',
		0xae:'\u094d\u0930',
		0xba:'\u0970',
		0xbf:'\u093c',
		0xc2:'\u094d\u0930',
		0xc5:'\u0901',
		0x017e:'\u094d',
		0x02dc:'\u0902',
		0x2202:'\u094d\u0930',
		0x2265:'\u0964'
	},
	vowelLigatureMap:{
		'\u0905\u093e':'\u0906',
		'\u0905\u094b':'\u0913',
		'\u0905\u094C':'\u0914',
		'\u090f\u0947':'\u0910',
		'\u090f\u0901':'\u090d',
		'\u0906\u0901':'\u0911',
		'\u0906\u0947':'\u0913',
		'\u0906\u0948':'\u0914',
		'\u00b6':'\u201d',
		'\u2022':'\u201c',
		'\u00aa':'\u2018',
		'\u00a7':'\u2019',
		'\u00ab':'\u0027',
		'\u02d8':'\u203a',
		'\u02c9':'\u2039'
	}
}
} );