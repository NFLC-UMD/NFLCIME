/**
 * @docauthor Steve Drucker <sdrucker@figleaf.com.com>
 *
 * @class rt.scrube
 *
 * Scrubs text that is pasted into a rich-text editor
 */


NFLCIME.dispatchEvent( { type:'ModuleAdd', module:
{
	id:'rt.scrube',
	type:'util',
	dependency:['rt'],
	
	/**
	 * Adds an event listener for the "RichTextPaste" event
	 * 
	 *
	 * @param {Object} [evt] Event details
	 */
	onModuleActivate:function(evt) {
		var module = evt.module;
		if(module == this && !this.active) {
			this.active = true;
			NFLCIME.addEventListener('RichTextPaste', this);
		}
	},
	
	/**
	 * Removes the event listener for the "RichTextPaste" event
	 * 
	 *
	 * @param {Object} [evt] Event details
	 */
	onModuleDeactivate:function(evt) {
		var module = evt.module;
		if(module == this && this.active) {
			NFLCIME.removeEventListener('RichTextPaste', this);
		}
	},

	/**
	 * Converts text using symbolic font to unicode
	 * Removes font and font sizes & sets the target language
	 *
	 * @param {Object} [evt] Event details
	 */

	onRichTextPaste:function(evt) {
		var segments = evt.textSegments;
		for(var i = 0; i < segments.length; i++) {
			var seg = segments[i];
		
			// converting text using symbolic font to Unicode
			if(/(^|,)wingdings($|,)/i.test(seg.style.fontFamily)) {
				seg.text = this.convertSymbols(seg.text, this.wingdingTable);
			} else if(/(^|,)wingdings 2($|,)/i.test(seg.style.fontFamily)) {
				seg.text = this.convertSymbols(seg.text, this.wingding2Table);
			} else if(/(^|,)symbol($|,)/i.test(seg.style.fontFamily)) {
				seg.text = this.convertSymbols(seg.text, this.symbolTable);
			}

			// remove font and font size 
			seg.style.fontFamily = undefined;
			seg.style.fontSize = undefined;

			// ask the lang module to detect the language
			var evt = { type:'LanguageDetect', textSegment:seg, languageTag:'', code2:'', code3:'', script:'' };
			NFLCIME.dispatchEvent(evt);
			var lang = evt.languageTag || evt.code3 || evt.code2;
			var script = evt.script;
			var dir = evt.direction;
			if(lang) {
				// use the direction
				seg.style.direction = dir;
				
				// clear the lang attribute since we're assuming the language will be the target language
				seg.lang = '';				
			} else {
				// English
				seg.style.direction = 'ltr';
				seg.lang = 'eng';
			}
		}
	},
	convertSymbols:function(s, table) {
		var r = '';
		for(var i = 0; i < s.length; i++) {
			var c1 = s.charAt(i);
			var c2 = table[c1];
			if(!c2) {
				if(c1 == ' ') {
					c2 = ' ';
				} else {
					c2 = '?';
				}
			}
			r += c2;
		}
		return r;
	},
	initialize:function(env) {
		this.browser = env.browser;
		this.closures = {};
		NFLCIME.addEventListener('ModuleActivate', this);
		NFLCIME.addEventListener('ModuleDeactivate', this);
	},
	//--- Private variables
	active:false,
	wingdingTable:{
	'\u0021':'\u270F',
	'\u0022':'\u2702',
	'\u0023':'\u2701',
	'\u0028':'\u260E',
	'\u0029':'\u2706',
	'\u002A':'\u2709',
	'\u0036':'\u231B',
	'\u0037':'\u2328',
	'\u003E':'\u2707',
	'\u003F':'\u270D',
	'\u0041':'\u270C',
	'\u0045':'\u261C',
	'\u0046':'\u261E',
	'\u0047':'\u261D',
	'\u0048':'\u261F',
	'\u004A':'\u263A',
	'\u004C':'\u2639',
	'\u004E':'\u2620',
	'\u004F':'\u2690',
	'\u0051':'\u2708',
	'\u0052':'\u263C',
	'\u0054':'\u2744',
	'\u0056':'\u271E',
	'\u0058':'\u2720',
	'\u0059':'\u2721',
	'\u005A':'\u262A',
	'\u005B':'\u262F',
	'\u005C':'\u0950',
	'\u005D':'\u2638',
	'\u005E':'\u2648',
	'\u005F':'\u2649',
	'\u0060':'\u264A',
	'\u0061':'\u264B',
	'\u0062':'\u264C',
	'\u0063':'\u264D',
	'\u0064':'\u264E',
	'\u0065':'\u264F',
	'\u0066':'\u2650',
	'\u0067':'\u2651',
	'\u0068':'\u2652',
	'\u0069':'\u2653',
	'\u006A':'\u0026',
	'\u006B':'\u0026',
	'\u006C':'\u25CF',
	'\u006D':'\u274D',
	'\u006E':'\u25A0',
	'\u006F':'\u25A1',
	'\u0071':'\u2751',
	'\u0072':'\u2752',
	'\u0073':'\u2B27',
	'\u0074':'\u29EB',
	'\u0075':'\u25C6',
	'\u0076':'\u2756',
	'\u0077':'\u2B25',
	'\u0078':'\u2327',
	'\u0079':'\u2353',
	'\u007A':'\u2318',
	'\u007B':'\u2740',
	'\u007C':'\u273F',
	'\u007D':'\u275D',
	'\u007E':'\u275E',
	'\u007F':'\u25AF',
	'\u0080':'\u24EA',
	'\u0081':'\u2460',
	'\u0082':'\u2461',
	'\u0083':'\u2462',
	'\u0084':'\u2463',
	'\u0085':'\u2464',
	'\u0086':'\u2465',
	'\u0087':'\u2466',
	'\u0088':'\u2467',
	'\u0089':'\u2468',
	'\u008A':'\u2469',
	'\u008B':'\u24FF',
	'\u008C':'\u2776',
	'\u008D':'\u2777',
	'\u008E':'\u2778',
	'\u008F':'\u2779',
	'\u0090':'\u277A',
	'\u0091':'\u277B',
	'\u0092':'\u277C',
	'\u0093':'\u277D',
	'\u0094':'\u277E',
	'\u0095':'\u277F',
	'\u009E':'\u00B7',
	'\u009F':'\u2022',
	'\u00A0':'\u25AA',
	'\u00A1':'\u25CB',
	'\u00A4':'\u25C9',
	'\u00A5':'\u25CE',
	'\u00A7':'\u25AA',
	'\u00A8':'\u25FB',
	'\u00AA':'\u2726',
	'\u00AB':'\u2605',
	'\u00AC':'\u2736',
	'\u00AD':'\u2734',
	'\u00AE':'\u2739',
	'\u00AF':'\u2735',
	'\u00B1':'\u2316',
	'\u00B2':'\u27E1',
	'\u00B3':'\u2311',
	'\u00B5':'\u272A',
	'\u00B6':'\u2730',
	'\u00D5':'\u232B',
	'\u00D6':'\u2326',
	'\u00D8':'\u27A2',
	'\u00DC':'\u27B2',
	'\u00E8':'\u2794',
	'\u00EF':'\u21E6',
	'\u00F0':'\u21E8',
	'\u00F1':'\u21E7',
	'\u00F2':'\u21E9',
	'\u00F3':'\u2B04',
	'\u00F4':'\u21F3',
	'\u00F5':'\u2B00',
	'\u00F6':'\u2B01',
	'\u00F7':'\u2B03',
	'\u00F8':'\u2B02',
	'\u00F9':'\u25AD',
	'\u00FA':'\u25AB',
	'\u00FB':'\u2717',
	'\u00FC':'\u2713',
	'\u00FD':'\u2612',
	'\u00FE':'\u2611'
	},
	wingding2Table:{
	'\u0025':'\u2704',
	'\u0027':'\u260F',
	'\u003E':'\u261C',
	'\u003F':'\u261E',
	'\u0040':'\u261A',
	'\u0041':'\u261B',
	'\u0046':'\u261D',
	'\u0047':'\u261F',
	'\u004F':'\u2717',
	'\u0050':'\u2713',
	'\u0052':'\u2611',
	'\u0053':'\u2612',
	'\u0054':'\u2612',
	'\u0055':'\u2314',
	'\u0056':'\u2314',
	'\u0057':'\u29B8',
	'\u0058':'\u29B8',
	'\u0059':'\u0026',
	'\u005A':'\u0026',
	'\u005B':'\u0026',
	'\u005C':'\u0026',
	'\u005D':'\u203D',
	'\u005E':'\u203D',
	'\u005F':'\u203D',
	'\u0060':'\u203D',
	'\u0069':'\u24EA',
	'\u006A':'\u2460',
	'\u006B':'\u2461',
	'\u006C':'\u2462',
	'\u006D':'\u2463',
	'\u006E':'\u2464',
	'\u006F':'\u2465',
	'\u0070':'\u2466',
	'\u0071':'\u2467',
	'\u0072':'\u2468',
	'\u0073':'\u2469',
	'\u0074':'\u24FF',
	'\u0075':'\u2776',
	'\u0076':'\u2777',
	'\u0077':'\u2778',
	'\u0078':'\u2779',
	'\u0079':'\u277A',
	'\u007A':'\u277B',
	'\u007B':'\u277C',
	'\u007C':'\u277D',
	'\u007D':'\u277E',
	'\u007E':'\u277F',
	'\u0080':'\u2609',
	'\u0081':'\u25EF',
	'\u0082':'\u263D',
	'\u0083':'\u263E',
	'\u0085':'\u271D',
	'\u0086':'\u271D',
	'\u0095':'\u2022',
	'\u0096':'\u26AB',
	'\u0097':'\u25CF',
	'\u0098':'\u2B24',
	'\u0099':'\u25CB',
	'\u009E':'\u29BF',
	'\u009F':'\u25A0',
	'\u00A0':'\u25FE',
	'\u00A1':'\u25FC',
	'\u00A2':'\u2B1B',
	'\u00A3':'\u2B1C',
	'\u00AC':'\u2B29',
	'\u00AD':'\u2B25',
	'\u00AE':'\u25C6',
	'\u00AF':'\u25C7',
	'\u00B2':'\u25C8',
	'\u00B5':'\u2B2A',
	'\u00B6':'\u2B27',
	'\u00B7':'\u29EB',
	'\u00B8':'\u25CA',
	'\u00BA':'\u25D6',
	'\u00BB':'\u25D7',
	'\u00BE':'\u25FC',
	'\u00BF':'\u2B25',
	'\u00C0':'\u2B1F',
	'\u00C2':'\u2B23',
	'\u00C3':'\u2B22',
	'\u00C6':'\u002B',
	'\u00C7':'\u002B',
	'\u00CC':'\u271A',
	'\u00CD':'\u2613',
	'\u00D0':'\u2715',
	'\u00D3':'\u2716',
	'\u00DE':'\u2731',
	'\u00E8':'\u2726',
	'\u00EA':'\u2605',
	'\u00EB':'\u2736',
	'\u00ED':'\u2737',
	'\u00F0':'\u2739',
	'\u00F3':'\u272F',
	'\u00F8':'\u203B',
	'\u00F9':'\u2042'
	},
	symbolTable:{
	'\u0022':'\u2200', 
	'\u0024':'\u2203', 
	'\u0027':'\u220d', 
	'\u002a':'\u2217', 
	'\u002d':'\u2212', 
	'\u0040':'\u2245', 
	'\u005c':'\u2234', 
	'\u005e':'\u22a5', 
	'\u007e':'\u223c', 
	'\u00a1':'\u03d2', 
	'\u00a2':'\u2032', 
	'\u00a3':'\u2264', 
	'\u00a4':'\u2044', 
	'\u00a5':'\u221e', 
	'\u00a6':'\u0192', 
	'\u00a7':'\u2663', 
	'\u00a8':'\u2666', 
	'\u00a9':'\u2665', 
	'\u00aa':'\u2660', 
	'\u00ab':'\u2194', 
	'\u00ac':'\u2190', 
	'\u00ad':'\u2191', 
	'\u00ae':'\u2192', 
	'\u00af':'\u2193', 
	'\u00b2':'\u2033', 
	'\u00b3':'\u2265', 
	'\u00b4':'\u00d7', 
	'\u00b5':'\u221d', 
	'\u00b6':'\u2202', 
	'\u00b7':'\u2219', 
	'\u00b8':'\u00f7', 
	'\u00b9':'\u2260', 
	'\u00ba':'\u2261', 
	'\u00bb':'\u2248', 
	'\u00bc':'\u2026', 
	'\u00bd':'\u23d0', 
	'\u00be':'\u23af', 
	'\u00bf':'\u21b5', 
	'\u00c0':'\u2135', 
	'\u00c1':'\u2111', 
	'\u00c2':'\u211c', 
	'\u00c3':'\u2118', 
	'\u00c4':'\u2297', 
	'\u00c5':'\u2295', 
	'\u00c6':'\u2205', 
	'\u00c7':'\u2229', 
	'\u00c8':'\u222a', 
	'\u00c9':'\u2283', 
	'\u00ca':'\u2287', 
	'\u00cb':'\u2284', 
	'\u00cc':'\u2282', 
	'\u00cd':'\u2286', 
	'\u00ce':'\u2208', 
	'\u00cf':'\u2209', 
	'\u00d0':'\u2220', 
	'\u00d1':'\u2207', 
	'\u00d2':'\u00ae', 
	'\u00d3':'\u00a9', 
	'\u00d4':'\u2122', 
	'\u00d5':'\u220f', 
	'\u00d6':'\u221a', 
	'\u00d7':'\u22c5', 
	'\u00d8':'\u00ac', 
	'\u00d9':'\u2227', 
	'\u00da':'\u2228', 
	'\u00db':'\u21d4', 
	'\u00dc':'\u21d0', 
	'\u00dd':'\u21d1', 
	'\u00de':'\u21d2', 
	'\u00df':'\u21d3', 
	'\u00e0':'\u25ca', 
	'\u00e1':'\u2329', 
	'\u00e2':'\u00ae', 
	'\u00e3':'\u00a9', 
	'\u00e4':'\u2122', 
	'\u00e5':'\u2211', 
	'\u00e6':'\u239b', 
	'\u00e7':'\u239c', 
	'\u00e8':'\u239d', 
	'\u00e9':'\u23a1', 
	'\u00ea':'\u23a2', 
	'\u00eb':'\u23a3', 
	'\u00ec':'\u23a7', 
	'\u00ed':'\u23a8', 
	'\u00ee':'\u23a9', 
	'\u00ef':'\u23aa', 
	'\u00f0':'\u20ac', 
	'\u00f1':'\u232a', 
	'\u00f2':'\u222b', 
	'\u00f3':'\u2320', 
	'\u00f4':'\u23ae', 
	'\u00f5':'\u2321', 
	'\u00f6':'\u239e', 
	'\u00f7':'\u239f', 
	'\u00f8':'\u23a0', 
	'\u00f9':'\u23a4', 
	'\u00fa':'\u23a5', 
	'\u00fb':'\u23a6', 
	'\u00fc':'\u23ab', 
	'\u00fd':'\u23ac', 
	'\u00fe':'\u23ad', 
	'A':'\u0391',
	'a':'\u03b1',
	'B':'\u0392',
	'b':'\u03b2',
	'C':'\u03a7',
	'c':'\u03c7',
	'D':'\u0394',
	'd':'\u03b4',
	'E':'\u0395',
	'e':'\u03b5',
	'F':'\u03a6',
	'f':'\u03c6',
	'G':'\u0393',
	'g':'\u03b3',
	'H':'\u0397',
	'h':'\u03b7',
	'I':'\u0399',
	'i':'\u03b9',
	'J':'\u03d1',
	'j':'\u03d5',
	'K':'\u039a',
	'k':'\u03ba',
	'L':'\u039b',
	'l':'\u03bb',
	'M':'\u039c',
	'm':'\u03bc',
	'N':'\u039d',
	'n':'\u03bd',
	'O':'\u039f',
	'o':'\u03bf',
	'P':'\u03a0',
	'p':'\u03c0',
	'Q':'\u0398',
	'q':'\u03b8',
	'R':'\u03a1',
	'r':'\u03c1',
	'S':'\u03a3',
	's':'\u03c3',
	'T':'\u03a4',
	't':'\u03c4',
	'U':'\u03a5',
	'u':'\u03c5',
	'V':'\u03c2',
	'v':'\u03d6',
	'W':'\u03a9',
	'w':'\u03c9',
	'X':'\u039e',
	'x':'\u03be',
	'Y':'\u03a8',
	'y':'\u03c8',
	'Z':'\u0396',
	'z':'\u03b6'
	}
}
} );