/**
 * Bloom Language Keyboard Plugin
 *
 * Modified for TinyMCE 4 compatibility on 04/04/2014 By Steve Drucker
 * sdrucker@figleaf.com
 *
 */

tinymce.PluginManager.add('bloom', function(ed, url) {


	var bloom_plugin = this, //
		bloom_init_params = ed.getParam('bloom'), //
		css_loc = bloom_init_params.css, //
		init_modules = bloom_init_params.Modules;

	// console.log('tinymce.PluginManager.add', ed, url, bloom_init_params);
	/*
	if (bloom_init_params.defaultLanguage) {
		this.defaultLanguage=bloom_init_params.defaultLanguage;
	}
	*/

	bloom_plugin.supportedLanguages = [
		{	
			id: 'telegu',
			twoLetterISO: 'tel',
			threeLetterISO: 'tel',
			characterSet: 'a-zA-Z',
			script: 'latin',
			direction: 'ltr',
			kbd: false
		},
		{	
			id: 'serbocroatian',
			twoLetterISO: 'hbs',
			threeLetterISO: 'hbs',
			characterSet: 'a-zA-Z',
			script: 'latin',
			direction: 'ltr',
			kbd: false
		},
		{	
			id: 'afrikaans',
			twoLetterISO: 'afr',
			threeLetterISO: 'afr',
			characterSet: 'a-zA-Z',
			script: 'latin',
			direction: 'ltr',
			kbd: false
		},
		{	
			id: 'tajik',
			twoLetterISO: 'tjk',
			threeLetterISO: 'tjk',
			characterSet: 'a-zA-Z',
			script: 'latin',
			direction: 'ltr',
			kbd: false
		},
		{	
			id: 'tongan',
			twoLetterISO: 'ton',
			threeLetterISO: 'ton',
			characterSet: 'a-zA-Z',
			script: 'latin',
			direction: 'ltr',
			kbd: false
		},
		{	
			id: 'AmericanSignLanguage',
			twoLetterISO: 'ase',
			threeLetterISO: 'ase',
			characterSet: 'a-zA-Z',
			script: 'latin',
			direction: 'ltr',
			kbd: false
		},
		{	
			id: 'Uighur',
			twoLetterISO: 'uig',
			threeLetterISO: 'uig',
			characterSet: 'a-zA-Z',
			script: 'latin',
			direction: 'ltr',
			kbd: false
		},
		{
			id: 'tausug',
			twoLetterISO: 'tsg',
			threeLetterISO: 'tsg',
			characterSet: 'a-zA-Z',
			script: 'latin',
			direction: 'ltr',
			kbd: false
		},
		{
			id: 'somali',
			twoLetterISO: 'som',
			threeLetterISO: 'som',
			characterSet: 'a-zA-Z',
			script: 'latin',
			direction: 'ltr',
			kbd: false
		},
		{
			id: 'shona',
			twoLetterISO: 'sna',
			threeLetterISO: 'sna',
			characterSet: 'a-zA-Z',
			script: 'latin',
			direction: 'ltr',
			kbd: false
		},
		{
			id: 'malay',
			twoLetterISO: 'may',
			threeLetterISO: 'may',
			characterSet: 'a-zA-Z',
			script: 'latin',
			direction: 'ltr',
			kbd: false
		},
		{
			id: 'kurdish-kurmanji',
			twoLetterISO: 'kmz',
			threeLetterISO: 'kmz',
			characterSet: 'a-zA-Z',
			script: 'latin',
			direction: 'ltr',
			kbd: false
		},
		{
			id: 'Kikuyu',
			twoLetterISO: 'kik',
			threeLetterISO: 'kik',
			characterSet: 'a-zA-Z',
			script: 'latin',
			direction: 'ltr',
			kbd: false
		},
		{
			id: 'kirundi',
			twoLetterISO: 'run',
			threeLetterISO: 'run',
			characterSet: 'a-zA-Z',
			script: 'latin',
			direction: 'ltr',
			kbd: false
		},
		{
			id: 'kinyarwanda',
			twoLetterISO: 'kin',
			threeLetterISO: 'kin',
			characterSet: 'a-zA-Z',
			script: 'latin',
			direction: 'ltr',
			kbd: false
		},
		{
			id: 'indonesian',
			twoLetterISO: 'ind',
			threeLetterISO: 'ind',
			characterSet: 'a-zA-Z',
			script: 'latin',
			direction: 'ltr',
			kbd: false
		},
		{
			id: 'bosnian',
			twoLetterISO: 'bos',
			threeLetterISO: 'bos',
			characterSet: 'a-zA-Z',
			script: 'latin',
			direction: 'ltr',
			kbd: false
		},
		{
			id: 'fijian',
			twoLetterISO: 'fij',
			threeLetterISO: 'fij',
			characterSet: 'a-zA-Z',
			script: 'latin',
			direction: 'ltr',
			kbd: false
		},
		{
			id: 'cebuano',
			twoLetterISO: 'ceb',
			threeLetterISO: 'ceb',
			characterSet: 'a-zA-Z',
			script: 'latin',
			direction: 'ltr',
			kbd: false
		},
		{
			id: 'chavacano',
			twoLetterISO: 'cbk',
			threeLetterISO: 'cbk',
			characterSet: 'a-zA-Z',
			script: 'latin',
			direction: 'ltr',
			kbd: false
		},
		{
			id: 'tamil',
			twoLetterISO: 'ta',
			threeLetterISO: 'tam',
			characterSet: 'a-zA-Z',
			script: 'latin',
			direction: 'ltr',
			kbd: false

		},
		{
			id: 'english',
			twoLetterISO: 'en',
			threeLetterISO: 'eng',
			characterSet: 'a-zA-Z',
			script: 'latin',
			direction: 'ltr',
			kbd: false

		}, {
			id: 'albanian',
			twoLetterISO: 'sq',
			threeLetterISO: 'sqi',
			characterSet: 'a-zA-Z\u00eb\u0040\u00cb\u00c7',
			script: 'latin',
			direction: 'ltr'
		}, {
			id: 'amharic',
			twoLetterISO: 'am',
			threeLetterISO: 'amh',
			characterSet: '\u1200-\u137f',
			script: 'geez',
			direction: 'ltr',
			weight: 2
		}, {
			id: 'arabic',
			twoLetterISO: 'ar',
			threeLetterISO: 'arb',
			characterSet: '\u0600-\u063a',
			script: 'arabic',
			direction: 'rtl',
			weight: 10,
			variants: ['aao', 'abh', 'abv', 'acq', 'acw', 'acx', 'acy',
				'adf', 'aeb', 'aec', 'ajp',
				'arq', 'ars', 'auz', 'avl', 'ayh',
				'ayn', 'ayp', 'bbz', 'pga', 'shu', 'ssh', 'apz', 'ara'
			]
		},

		{
			id: 'arabic-Levantine',
			twoLetterISO: 'ar',
			threeLetterISO: 'apc',
			characterSet: '\u0600-\u063a',
			script: 'arabic',
			direction: 'rtl',
			weight: 10,
		},

		{
			id: 'arabic-Gulf',
			twoLetterISO: 'ar',
			threeLetterISO: 'afb',
			characterSet: '\u0600-\u063a',
			script: 'arabic',
			direction: 'rtl',
			weight: 10,
		},

		{
			id: 'arabic-Sudanese',
			twoLetterISO: 'ar',
			threeLetterISO: 'apd',
			characterSet: '\u0600-\u063a',
			script: 'arabic',
			direction: 'rtl',
			weight: 10,
		},

		{
			id: 'arabic-Modern Standard',
			twoLetterISO: 'ar',
			threeLetterISO: 'arb',
			characterSet: '\u0600-\u063a',
			script: 'arabic',
			direction: 'rtl',
			weight: 10,
		},

		{
			id: 'arabic-Moroccan',
			twoLetterISO: 'ar',
			threeLetterISO: 'apy',
			characterSet: '\u0600-\u063a',
			script: 'arabic',
			direction: 'rtl',
			weight: 10,
			variants: ['ary']
		},

		/*
		{
			id: 'arabic-Egyptian',
			twoLetterISO: 'ar',
			threeLetterISO: 'apz',
			characterSet: '\u0600-\u063a',
			script: 'arabic',
			direction: 'rtl',
			weight: 10,
		},
		*/

		{
			id: 'arabic-Egyptian',
			twoLetterISO: 'ar',
			threeLetterISO: 'arz',
			characterSet: '\u0600-\u063a',
			script: 'arabic',
			direction: 'rtl',
			weight: 10,
		},


		{
			id: 'arabic-Libyan',
			twoLetterISO: 'ar',
			threeLetterISO: 'ayl',
			characterSet: '\u0600-\u063a',
			script: 'arabic',
			direction: 'rtl',
			weight: 10,
		},

		{
			id: 'azeri',
			twoLetterISO: 'az',
			threeLetterISO: 'aze',
			characterSet: '\u0400-\u044f\u04b9\u04d9\u0493\u04e9\u04b8\u04d8\u0492\u04e8',
			script: 'cyrillic',
			direction: 'ltr'
		}, {
			id: 'bambara',
			twoLetterISO: 'bm',
			threeLetterISO: 'bam',
			characterSet: 'a-zA-Z\u00e7\u00e9\u025b\u0254\u00e0\u00e8\u0272\u014b\u00f9\u019d\u014a\u0190\u0186',
			script: 'latin',
			direction: 'ltr'
		}, {
			id: 'balochi',
			twoLetterISO: undefined,
			threeLetterISO: 'bal',
			characterSet: '\u0600-\u063a\u0672\u06f0-\u06f9',
			script: 'arabic',
			direction: 'rtl',
			variants: ['bgp', 'bcc', 'bgn']
		}, {
			id: 'belarussian',
			twoLetterISO: 'be',
			threeLetterISO: 'bel',
			characterSet: '\u0400-\u044f\u0406\u0456\u045e',
			script: 'cyrillic',
			direction: 'ltr'
		}, {
			id: 'bengali',
			twoLetterISO: 'bn',
			threeLetterISO: 'ben',
			characterSet: '\u0980-\u09ff',
			script: 'bengali',
			direction: 'ltr'
		}, {
			id: 'brahui',
			threeLetterISO: 'brh',
			characterSet: '\u0600-\u063a\u0698\u06a9\u06af\u0679\u067e\u0686\u0688\u0691\u06cc\u06d2\u06d3\u06ba\u06be\u06c0\u06c1\u06c2\u06c3\u06f0-\u06f9',
			script: 'arabic',
			direction: 'rtl'
		}, {
			id: 'bulgarian',
			twoLetterISO: 'bg',
			threeLetterISO: 'bul',
			characterSet: '\u0400-\u044f',
			script: 'cyrillic',
			direction: 'ltr'
		}, {
			id: 'burmese',
			twoLetterISO: 'my',
			threeLetterISO: 'mya',
			characterSet: '\u1000-\u109f',
			script: 'burmese',
			direction: 'ltr'
		}, {
			id: 'chechen',
			twoLetterISO: 'ce',
			threeLetterISO: 'che',
			characterSet: '\u0400-\u044fI',
			script: 'cyrillic',
			direction: 'ltr'
		}, {
			id: 'chinese',
			twoLetterISO: 'zh',
			threeLetterISO: 'zho',
			characterSet: '\u3200-\u9fff\uf900-\ufaff',
			script: 'hanji',
			direction: 'ltr',
			weight: 9,
			variants: ['cdo', 'cjy', 'cmn', 'cpx', 'czh', 'czo', 'gan',
				'hak', 'hsn', 'mnp', 'nan', 'wuu', 'yue'
			]
		}, {
			id: 'croatian',
			twoLetterISO: 'hr',
			threeLetterISO: 'hrv',
			characterSet: 'a-zA-Z\u0161\u0111\u017e\u010d\u0107\u0160\u0110\u017d\u010c\u0106',
			script: 'latin',
			direction: 'ltr'
		}, {
			id: 'czech',
			twoLetterISO: 'cs',
			threeLetterISO: 'ces',
			characterSet: 'a-zA-Z\u011b\u0161\u010d\u0159\u017e\u00fd\u00e1\u00ed\u00e9\u00fa\u016f',
			script: 'latin',
			direction: 'ltr'
		}, {
			id: 'danish',
			twoLetterISO: 'da',
			threeLetterISO: 'dan',
			characterSet: 'a-zA-Z\u00e5\u00e6\u00f8\u00c5\u00c6\u00d8',
			script: 'latin',
			direction: 'ltr'
		}, {
			id: 'dari',
			twoLetterISO: undefined,
			threeLetterISO: 'prs',
			characterSet: '\u0600-\u063a\u0698\u06a9\u06af\u067e\u0686\u06cc\u06f0-\u06f9',
			script: 'arabic',
			direction: 'rtl'
		}, {
			id: 'dinka',
			twoLetterISO: undefined,
			threeLetterISO: 'din',
			characterSet: 'a-zA-Z\u014b\u00eb\u00ef\u00f6\u00e4\u025b\u0308\u0263\u0254\u0063\u014a\u00cb\u00cf\u00d6\u00c4\u0190\u0194\u0186\u0043',
			script: 'latin',
			direction: 'ltr',
			variants: ['dip', 'diw', 'dib', 'dks', 'dik']
		}, {
			id: 'dutch',
			twoLetterISO: 'nl',
			threeLetterISO: 'nld',
			characterSet: 'a-zA-Z',
			script: 'latin',
			direction: 'ltr'
		},

		{
			id: 'english',
			twoLetterISO: 'en',
			threeLetterISO: 'eng',
			characterSet: 'a-zA-Z',
			script: 'latin',
			direction: 'ltr'
		}, {
			id: 'estonian',
			twoLetterISO: 'es',
			threeLetterISO: 'est',
			characterSet: 'a-zA-Z\u00fc\u00f5\u00f6\u00e4\u00dc\u00d5\u00d6\u00c4\u0161\u017e',
			script: 'latin',
			direction: 'ltr'
		}, {
			id: 'farsi',
			twoLetterISO: 'fa',
			threeLetterISO: 'fas',
			characterSet: '\u0600-\u063a\u0698\u06a9\u06af\u067e\u0686\u06cc\u06f0-\u06f9',
			script: 'arabic',
			direction: 'rtl',
			weight: 5,
			variants: ['prs', 'pes']
		}, {
			id: 'finnish',
			twoLetterISO: 'fi',
			threeLetterISO: 'fin',
			characterSet: 'a-zA-Z\u00e5\u00f6\u00e4\u00c5\u00d6\u00c4',
			script: 'latin',
			direction: 'ltr'
		}, {
			id: 'french',
			twoLetterISO: 'fr',
			threeLetterISO: 'fra',
			characterSet: 'a-zA-Z\u00e9\u00e8\u00e7\u00e0\u00f9',
			script: 'latin',
			direction: 'ltr',
			weight: 8
		}, {
			id: 'georgian',
			twoLetterISO: 'ka',
			threeLetterISO: 'kat',
			characterSet: '\u10a0-\u10ff',
			script: 'georgian',
			direction: 'ltr'
		}, {
			id: 'german',
			twoLetterISO: 'de',
			threeLetterISO: 'deu',
			characterSet: 'a-zA-Z\u00fc\u00f6\u00e4\u00df\u00dc\u00d6\u00c4',
			script: 'latin',
			direction: 'ltr'
		}, {
			id: 'greek',
			twoLetterISO: 'el',
			threeLetterISO: 'ell',
			characterSet: '\u0370-\u03ff',
			script: 'greek',
			direction: 'ltr'
		}, {
			id: 'gujarati',
			twoLetterISO: 'gu',
			threeLetterISO: 'guj',
			characterSet: '\u0a80-\u0aff',
			script: 'gujarati',
			direction: 'ltr'
		}, {
			id: 'haitian',
			twoLetterISO: 'ht',
			threeLetterISO: 'hat',
			characterSet: 'a-zA-Z\u00e0\u00e8\u00f2',
			script: 'latin',
			direction: 'ltr'
		}, {
			id: 'hassaniyya',
			twoLetterISO: undefined,
			threeLetterISO: 'mey',
			characterSet: '\u0600-\u063a',
			script: 'arabic',
			direction: 'rtl'
		}, {
			id: 'hausa',
			twoLetterISO: 'ha',
			threeLetterISO: 'hau',
			characterSet: 'a-zA-Z\u0253\u0257\u0199\u01b4\u0181\u018a\u0198\u01b3',
			script: 'latin',
			direction: 'ltr'
		}, {
			id: 'hebrew',
			twoLetterISO: 'he',
			threeLetterISO: 'heb',
			characterSet: '\u0590-\u05ff',
			script: 'hebrew',
			direction: 'rtl'
		}, {
			id: 'hindi',
			twoLetterISO: 'hi',
			threeLetterISO: 'hin',
			characterSet: '\u0900-\u097f',
			script: 'devanagari',
			direction: 'ltr',
			weight: 6
		}, {
			id: 'hindko',
			threeLetterISO: 'hno',
			characterSet: '\u0600-\u063a\u0698\u06a9\u06af\u0679\u067e\u0686\u0688\u0691\u06cc\u06d2\u06d3\u06ba\u06be\u06c0\u06c1\u06c2\u06c3\u06f0-\u06f9',
			// characterSet:'\u0600-\u063a',
			script: 'arabic',
			direction: 'rtl',
			variants: ['hnd']
		}, {
			id: 'hungarian',
			twoLetterISO: 'hu',
			threeLetterISO: 'hun',
			characterSet: 'a-zA-Z\u00f6\u00fc\u00f3\u0151\u00fa\u0171\u00e9\u00e1\u00d6\u00dc\u00d3\u0150\u00da\u0170\u00c9\u00c1',
			script: 'latin',
			direction: 'ltr'
		}, {
			id: 'igbo',
			twoLetterISO: 'ig',
			threeLetterISO: 'ibo',
			characterSet: 'a-zA-Z\u1ee5\u1ecb\u1ecd\u1ee4\u1eca\u1ecc\u0300\u0301\u0304',
			script: 'latin',
			direction: 'ltr'
		}, {
			id: 'iraqi',
			twoLetterISO: undefined,
			threeLetterISO: 'acm',
			characterSet: '\u0600-\u063a',
			script: 'arabic',
			direction: 'rtl'
		}, {
			id: 'italian',
			twoLetterISO: 'it',
			threeLetterISO: 'ita',
			characterSet: 'a-zA-Z\u00e0\u00e8\u00ec\u00f2\u00f9',
			script: 'latin',
			direction: 'ltr'
		}, {
			id: 'japanese',
			twoLetterISO: 'ja',
			threeLetterISO: 'jpn',
			characterSet: '\u3040-\u309f\u30a0-\u30ff\u3200-\u9fff\uf900-\ufaff',
			script: 'kana',
			direction: 'ltr'
		}, {
			id: 'kashmiri',
			twoLetterISO: 'ks',
			threeLetterISO: 'kas',
			characterSet: '\u0600-\u063a\u06c4\u0672\u0673\u06f0-\u06f9',
			script: 'arabic',
			direction: 'rtl'
		}, {
			id: 'kazakh',
			twoLetterISO: 'kk',
			threeLetterISO: 'kaz',
			characterSet: '\u0400-\u044f\u04d9\u0456\u04a3\u0493\u04af\u04b1\u049b\u04e9\u04bb\u04d8\u0406\u04a2\u0492\u04ae\u04b0\u049a\u04e8\u04ba',
			script: 'cyrillic',
			direction: 'ltr'
		}, {
			id: 'korean',
			twoLetterISO: 'ko',
			threeLetterISO: 'kor',
			characterSet: '\u1100-\u11ff\uac00-\ud7af\u3200-\u9fff\uf900-\ufaff',
			script: 'hangul',
			direction: 'ltr'
		}, {
			id: 'kurdish',
			twoLetterISO: 'ku',
			threeLetterISO: 'kur',
			characterSet: '',
			script: '',
			direction: '',
			variants: ['ckb', 'kmr', 'sdh']
		}, {
			id: 'kurmanji',
			threeLetterISO: 'kmr',
			characterSet: 'a-zA-Z\u00fb\u015f\u00ee\u00ea\u00e7\u00e9\u00db\u015e\u00ce\u00ca\u00c7',
			script: 'latin',
			direction: 'ltr'
		}, {
			id: 'kyrgyz',
			twoLetterISO: 'ky',
			threeLetterISO: 'kir',
			characterSet: '\u0400-\u044f\u04e8\u04e9\u04a2\u04a3\u04ae\u04af',
			script: 'cyrillic',
			direction: 'ltr'
		}, {
			id: 'latvian',
			twoLetterISO: 'lv',
			threeLetterISO: 'lav',
			characterSet: 'a-zA-Z\u016b\u0113\u010d\u017e\u0137\u0161\u0146\u012b\u0101\u013c\u016a\u0112\u010c\u017d\u0136\u0160\u0145\u012a\u0100\u013b',
			script: 'latin',
			direction: 'ltr'
		}, {
			id: 'lithuanian',
			twoLetterISO: 'lt',
			threeLetterISO: 'lit',
			characterSet: 'a-zA-Z\u0105\u010d\u0119\u0117\u012f\u0161\u0173\u016b\u017e\u0104\u010c\u0118\u0116\u012e\u0160\u0172\u016a\u017d',
			script: 'latin',
			direction: 'ltr'
		}, {
			id: 'lao',
			twoLetterISO: 'lo',
			threeLetterISO: 'lao',
			characterSet: '\u0e80-\u0eff',
			script: 'lao',
			direction: 'ltr'
		}, {
			id: 'macedonian',
			twoLetterISO: 'mk',
			threeLetterISO: 'mkd',
			characterSet: '\u0400-\u044f\u0453\u045c\u045f\u0403\u040c\u040f',
			script: 'cyrillic',
			direction: 'ltr'
		}, {
			id: 'maguindanao',
			threeLetterISO: 'mdh',
			characterSet: 'a-zA-Z',
			script: 'latin',
			direction: 'ltr'
		}, {
			id: 'maranao',
			threeLetterISO: 'mrw',
			characterSet: 'a-zA-Z',
			script: 'latin',
			direction: 'ltr'
		}, {
			id: 'norwegian',
			twoLetterISO: 'no',
			threeLetterISO: 'nor',
			characterSet: 'a-zA-Z\u00e5\u00f8\u00e6\u00c5\u00d8\u00c6',
			script: 'latin',
			direction: 'ltr',
			variants: ['nob', 'nno']
		}, {
			id: 'pashto',
			twoLetterISO: 'ps',
			threeLetterISO: 'pus',
			characterSet: '\u0600-\u063a\u0696\u069a\u06ab\u067c\u0681\u0685\u0689\u0693\u06cd\u06d0\u06bc\u0646\u0647\u0641\u0648\u0644\u06a9\u06cc\u0686\u0698\u064a\u067e\u0645\u06af\u0642',
			script: 'arabic',
			direction: 'rtl',
			variants: ['pst', 'pbu', 'pbt']
		}, {
			id: 'potwari',
			threeLetterISO: 'phr',
			characterSet: '\u0600-\u063a\u0696\u069a\u06ab\u067c\u0681\u0685\u0689\u0693\u06cd\u06d0\u06bc\u0646\u0647\u0641\u0648\u0644\u06a9\u06cc\u0686\u0698\u064a\u067e\u0645\u06af\u0642',
			script: 'arabic',
			direction: 'rtl',
			variants: ['pst', 'pbu', 'pbt']
		}, {
			id: 'polish',
			twoLetterISO: 'pl',
			threeLetterISO: 'pol',
			characterSet: 'a-zA-Z\u0119\u00f3\u0105\u015b\u0142\u017c\u017a\u0107\u0144\u0118\u00d3\u0104\u015a\u0141\u017b\u0179\u0106\u0143',
			script: 'latin',
			direction: 'ltr'
		}, {
			id: 'epunjabi',
			twoLetterISO: 'pa',
			threeLetterISO: 'pan',
			characterSet: '\u0a00-\u0a7f',
			script: 'gurmukhi',
			direction: 'ltr',
			weight: 2
		}, {
			id: 'wpunjabi',
			twoLetterISO: 'pa',
			threeLetterISO: 'pnb',
			characterSet: '\u0600-\u063a\u0698\u06a9\u06af\u0679\u067e\u0686\u0688\u0691\u06cc\u06d2\u06d3\u06ba\u06be\u06c0\u06c1\u06c2\u06c3\u06f0-\u06f9',
			script: 'arabic',
			direction: 'rtl'
		}, {
			id: 'portugese',
			twoLetterISO: 'pt',
			threeLetterISO: 'por',
			characterSet: 'a-zA-Z\u00e1\u00e2\u00e3\u00e0\u00e7\u00e9\u00ea\u00ed\u00f3\u00f4\u00f5\u00fa\u00c1\u00c2\u00c3\u00c0\u00c7\u00c9\u00ca\u00cd\u00d3\u00d4\u00d5\u00da',
			script: 'latin',
			direction: 'ltr'
		}, {
			id: 'quechua',
			twoLetterISO: 'qu',
			threeLetterISO: 'que',
			characterSet: 'a-zA-Z\u00e1\u00e9\u00ed\u00f3\u00fa\u00fc\u00f1\u00c1\u00c9\u00cd\u00d3\u00da\u00dc\u00d1',
			script: 'latin',
			direction: 'ltr'
		}, {
			id: 'romanian',
			twoLetterISO: 'ro',
			threeLetterISO: 'ron',
			characterSet: 'a-zA-Z\u0103\u00ee\u00e2\u0219\u021b\u0102\u00ce\u00c2\u0218\u021a',
			script: 'latin',
			direction: 'ltr'
		}, {
			id: 'russian',
			twoLetterISO: 'ru',
			threeLetterISO: 'rus',
			characterSet: '\u0410-\u044f',
			script: 'cyrillic',
			direction: 'ltr',
			weight: 8
		}, {
			id: 'sama',
			threeLetterISO: 'ssb',
			characterSet: 'a-zA-Z',
			script: 'latin',
			direction: 'ltr',
			variants: ['sml', 'slm']
		}, {
			id: 'serbian',
			twoLetterISO: 'sr',
			threeLetterISO: 'srp',
			characterSet: '\u0410-\u044f\u0452\u0458\u0459\u045a\u045b\u045f',
			script: 'cyrillic',
			direction: 'ltr'
		}, {
			id: 'sindhi',
			twoLetterISO: 'sd',
			threeLetterISO: 'snd',
			characterSet: '\u0600-\u063a',
			script: 'arabic',
			direction: 'rtl'
		}, {
			id: 'siraiki',
			threeLetterISO: 'skr',
			characterSet: '\u0600-\u063a\u0698\u06a9\u06af\u0679\u067e\u0686\u0688\u0691\u06cc\u06d2\u06d3\u06ba\u06be\u06c0\u06c1\u06c2\u06c3\u06b0\u06f0-\u06f9',
			script: 'arabic',
			direction: 'rtl'
		}, {
			id: 'slovene',
			twoLetterISO: 'sl',
			threeLetterISO: 'slv',
			characterSet: 'a-zA-Z',
			script: 'latin',
			direction: 'ltr'
		}, {
			id: 'slovak',
			twoLetterISO: 'sk',
			threeLetterISO: 'slk',
			characterSet: 'a-zA-Z\u013e\u0161\u010d\u0165\u017e\u00fd\u00e1\u00ed\u00e9\u00fa\u00e4\u0148\u00f4',
			script: 'latin',
			direction: 'ltr'
		}, {
			id: 'sorani',
			threeLetterISO: 'ckb',
			characterSet: '\u0600-\u063a\u06ce\u06b5\u06b6\u06b7\u06c6\u06ca\u0695\u06a4\u0692\u0694',
			script: 'arabic',
			direction: 'rtl'
		}, {
			id: 'spanish',
			twoLetterISO: 'es',
			threeLetterISO: 'spa',
			characterSet: 'a-zA-Z\u00e1\u00e9\u00ed\u00f3\u00fa\u00fc\u00f1\u00c1\u00c9\u00cd\u00d3\u00da\u00dc\u00d1',
			script: 'latin',
			direction: 'ltr',
			weight: 7
		}, {
			id: 'sudanese',
			twoLetterISO: undefined,
			threeLetterISO: 'apd',
			characterSet: '\u0600-\u063a',
			script: 'arabic',
			direction: 'rtl'
		}, {
			id: 'swahili',
			twoLetterISO: 'sw',
			threeLetterISO: 'swa',
			characterSet: 'a-zA-Z',
			script: 'latin',
			direction: 'ltr',
			variants: ['swc', 'swh']
		}, {
			id: 'swedish',
			twoLetterISO: 'sv',
			threeLetterISO: 'swe',
			characterSet: 'a-zA-Z\u00e5\u00f6\u00e4\u00c5\u00d6\u00c4',
			script: 'latin',
			direction: 'ltr'
		}, {
			id: 'tagalog',
			twoLetterISO: 'tl',
			threeLetterISO: 'tgl',
			characterSet: 'a-zA-Z',
			script: 'latin',
			direction: 'ltr'
		}, {
			id: 'tajik',
			twoLetterISO: 'tg',
			threeLetterISO: 'tgk',
			characterSet: '\u0400-\u044f\u0493\u04ef\u049b\u04b3\u04b7\u04e3\u0492\u04ee\u049a\u04b2\u04b6\u04e2',
			script: 'cyrillic',
			direction: 'ltr'
		}, {
			id: 'thai',
			twoLetterISO: 'th',
			threeLetterISO: 'tha',
			characterSet: '\u0e00-\u0e7f',
			script: 'thai',
			direction: 'ltr'
		}, {
			id: 'tigrinya',
			twoLetterISO: 'ti',
			threeLetterISO: 'tir',
			characterSet: '\u1200-\u137f',
			script: 'geez',
			direction: 'ltr'
		}, {
			id: 'turkish',
			twoLetterISO: 'tr',
			threeLetterISO: 'tur',
			characterSet: 'a-zA-Z\u00e9\u011f\u00fc\u015f\u00f6\u00e7\u011f\u00fc\u015f\u00e7',
			script: 'latin',
			direction: 'ltr'
		}, {
			id: 'turkmen',
			twoLetterISO: 'tk',
			threeLetterISO: 'tuk',
			characterSet: 'a-zA-Z\u00fd\u00e4\u00fc\u00f6\u017e\u0148\u015f\u00e7\u00dd\u00c4\u00dc\u00d6\u017d\u0147\u015e\u00c7',
			script: 'latin',
			direction: 'ltr'
		}, {
			id: 'ukrainian',
			twoLetterISO: 'uk',
			threeLetterISO: 'ukr',
			characterSet: '\u0400-\u044f\u0454\u0404\u0406\u0491\u0456\u0457',
			script: 'cyrillic',
			direction: 'ltr'
		}, {
			id: 'uzbek',
			twoLetterISO: 'uz',
			threeLetterISO: 'uzb',
			characterSet: '\u0400-\u044f',
			script: 'cyrillic',
			direction: 'ltr',
			variants: ['uzn', 'uzs']
		}, {
			id: 'wolof',
			twoLetterISO: 'wo',
			threeLetterISO: 'wol',
			characterSet: 'a-zA-Z\u014b\u00e0\u0101\u00e9\u00eb\u0113\u012b\u00f3\u014d\u016b\u00f1\u014a\u00c0\u00c9\u00d3\u00cb\u0100\u0112\u012a\u014c\u016a\u00d1',
			script: 'latin',
			direction: 'ltr'
		}, {
			id: 'urdu',
			twoLetterISO: 'ur',
			threeLetterISO: 'urd',
			characterSet: '\u0600-\u063a\u0698\u06a9\u06af\u0679\u067e\u0686\u0688\u0691\u06cc\u06d2\u06d3\u06ba\u06be\u06c0\u06c1\u06c2\u06c3\u06f0-\u06f9',
			script: 'arabic',
			direction: 'rtl',
			weight: 2
		}, {
			id: 'vietnamese',
			twoLetterISO: 'vi',
			threeLetterISO: 'vie',
			characterSet: 'a-zA-Z\u0103\u00e2\u00ea\u00f4\u01a1\u01b0\u0102\u00c2\u00ca\u00d4\u01a0\u01af\u0300\u0301\u0303\u0309\u0323',
			script: 'latin',
			direction: 'ltr'
		}, {
			id: 'yakan',
			threeLetterISO: 'yka',
			characterSet: 'a-zA-Z',
			script: 'latin',
			direction: 'ltr'
		}, {
			id: 'yoruba',
			twoLetterISO: 'yo',
			threeLetterISO: 'yor',
			characterSet: 'a-zA-Z\u00c0\u00c1\u00c8\u00c9\u00cc\u00cd\u00d2\u00d3\u00d9\u00da\u00e0\u00e1\u00e8\u00e9\u00ec\u00ed\u00f2\u00f3\u00f9\u00fa\u0300\u0301\u0323\u1e62\u1e63\u1eb8\u1eb9\u1ecc\u1ecd',
			script: 'latin',
			direction: 'ltr'
		}
	];



	bloom_plugin.attachNflcIme = function() {

		if (NFLCIME) {

			// load nflcime modules

			if (typeof NFLCIMELoaded == "undefined") {
				tinymce.each(init_modules, function(m) {
					NFLCIME.dispatchEvent({
						type: 'ModuleLoad',
						moduleId: m.id,
						activate: m.activate,
						compressed: m.compressed
					});

				});

				NFLCIMELoaded = true;
			}


		} else {

			NFLCIME = (window.NFCLIME || {});
			tinymce.extend(NFLCIME, {
				init_modules: bloom_init_params
			});

		}
	};


	// look for match on language

	bloom_plugin.findLanguageByName = function(lang) {
		lang = lang.toLowerCase();
		for (var i = 0; i < bloom_plugin.supportedLanguages.length; i++) {
			if (bloom_plugin.supportedLanguages[i].id.toLowerCase() == lang) {
				return bloom_plugin.supportedLanguages[i];
			}
		}
	};

	/**
	 * strip off portion of fra-SY (the country code) to capture fra iso code
	 * only.
	 */
	bloom_plugin.findLanguage = function(lang) {

		if (!lang) {
			// console.log('no language specified', lang);
			return;
		}

		if (lang) {
			lang = lang.toLowerCase();
			// lang = lang.toLowerCase().substring(0, 3);
			var countryCode = lang.split('-');
			if (countryCode.length > 1) {
				countryCode = countryCode[countryCode.length - 1];
				lang = lang.substring(0, 3);
			}


			for (var i = 0; i < bloom_plugin.supportedLanguages.length; i++) {
				var item = bloom_plugin.supportedLanguages[i];
				if (item.threeLetterISO == lang || item.id.toLowerCase() == lang) {
					return item;
				}
				if (item.variants) {
					for (var j = 0; j < item.variants.length; j++) {
						if (item.variants[j] == lang) {
							return item;
						}
					}
				}
			}
		}

	};

	//
	bloom_plugin.attachNflcIme();

	// handle languages and defaultLanguage arguments

	var langs = ed.getParam('bloom').languages;


	var defaultLanguage = ed.getParam('bloom').default_language;

	if (langs)
		langs = langs.split(',');

	// if no languages are specified, allow user
	// to select from all supported languages

	if (langs.length === 0) {
		langs = bloom_plugin.supportedLanguages;
	}

	if (!defaultLanguage) {
		defaultLanguage = langs[0];
	}

	// create menu and buttons

	var menuItems = [],
		theLang = {};

	/*
	for (var i = 0; i < langs.length; i++) {

		theLang = bloom_plugin.findLanguage(langs[i]);
		if (theLang) {

			menuItems.push({
				text: theLang.id.charAt(0).toUpperCase() + theLang.id.slice(1),
				language: theLang.threeLetterISO,
				langDirection: theLang.direction
			});

			if (langs[i].toLowerCase() == defaultLanguage.toLowerCase()) {
				ed.bloomLanguage = theLang.threeLetterISO;
			}
		} else {
			console.warn('TinyMCE > bloom plugin > could not find language:',
				langs[i]);
		}

	}
	//	console.log('init ed.bloomLanguage', ed.bloomLanguage);
	//	console.log('init defaultLanguage', defaultLanguage);
	// sort by language names
	menuItems = menuItems.sort(function(a, b) {
		if (a.text > b.text)
			return 1;
		else
			return -1;
	});
    */
	/*
    menuItems.unshift([{
    	text: 'Select Lang',
    	language: 'eng',
    	langDirection: 'ltr'
    }])
	*/

	// store language config with editor
	// ed.bloomLanguages = menuItems;

	// add drop-down list
	ed.addButton('bloomlanguagebutton', {
		type: 'menubutton',
		text: 'Please Select',
		tooltip: 'Select the language / character set',
		icon: false,
		menu: menuItems,
		onselect: function(e) {

			this.text(e.control._text);
			var selectedLang = bloom_plugin.findLanguageByName(e.control._text);
			if (selectedLang) {
				ed.bloomLanguage = selectedLang.threeLetterISO;



				var node = ed.selection.getNode();
				var selectedTag = "other";

				// determine if a block is selected
				if (ed.selection.getContent().substring(0, 5) == "<span") {
					selectedTag = "span";
				} else if (ed.selection.getContent().substring(0, 2) == "<p") {
					selectedTag = "P";
				}

				// did the user select text, or is the cursor
				// 
				if (ed.selection.getContent().length == 0) {
					var insertMode = true;
				} else {
					var insertMode = false;
				}

				if (selectedTag != "other") {

					node.setAttribute("lang", ed.bloomLanguage);
					node.setAttribute("class", "lang-" + ed.bloomLanguage);
					ed.fire('languagechange', {
						language: selectedLang.threeLetterISO,
						editor: ed
					});

				} else {

					if (!insertMode) {
						// user has selected text

						switch (node.nodeName) {

							case "P":
								// wrap text in span
								var range = ed.selection.getRng();
								var content = ed.selection.getContent();
								ed.selection.setContent('<span lang="' + ed.bloomLanguage + '" class="lang-' + ed.bloomLanguage + '">' + content + "</span>")
								break;

							case "SPAN":
								// can't do span inside of span
								// so change span parent lang
								node.setAttribute("lang", ed.bloomLanguage);
								node.setAttribute("class", "lang-" + ed.bloomLanguage);
								break;
						}

					} else {
						// user has not selected text

						if (node.nodeName == 'P') {
							// add a span if inside a <p> and nothing selected
							if (node.innerText.length > 1 && node.getAttribute('lang')) {

								var selection = ed.selection.getRng();
								var s = document.createElement("SPAN");
								s.setAttribute("lang", ed.bloomLanguage);
								s.setAttribute("class", "lang-" + ed.bloomLanguage);

								var t = document.createTextNode(" ");
								s.appendChild(t);

								selection.insertNode(s);
								ed.selection.select(t, true);
								ed.selection.setCursorLocation(t, 1);
								ed.focus();
								ed.fire('languagechange', {
									language: selectedLang.threeLetterISO,
									editor: ed
								});
							} else {
								node.setAttribute("lang", ed.bloomLanguage);
								node.setAttribute("class", "lang-" + ed.bloomLanguage);
							}
						} else {

							// cursor is positioned in 
							// span with lang attribute already set
							alert("In order to change the language you must first select the entire block by pressing the Select Block button");

							// reset lang selector
							selectedLang = bloom_plugin.findLanguagenode.getAttribute('lang');
							this.text(selectedLang.id.charAt(0).toUpperCase() + selectedLang.id.slice(1));

						}

					}

				}
			}
		},
		onPostRender: function() { // assigns button
			var self = this;
			ed.plugins.bloom.languageSelectorButton = self;
		}
	});

	// add "Go" button
	/**
	 * Clicking on this button appears to dispach the NFLCIME
	 * CursorMoved event, which in turn dispatches the NFLCIME
	 * LanguageChange event, which inturn fires the tinymce
	 * editor "langchange" event.
	 *
	 * This appears to bring up the keyboard, but how.  Where is this
	 * event captured?
	 */

	ed.addButton('bloomlanguageenablebutton', {
		type: 'button',
		// disabled : ed.bloomLanguage ? false : true,
		image: url + '/img/keyboard.png',
		tooltip: 'Enable Language Keyboard',
		onclick: function(e) {

			
			var lang = bloom_plugin.findLanguage(ed.bloomLanguage);
			
			if ("kbd" in lang) {
				if (!lang.kbd) {
					alert("The " + lang.id + " language does not have a special keyboard");
				}
			}

			ed.fire('languagechange', {
				language: ed.bloomLanguage,
				editor: ed
			});

		}
	});



	ed.addButton('bloomlanguageselectblockbutton', {
		type: 'button',
		// disabled : ed.bloomLanguage ? false : true,
		image: url + '/img/selection_up.png',
		tooltip: 'Select the current block',
		onclick: function(e) {
			/**
			 * Clicking on this button appears to dispach the NFLCIME
			 * CursorMoved event, which in turn dispatches the NFLCIME
			 * LanguageChange event, which inturn fires the tinymce
			 * editor "langchange" event.
			 *
			 * This appears to bring up the keyboard, but how.  Where is this
			 * event captured?
			 */

			var node = ed.selection.getNode();
			ed.selection.select(node);
		}
	});

	ed.addButton('bloomcharmapbutton', {
		type: 'button',
		// disabled : ed.bloomLanguage ? false : true,
		image: url + '/img/keyboard_key.png',
		disabled: true,
		tooltip: 'Display the Character Map',
		onclick: function(e) {
			/**
			 * Clicking on this button appears to dispach the NFLCIME
			 * CursorMoved event, which in turn dispatches the NFLCIME
			 * LanguageChange event, which inturn fires the tinymce
			 * editor "langchange" event.
			 *
			 * This appears to bring up the keyboard, but how.  Where is this
			 * event captured?
			 */

			var target = "ui.charmap";
			var url = "ui.charmap.html";

			NFLCIME.dispatchEvent({
				type: 'UIModuleLoad',
				moduleId: target,
				url: url,
				options: {
					hAlign: 'left',
					vAlign: 'top',
					x: 200,
					y: 200
				}
			})
		},
		onPostRender: function() { // assigns button
			var self = this;
			ed.plugins.bloom.bloomCharMapButton = self;
		}
	});

	// fire Ext JS events - relocated to ext plugin class
	/*
	ed.on('focus', function __focus__(e) {
				var cmp = e.target.settings.extClass;
				cmp.fireEvent('focus', cmp, e.target);
			});

	ed.on('blur', function __blur__(e) {
				var cmp = e.target.settings.extClass;
				cmp.fireEvent('blur', cmp, e.target);
			});

	*/
	ed.on('postrender', function __postrender__(mgr) {

		// alert('postrender');
		var cssFile = css_loc.indexOf('://') > 0 ? css_loc : (url + '/' + css_loc);
		// console.log(cssFile);
		ed.dom.loadCSS(cssFile);
		var cmp = mgr.target.settings.extClass;
		// cmp.fireEvent('editorready', cmp, mgr.target);

	});

	// set default language
	ed.on('defaultlanguagechange', function __defaultlanguagechange__(e) {
		// debugger;
		var lang = e.language;
		var language = bloom_plugin.findLanguage(lang);
		var defaultHtml = '<p lang="' + lang + '" class="lang-' + lang + '"></p>';
		this.setContent(defaultHtml);

		ed.plugins.bloom.languageSelectorButton.text(language.id.charAt(0).toUpperCase() + language.id.slice(1));

	});



	// this event is fired from NFLCIME/lang.js handler for the 'languagechange'
	// event. and POSSIBLY elswhere??
	ed.on('langchange', function __langchange__(e) {
		//console.log('ed.on langchange')

		var lang = e.lang;
		var ed = e.target;
		var langSelectButton = bloom_plugin.languageSelectorButton;
		var langName = "";

		if (e.lang.length != 3) {
			this.plugins.bloom.bloomCharMapButton.disabled(true);
		} else {
			this.plugins.bloom.bloomCharMapButton.disabled(false);
		}

		var language = bloom_plugin.findLanguage(lang);
		if (language) {
			langSelectButton.text(language.id.charAt(0).toUpperCase() + language.id.slice(1));
			ed.bloomLanguage = lang;
		} else {
			langSelectButton.text('Please Select');
		}
	});

	// dynamically reconfigure supported languages


	ed.on('setBloomLanguages', function __setbloomlanguages__(ed) {

		// only set once
		// if (!ed.bloomLanguagesSet) {
		// added type conversion 09/17/2014 sdd


		if (typeof ed == 'object') {
			langs = ed.langs;
			if (typeof langs == 'string') {
				langs = langs.split(',');
			}
		}

		var button = bloom_plugin.languageSelectorButton, //
			menuItems = [], //
			theLang = {}, //
			defaultLang;

		// de-dup languages, stripping off country-code

		var filteredLangObj = {};
		for (var i = 0; i < langs.length; i++) {
			if (typeof langs[i] == 'string') {  // sometimes an object gets passed for some reason?
				langs[i] = langs[i].split('-')[0];
				filteredLangObj[langs[i]] = true;
		  	}
		}
		langs = [];
		for (var i in filteredLangObj) {
			langs.push(i);
		}

		langs.push('eng');

		// add menu items

		var langLabels = {};
		var langLabel = "";

		for (var i = 0; i < langs.length; i++) {

			theLang = bloom_plugin.findLanguage(langs[i]);

			if (theLang) {
				langLabel = theLang.id.charAt(0).toUpperCase() + theLang.id.slice(1);
				// de-dup, again
				if (!langLabels[langLabel]) {
					menuItems.push({
						text: langLabel,
						language: theLang.threeLetterISO,
						langDirection: theLang.direction
					});

					if (langs[i].toLowerCase() == defaultLanguage.toLowerCase()) {
						ed.bloomLanguage = theLang.threeLetterISO;
					}
					langLabels[langLabel] = true;
				}
			} else {
				// console.warn('TinyMCE > bloom plugin > could not find language:',langs[i]);
			}

		}

		/**
		 * Note the default lang must be in the list, so we add it here if it is
		 * not.
		 */
		if (!ed.bloomLanguage && defaultLanguage.length === 3) {
			defaultLang = bloom_plugin.findLanguage(defaultLanguage
				.toLowerCase());

			menuItems.push({
				text: defaultLang.id.charAt(0).toUpperCase() + defaultLang.id.slice(1),
				language: defaultLang.threeLetterISO,
				langDirection: defaultLang.direction,
				tooltip: defaultLang.id.charAt(0).toUpperCase() + defaultLang.id.slice(1)
			});
			ed.bloomLanguage = defaultLang.threeLetterISO;
		}


		if (menuItems.length > 0) {

			menuItems = menuItems.sort(function(a, b) {
				if (a.text > b.text)
					return 1;
				else
					return -1;
			});

			// console.log('resetting editor to these languages: ', menuItems, bloom_plugin.languageSelectorButton);

			button.settings.menu = menuItems;
			button.menu = null;

			// button.text(menuItems[0].text);
			button.text("Please Select");

		} else {

			button.settings.menu = [];
			button.text('');
		}

		// this.fire('languagechange', {
		// language: menuItems[0].language,
		// editor: this
		// });

		ed.bloomLanguagesSet = true;
		// }

	});


});