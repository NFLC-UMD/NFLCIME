/**
 * @docauthor Steve Drucker <sdrucker@figleaf.com>
 *
 * @class Language
 *
 */



NFLCIME.dispatchEvent( { type:'ModuleAdd', module:
{
	id:'lang',
	type:'language',
	dependency:['cursor'],
	onModuleActivate:function(evt) {
		var module = evt.module;
		if(module == this) {
			NFLCIME.addEventListener('FocusChanged', this);
			NFLCIME.addEventListener('CursorMoved', this);
			NFLCIME.addEventListener('LanguageRescan', this);
			NFLCIME.addEventListener('LanguageChange', this);
			NFLCIME.addEventListener('LanguageGet', this);
			NFLCIME.addEventListener('LanguageDetect', this);
			NFLCIME.addEventListener('LanguageSetHint', this);
			NFLCIME.addEventListener('OptionSet', this);
			NFLCIME.addEventListener('OptionGet', this);
		} else if(module.type == 'keyboard layout') {
			this.keyboard = module;
			this.launchKeyboardInterface();
		} else if(module.type == 'encoding converter') {
			this.converter = module;
			this.launchConverterInterface();
		} else if(module.id == 'ui.kb') {
			this.keyboardInterface = module;
		} else if(module.id == 'ui.cvt') {
			this.converterInterface = module;
		} else if(module.id == 'ui.lang') {
			this.languageInterface = module;
		}
	},
	onModuleDeactivate:function(evt) {
		var module = evt.module;
		if(module == this) {
			NFLCIME.removeEventListener('FocusChanged', this);
			NFLCIME.removeEventListener('CursorMoved', this);
			NFLCIME.removeEventListener('LanguageRescan', this);
			NFLCIME.removeEventListener('LanguageChange', this);
			NFLCIME.removeEventListener('LanguageDetect', this);
			NFLCIME.removeEventListener('LanguageGet', this);
			NFLCIME.removeEventListener('LanguageSetHint', this);
			NFLCIME.removeEventListener('OptionSet', this);
			NFLCIME.removeEventListener('OptionGet', this);
		} else if(module == this.keyboard) {
			this.keyboard = null;
			// take down the user interface too
			if(this.keyboardInterface) {
				NFLCIME.dispatchEvent( { type:'ModuleDeactivate', module:this.keyboardInterface, animation:'fade-out' } );
			}
		} else if(module == this.converter) {
			this.converter = null;
			if(this.converterInterface) {
				NFLCIME.dispatchEvent( { type:'ModuleDeactivate', module:this.converterInterface, animation:'fade-out' } );
			}
		} else if(module == this.keyboardInterface) {
			this.keyboardInterface = null;
		} else if(module == this.converterInterface) {
			this.converterInterface = null;
		} else if(module == this.languageInterface) {
			this.languageInterface = null;
		}
	},
	onFocusChanged:function(evt) {
		this.onCursorMoved(evt);
	},
	onCursorMoved:function(evt) {
		var edit = evt.target;
		var evt = { type:'ServiceApplicable', target:edit, service:'kb,cvt', applicable:false };
		NFLCIME.dispatchEvent(evt);
		var tag = (evt.applicable) ? this.getLangTag(edit) : 'null';
//		console.log('CursorMoved',tag);
		if(this.languageTag != tag) {
			var dir = (tag == 'null' || tag == 'unknown')?'': (dir = this.findLanguageByIETFTag(tag)) && dir.direction;
			NFLCIME.dispatchEvent( { type:'LanguageChange', languageTag:tag, languageDir:dir} );
		} 
	},
	onLanguageRescan:function(evt) {
		// get the focused edit and
		var evt = { type:'CursorGetFocusedEdit', target:null };
		NFLCIME.dispatchEvent(evt);
		this.onFocusChanged(evt);
	},
	onLanguageChange:function(evt) {
		var tag = evt.languageTag;
		var language = this.findLanguageByIETFTag(tag);
		if(this.language != language) {
			this.language = language;
			if(this.language) {
				this.keyboardId = this.getPreference('kb', 'id', this.language.id);
				this.keyboardShow = this.getPreferenceBoolean('kb', 'show', this.language.id);
				this.converterId = this.getPreference('cvt', 'id', this.language.id);
			} else {
				this.keyboardId = null;
				this.converterId = null;
			}
			this.launchLanguageInterface();
			this.launchKeyboard();
			this.launchConverter();
		}
	},
	onLanguageGet:function(evt) {
		if(this.language) {
			evt.languageTag = this.languageTag;
			if(this.language.twoLetterISO) {
				evt.code2 = this.language.twoLetterISO;
			} else if(this.language.threeLetterISO) {
				// use the two letter code of the macro language if language belongs to one
				var macro = this.findMacroLanguageByThreeLetterCode(this.language.threeLetterISO)
				if(macro) {
					evt.code2 = macro.twoLetterISO;
				}
			}
			if(this.language.threeLetterISO) {
				evt.code3 = this.language.threeLetterISO;
			}
			evt.script = this.language.script;
			evt.direction = this.language.direction;
		}
	},
	onLanguageSetHint:function(evt) {
		this.languageHint = evt.languageTag;
	},
	onLanguageDetect:function(evt) {
		var segment = evt.textSegment;
		var segment_language = null;
		var segment_language_tag = null;
		// text is set to a symbolic font
		if(segment.style && segment.style.fontFamily && /symbol|wingding|webding/i.test(segment.style.fontFamily)) {
			return;
		}
		if(this.languageHint) {
			// there's a language hint--see if it matches
			var likely_language = this.findLanguageByIETFTag(this.languageHint);
			if(likely_language) {
				if(this.matchTextSegmentToLanguage(segment, likely_language)) {
					segment_language = likely_language;
					segment_language_tag = this.languageHint;
				}
			}
		}
		if(!segment_language && this.language) {
			// see if the segment's tag matches that of the current language
			if(this.matchTextSegmentToLanguage(segment, this.language)) {
				segment_language = this.language;
				segment_language_tag = this.languageTag;
			}
		}
		if(!segment_language && segment.lang) {
			// use the tag of the segment
			segment_language = this.findLanguageByIETFTag(segment.lang);
			if(segment_language) {
				segment_language_tag = segment_language.fullTag;
			}
		}
		if(!segment_language) {
			// a free-for-all--whichever language grabs the most letters win!
			var highest = this.getEnglishCharacterCount(segment.text);
			for(var i = 0; i < this.languages.length; i++) {
				var possible_language = this.languages[i];
				var count = this.getLanguageCharacterCount(segment.text, possible_language, false);
				if(count > highest) {
					segment_language = possible_language;
					segment_language_tag = possible_language.fullTag;
					highest = count;
				}
			}
		}
		if(segment_language) {
			if(segment_language_tag) {
				evt.languageTag = segment_language_tag;
			}
			if(segment_language.twoLetterISO) {
				evt.code2 = segment_language.twoLetterISO;
			} else if(segment_language.threeLetterISO) {
				var macro = this.findMacroLanguageByThreeLetterCode(segment_language.threeLetterISO)
				if(macro && macro.twoLetterISO) {
					evt.code2 = macro.twoLetterISO;
				}
			}
			if(segment_language.threeLetterISO) {
				evt.code3 = segment_language.threeLetterISO;
			}
			if(segment_language.script) {
				evt.script = segment_language.script;
				evt.direction = segment_language.direction;
			} else {
				// see which of the variant is employed
				var highest_count = 0;
				var variant_used = null;
				if(segment_language.variants) {
					var text = segment.text;
					for(var i = 0; i < segment_language.variants.length; i++) {
						var variant_tag = segment_language.variants[i];
						var variant = this.findLanguageByIETFTag(variant_tag);
						if(variant) {
							var count = this.getLanguageCharacterCount(text, variant, false);
							if(count > highest_count) {
								highest_count = count;
								variant_used = variant;
							}
						}
					}
				}
				if(variant_used) {
					evt.script = variant_used.script;
					evt.direction = variant_used.direction;
				} else {
					evt.script = '';
					evt.direction = '';
				}
			}
		}
	},
	onOptionSet:function(evt) {
		var name = evt.name;
		var value = evt.value;
		switch(name) {
			case 'use-keyboard':
				if(this.keyboardEnabled != value) {
					this.keyboardEnabled = value;
					this.launchKeyboard();
					this.savePreference('kb', 'enabled', null, this.keyboardEnabled);
				}
				break;
			case 'keyboard-id':
				if(this.keyboardId != value) {
					this.keyboardId = value;
					this.launchKeyboard();
					if(this.language) {
						this.savePreference('kb', 'id', this.language.id, this.keyboardId);
					}
				}
				break;
			case 'show-keyboard':
				if(this.keyboardShow != value) {
					this.keyboardShow = value;
					this.launchKeyboardInterface();
					if(this.language) {
						this.savePreference('kb', 'show', this.language.id, this.keyboardShow);
					}
				}
				break;
			case 'use-converter':
				if(this.converterEnabled != value) {
					this.converterEnabled = value;
					this.launchConverter();
					this.savePreference('cvt', 'enabled', null, this.converterEnabled);
				}
				break;
			case 'converter-id':
				if(this.converterId != value) {
					this.converterId = value;
					this.launchConverter();
					if(this.language) {
						this.savePreference('cvt', 'id', this.language.id, this.converterId);
					}
				}
				break;
		}
	},
	onOptionGet:function(evt) {
		var name = evt.name;
		switch(name) {
			case 'use-keyboard':
				evt.value = this.keyboardEnabled;
				break;
			case 'keyboard-id':
				evt.value = this.keyboardId;
				break;
			case 'show-keyboard':
				evt.value = this.keyboardShow;
				break;
			case 'use-converter':
				evt.value = this.converterEnabled;
				break;
			case 'converter-id':
				evt.value = this.converterId;
				break;
		}
	},
	//--- Private functions
	getLangTag:function(edit) {
		var evt = { type:'CursorGetContainer', target:edit, container:null };
		NFLCIME.dispatchEvent(evt);
		var element = evt.container;
		for(var e = element; e && e.nodeType == 1; e = e.parentNode) {
			var tag = e.getAttribute('lang');
			if(!tag) {
				tag = e.getAttribute('xml:lang')
			}
			if(tag) {
				return tag.toLowerCase();
			}
		}
		return 'unknown';
	},
	findLanguageByIETFTag:function(tag) {
		// see if there's a match for the full tag first
		for(var i = 0, count = this.languages.length; i < count; i++) {
			if(this.languages[i].fullTag == tag) {
				return this.languages[i];
			}
		}
		var match;
		if(match = /^[a-z]{3}/.exec(tag)) {
			var lang = this.findLanguageByThreeLetterCode(match[0]);
			if(!lang) {
				lang = this.findMacroLanguageByThreeLetterCode(match[0]);
			}
			return lang;
		} else if(match = /^[a-z]{2}/.exec(tag)) {
			lang = this.findLanguageByTwoLetterCode(match[0]);
			return lang;
		}
	},
	findLanguageByTwoLetterCode:function(code) {
		for(var i = 0; i < this.languages.length; i++) {
			var lang = this.languages[i];
			if(lang.twoLetterISO == code) {
				return lang;
			}
		}
	},
	findLanguageByThreeLetterCode:function(code) {
		for(var i = 0; i < this.languages.length; i++) {
			var lang = this.languages[i];
			if(lang.threeLetterISO == code) {
				return lang;
			}
		}
	},
	findMacroLanguageByThreeLetterCode:function(code) {
		for(var i = 0; i < this.languages.length; i++) {
			var lang = this.languages[i];
			if(lang.variants) {
				for(var j = 0; j < lang.variants.length; j++) {
					if(lang.variants[j] == code) {
						return lang;
					}
				}
			}
		}
	},
	getLanguageCharacterCount:function(text, language, scanVariants) {
		if(language.characterSet) {
			// see how many letters are removed by String.remove()
			var lang_re = new RegExp('[' + language.characterSet + ']+', 'g');
			var text_with_lang_char_removed = text.replace(lang_re, '');
			return text.length - text_with_lang_char_removed.length;
		} else {
			// character set isn't know--language is written in more than one scripts
			if(scanVariants && language.variants) {
				var highest_count = 0;
				for(var i = 0; i < language.variants.length; i++) {
					var variant_tag = language.variants[i];
					var variant = this.findLanguageByIETFTag(variant_tag);
					if(variant) {
						var count = this.getLanguageCharacterCount(text, variant, false);
						if(count > highest_count) {
							highest_count = count;
						}
					}
				}
				return highest_count;
			
			} else {
				return 0;
			}
		}
	},
	getEnglishCharacterCount:function(text) {
		var text_with_eng_char_removed = text.replace(/[a-zA-Z]+/g, '');
		return text.length - text_with_eng_char_removed.length;
	},
	matchTextSegmentToLanguage:function(segment, language) {
		if(segment.lang) {
			var tag = segment.lang.toLowerCase();
			var segment_language = this.findLanguageByIETFTag(tag);
			if(segment_language) {
				if(language == segment_language) {
					return true;
				} else {
					// maybe the target language is a variant?
					if(segment_language.variants) {
						var iso3 = language.threeLetterISO;
						for(var i = 0; i < segment_language.variants.length; i++) {
							var variant_tag = segment_language.variants[i];
							if(variant_tag == iso3 || variant_tag == tag) {
								return true;
							}
						}
					}
				}
			}
		}
		// can't find it by the tag--see if the text contain character used by the language
		var count = this.getLanguageCharacterCount(segment.text, language, true);
		if(count > 0) {
			// there's a match if the segment contains more letter specific to that language than English letters
			if(count > this.getEnglishCharacterCount(segment.text)) {
				return true;
			}
		}		
		return false;
	},
	launchLanguageInterface:function() {
		if(this.language) {
			var url = 'ui.lang.' + this.language.id + '.html';
			NFLCIME.dispatchEvent( { type:'UIModuleLoad', moduleId:'ui.lang', url:url, options: { hAlign:'left', vAlign:'bottom' } } );
		} else {
			if(this.languageInterface) {
				NFLCIME.dispatchEvent( { type:'ModuleDeactivate', module:this.languageInterface, animation:'fade-out' } );
			}
		}
	},
	launchKeyboard:function() {
		if(this.keyboardId && this.keyboardEnabled) {
			// load and activate the layout
			NFLCIME.dispatchEvent( { type:'ModuleLoad', moduleId:this.keyboardId, activate:true } );
		} else {
			// deactivate the current keyboard
			if(this.keyboard) {
				NFLCIME.dispatchEvent( { type:'ModuleDeactivate', module:this.keyboard } );
			}
		}
	},
	launchKeyboardInterface:function() {
		if(this.keyboard && this.keyboardShow) {
			var url = 'ui.' + this.keyboard.id + '.html';
			NFLCIME.dispatchEvent( { type:'UIModuleLoad', moduleId:'ui.kb', url:url, options: { hAlign:'right', vAlign:'top' } } );
		} else {
			if(this.keyboardInterface) {
				NFLCIME.dispatchEvent( { type:'ModuleDeactivate', module:this.keyboardInterface, animation:'fade-out' } );
			}
		}
	},
	launchConverter:function() {
		if(this.converterId && this.converterEnabled) {
			// load and activate the converter
			NFLCIME.dispatchEvent( { type:'ModuleLoad', moduleId:this.converterId, activate:true } );
		} else {
			// deactivate the current converter
			if(this.converter) {
				NFLCIME.dispatchEvent( { type:'ModuleDeactivate', module:this.converter } );
			}
		}
	},
	launchConverterInterface:function() {
		if(this.converter) {
			var url = 'ui.cvt.html';
			//NFLCIME.dispatchEvent( { type:'UIModuleLoad', moduleId:'ui.cvt', url:url } );
		}
	},
	savePreference:function(type, name, lang, value) {
		// save it to persistent storage
		var id = type + ((lang) ? '.' + lang : '');
		var evt = { type:'PersistenceSetValue', id:id, name:name, value:value };
		NFLCIME.dispatchEvent(evt);
		// save the value in case there is no support
		this.preference[name + '.' + id] = value.toString();
	},
	getPreference:function(type, name, lang) {
		// retrieve it from persistent storage
		var id = type + ((lang) ? '.' + lang : '');
		var value = this.preference[name + '.' + id];
		if(value != undefined) {
			return value;
		}
		var evt = { type:'PersistenceGetValue', id:id, name:name };
		NFLCIME.dispatchEvent(evt);
		
		return evt.value;
	},
	getPreferenceBoolean:function(type, name, lang) {
		var value = this.getPreference(type, name, lang);
		if(value != undefined) {
			return (value == 'true') ? true : false;
		} else {
			return undefined;
		}
	},
	initialize:function(env, subclassing) {
		this.defaultIETFTag = env.configuration.defaultIETFTag;
		
		NFLCIME.addEventListener('ModuleActivate', this);
		NFLCIME.addEventListener('ModuleDeactivate', this);
		this.keyboardEnabled = this.getPreferenceBoolean('kb', 'enabled');
		this.converterEnabled = this.getPreferenceBoolean('cvt', 'enabled');
		// sort the list of language by weight so the more common languages appear first
		this.languages.sort(function(a, b) {
			if(a.weight == b.weight) return 0;
			if(a.weight == undefined) return 1;
			if(b.weight == undefined) return -1;
			return (a.weight > b.weight) ? -1 : 1;
		}
		);
	},
	//--- Private variables
	language:null,
	languageTag:null,
	languageHint:null,
	languageInterface:null,
	keyboard:null,
	keyboardId:null,
	keyboardEnabled:true,
	keyboardShow:true,
	keyboardInterface:null,
	converter:null,
	converterId:null,
	converterEnabled:true,
	converterWindow:false,
	converterInterface:null,
	preference:{},
	languages:[
	{	id:'albanian',
		twoLetterISO:'sq',
		threeLetterISO:'sqi',
		characterSet:'a-zA-Z\u00eb\u0040\u00cb\u00c7',
		script:'latin',
		direction:'ltr'
	},
	{	id:'amharic',
		twoLetterISO:'am',
		threeLetterISO:'amh',
		characterSet:'\u1200-\u137f',
		script:'geez',
		direction:'ltr',
		weight:2
	},
	{	id:'msa',
		twoLetterISO:'ar',
		threeLetterISO:'arb',
		characterSet:'\u0600-\u063a',
		script:'arabic',
		direction:'rtl',
		weight:10,
		variants:['aao', 'abh', 'abv', 'acm', 'acq', 'acw', 'acx', 'acy', 'adf', 'aeb', 'aec', 'afb', 'ajp', 'apc', 'apd', 'arb', 'arq', 'ars', 'ary', 'arz', 'auz', 'avl', 'ayh', 'ayl', 'ayn', 'ayp', 'bbz', 'pga', 'shu', 'ssh']
	},
	{	id:'azeri',
		twoLetterISO:'az',
		threeLetterISO:'aze',
		characterSet:'\u0400-\u044f\u04b9\u04d9\u0493\u04e9\u04b8\u04d8\u0492\u04e8',
		script:'cyrillic',
		direction:'ltr'
	},
	{	id:'bambara',
		twoLetterISO:'bm',
		threeLetterISO:'bam',
		characterSet:'a-zA-Z\u00e7\u00e9\u025b\u0254\u00e0\u00e8\u0272\u014b\u00f9\u019d\u014a\u0190\u0186',
		script:'latin',
		direction:'ltr'
	},
	{	id:'balochi',
		twoLetterISO:undefined,
		threeLetterISO:'bal',
		characterSet:'\u0600-\u063a\u0672\u06f0-\u06f9',
		script:'arabic',
		direction:'rtl',
		variants:['bgp', 'bcc', 'bgn']
	},
	{	id:'belarussian',
		twoLetterISO:'be',
		threeLetterISO:'bel',
		characterSet:'\u0400-\u044f\u0406\u0456\u045e',
		script:'cyrillic',
		direction:'ltr'
	},
	{	id:'bengali',
		twoLetterISO:'bn',
		threeLetterISO:'ben',
		characterSet:'\u0980-\u09ff',
		script:'bengali',
		direction:'ltr'
	},
	{	id:'brahui',
		threeLetterISO:'brh',
		characterSet:'\u0600-\u063a\u0698\u06a9\u06af\u0679\u067e\u0686\u0688\u0691\u06cc\u06d2\u06d3\u06ba\u06be\u06c0\u06c1\u06c2\u06c3\u06f0-\u06f9',
		script:'arabic',
		direction:'rtl'
	},
	{	id:'bulgarian',
		twoLetterISO:'bg',
		threeLetterISO:'bul',
		characterSet:'\u0400-\u044f',
		script:'cyrillic',
		direction:'ltr'
	},
	{	id:'burmese',
		twoLetterISO:'my',
		threeLetterISO:'mya',
		characterSet:'\u1000-\u109f',
		script:'burmese',
		direction:'ltr'
	},
	{	id:'chechen',
		twoLetterISO:'ce',
		threeLetterISO:'che',
		characterSet:'\u0400-\u044fI',
		script:'cyrillic',
		direction:'ltr'
	},
	{	id:'chinese',
		twoLetterISO:'zh',
		threeLetterISO:'zho',
		characterSet:'\u3200-\u9fff\uf900-\ufaff',
		script:'hanji',
		direction:'ltr',
		weight:9,
		variants:['cdo', 'cjy', 'cmn', 'cpx', 'czh', 'czo', 'gan', 'hak', 'hsn', 'mnp', 'nan', 'wuu', 'yue']
	},
	{	id:'croatian',
		twoLetterISO:'hr',
		threeLetterISO:'hrv',
		characterSet:'a-zA-Z\u0161\u0111\u017e\u010d\u0107\u0160\u0110\u017d\u010c\u0106',
		script:'latin',
		direction:'ltr'
	},
	{	id:'czech',
		twoLetterISO:'cs',
		threeLetterISO:'ces',
		characterSet:'a-zA-Z\u011b\u0161\u010d\u0159\u017e\u00fd\u00e1\u00ed\u00e9\u00fa\u016f',
		script:'latin',
		direction:'ltr'
	},
	{	id:'danish',
		twoLetterISO:'da',
		threeLetterISO:'dan',
		characterSet:'a-zA-Z\u00e5\u00e6\u00f8\u00c5\u00c6\u00d8',
		script:'latin',
		direction:'ltr'
	},
	{	id:'dari',
		twoLetterISO:undefined,
		threeLetterISO:'prs',
		characterSet:'\u0600-\u063a\u0698\u06a9\u06af\u067e\u0686\u06cc\u06f0-\u06f9',
		script:'arabic',
		
		
		
		direction:'rtl'
	},
	{	id:'dinka',
		twoLetterISO:undefined,
		threeLetterISO:'din',
		characterSet:'a-zA-Z\u014b\u00eb\u00ef\u00f6\u00e4\u025b\u0308\u0263\u0254\u0063\u014a\u00cb\u00cf\u00d6\u00c4\u0190\u0194\u0186\u0043',
		script:'latin',
		direction:'ltr',
		variants:['dip', 'diw', 'dib', 'dks', 'dik']
	},
	{	id:'dutch',
		twoLetterISO:'nl',
		threeLetterISO:'nld',
		characterSet:'a-zA-Z',
		script:'latin',
		direction:'ltr'
	},
	{	id:'estonian',
		twoLetterISO:'es',
		threeLetterISO:'est',
		characterSet:'a-zA-Z\u00fc\u00f5\u00f6\u00e4\u00dc\u00d5\u00d6\u00c4\u0161\u017e',
		script:'latin',
		direction:'ltr'
	},
	{	id:'farsi',
		twoLetterISO:'fa',
		threeLetterISO:'fas',
		characterSet:'\u0600-\u063a\u0698\u06a9\u06af\u067e\u0686\u06cc\u06f0-\u06f9',
		script:'arabic',
		direction:'rtl',
		weight:5,
		variants:[ 'prs', 'pes' ]
	},
	{	id:'finnish',
		twoLetterISO:'fi',
		threeLetterISO:'fin',
		characterSet:'a-zA-Z\u00e5\u00f6\u00e4\u00c5\u00d6\u00c4',
		script:'latin',
		direction:'ltr'
	},
	{	id:'french',
		twoLetterISO:'fr',
		threeLetterISO:'fra',
		characterSet:'a-zA-Z\u00e9\u00e8\u00e7\u00e0\u00f9',
		script:'latin',
		direction:'ltr',
		weight:8
	},
	{	id:'georgian',
		twoLetterISO:'ka',
		threeLetterISO:'kat',
		characterSet:'\u10a0-\u10ff',
		script:'georgian',
		direction:'ltr'
	},
	{	id:'german',
		twoLetterISO:'de',
		threeLetterISO:'deu',
		characterSet:'a-zA-Z\u00fc\u00f6\u00e4\u00df\u00dc\u00d6\u00c4',
		script:'latin',
		direction:'ltr'
	},
	{
		id:'greek',
		twoLetterISO:'el',
		threeLetterISO:'ell',
		characterSet:'\u0370-\u03ff',
		script:'greek',
		direction:'ltr'
	},
	{	id:'gujarati',
		twoLetterISO:'gu',
		threeLetterISO:'guj',
		characterSet:'\u0a80-\u0aff',
		script:'gujarati',
		direction:'ltr'
	},
	{	id:'haitian',
		twoLetterISO:'ht',
		threeLetterISO:'hat',
		characterSet:'a-zA-Z\u00e0\u00e8\u00f2',
		script:'latin',
		direction:'ltr'
	},
	{	id:'hassaniyya',
		twoLetterISO:undefined,
		threeLetterISO:'mey',
		characterSet:'\u0600-\u063a',
		script:'arabic',
		direction:'rtl'
	},
	{	id:'hausa',
		twoLetterISO:'ha',
		threeLetterISO:'hau',
		characterSet:'a-zA-Z\u0253\u0257\u0199\u01b4\u0181\u018a\u0198\u01b3',
		script:'latin',
		direction:'ltr'
	},
	{	id:'hebrew',
		twoLetterISO:'he',
		threeLetterISO:'heb',
		characterSet:'\u0590-\u05ff',
		script:'hebrew',
		direction:'rtl'
	},
	{	id:'hindi',
		twoLetterISO:'hi',
		threeLetterISO:'hin',
		characterSet:'\u0900-\u097f',
		script:'devanagari',
		direction:'ltr',
		weight:6
	},
	{	id:'hindko',
		threeLetterISO:'hno',
		characterSet:'\u0600-\u063a\u0698\u06a9\u06af\u0679\u067e\u0686\u0688\u0691\u06cc\u06d2\u06d3\u06ba\u06be\u06c0\u06c1\u06c2\u06c3\u06f0-\u06f9',
	//	characterSet:'\u0600-\u063a',
		script:'arabic',
		direction:'rtl',
		variants:['hnd']
	},
	{	id:'hungarian',
		twoLetterISO:'hu',
		threeLetterISO:'hun',
		characterSet:'a-zA-Z\u00f6\u00fc\u00f3\u0151\u00fa\u0171\u00e9\u00e1\u00d6\u00dc\u00d3\u0150\u00da\u0170\u00c9\u00c1',
		script:'latin',
		direction:'ltr'
	},
	{	id:'igbo',
		twoLetterISO:'ig',
		threeLetterISO:'ibo',
		characterSet:'a-zA-Z\u1ee5\u1ecb\u1ecd\u1ee4\u1eca\u1ecc\u0300\u0301\u0304',
		script:'latin',
		direction:'ltr'
	},
	{	id:'iraqi',
		twoLetterISO:undefined,
		threeLetterISO:'acm',
		characterSet:'\u0600-\u063a',
		script:'arabic',
		direction:'rtl'
	},
	{	id:'italian',
		twoLetterISO:'it',
		threeLetterISO:'ita',
		characterSet:'a-zA-Z\u00e0\u00e8\u00ec\u00f2\u00f9',
		script:'latin',
		direction:'ltr'
	},
	{	id:'japanese',
		twoLetterISO:'ja',
		threeLetterISO:'jpn',
		characterSet:'\u3040-\u309f\u30a0-\u30ff\u3200-\u9fff\uf900-\ufaff',
		script:'kana',
		direction:'ltr'
	},
	{	id:'kashmiri',
		twoLetterISO:'ks',
		threeLetterISO:'kas',
		characterSet:'\u0600-\u063a\u06c4\u0672\u0673\u06f0-\u06f9',
		script:'arabic',
		direction:'rtl'
	},
	{	id:'kazakh',
		twoLetterISO:'kk',
		threeLetterISO:'kaz',
		characterSet:'\u0400-\u044f\u04d9\u0456\u04a3\u0493\u04af\u04b1\u049b\u04e9\u04bb\u04d8\u0406\u04a2\u0492\u04ae\u04b0\u049a\u04e8\u04ba',
		script:'cyrillic',
		direction:'ltr'
	},
	{	id:'korean',
		twoLetterISO:'ko',
		threeLetterISO:'kor',
		characterSet:'\u1100-\u11ff\uac00-\ud7af\u3200-\u9fff\uf900-\ufaff',
		script:'hangul',
		direction:'ltr'
	},
	{	id:'kurdish',
		twoLetterISO:'ku',
		threeLetterISO:'kur',
		characterSet:'',
		script:'',
		direction:'',
		variants:['ckb', 'kmr', 'sdh']
	},
	{	id:'kurmanji',
		threeLetterISO:'kmr',
		characterSet:'a-zA-Z\u00fb\u015f\u00ee\u00ea\u00e7\u00e9\u00db\u015e\u00ce\u00ca\u00c7',
		script:'latin',
		direction:'ltr'
	},
	{	id:'kyrgyz',
		twoLetterISO:'ky',
		threeLetterISO:'kir',
		characterSet:'\u0400-\u044f\u04e8\u04e9\u04a2\u04a3\u04ae\u04af',
		script:'cyrillic',
		direction:'ltr'
	},
	{	id:'latvian',
		twoLetterISO:'lv',
		threeLetterISO:'lav',
		characterSet:'a-zA-Z\u016b\u0113\u010d\u017e\u0137\u0161\u0146\u012b\u0101\u013c\u016a\u0112\u010c\u017d\u0136\u0160\u0145\u012a\u0100\u013b',
		script:'latin',
		direction:'ltr'
	},
	{	id:'lithuanian',
		twoLetterISO:'lt',
		threeLetterISO:'lit',
		characterSet:'a-zA-Z\u0105\u010d\u0119\u0117\u012f\u0161\u0173\u016b\u017e\u0104\u010c\u0118\u0116\u012e\u0160\u0172\u016a\u017d',
		script:'latin',
		direction:'ltr'
	},
	{	id:'lao',
		twoLetterISO:'lo',
		threeLetterISO:'lao',
		characterSet:'\u0e80-\u0eff',
		script:'lao',
		direction:'ltr'
	},
	{	id:'macedonian',
		twoLetterISO:'mk',
		threeLetterISO:'mkd',
		characterSet:'\u0400-\u044f\u0453\u045c\u045f\u0403\u040c\u040f',
		script:'cyrillic',
		direction:'ltr'
	},
	{	id:'maguindanao',
		threeLetterISO:'mdh',
		characterSet:'a-zA-Z',
		script:'latin',
		direction:'ltr'
	},
	{	id:'maranao',
		threeLetterISO:'mrw',
		characterSet:'a-zA-Z',
		script:'latin',
		direction:'ltr'
	},
	{	id:'norwegian',
		twoLetterISO:'no',
		threeLetterISO:'nor',
		characterSet:'a-zA-Z\u00e5\u00f8\u00e6\u00c5\u00d8\u00c6',
		script:'latin',
		direction:'ltr',
		variants:['nob', 'nno']
	},
	{	id:'pashto',
		twoLetterISO:'ps',
		threeLetterISO:'pus',
		characterSet:'\u0600-\u063a\u0696\u069a\u06ab\u067c\u0681\u0685\u0689\u0693\u06cd\u06d0\u06bc\u0646\u0647\u0641\u0648\u0644\u06a9\u06cc\u0686\u0698\u064a\u067e\u0645\u06af\u0642',
		script:'arabic',
		direction:'rtl',
		variants:['pst', 'pbu', 'pbt']
	},
	{	id:'potwari',
		threeLetterISO:'phr',
		characterSet:'\u0600-\u063a\u0696\u069a\u06ab\u067c\u0681\u0685\u0689\u0693\u06cd\u06d0\u06bc\u0646\u0647\u0641\u0648\u0644\u06a9\u06cc\u0686\u0698\u064a\u067e\u0645\u06af\u0642',
		script:'arabic',
		direction:'rtl',
		variants:['pst', 'pbu', 'pbt']
	},  
	{	id:'polish',
		twoLetterISO:'pl',
		threeLetterISO:'pol',
		characterSet:'a-zA-Z\u0119\u00f3\u0105\u015b\u0142\u017c\u017a\u0107\u0144\u0118\u00d3\u0104\u015a\u0141\u017b\u0179\u0106\u0143',
		script:'latin',
		direction:'ltr'
	},
	{	id:'epunjabi',
		twoLetterISO:'pa',
		threeLetterISO:'pan',
		characterSet:'\u0a00-\u0a7f',
		script:'gurmukhi',
		direction:'ltr',
		weight:2
	},
	{	id:'wpunjabi',
		twoLetterISO:'pa',
		threeLetterISO:'pnb',
		characterSet:'\u0600-\u063a\u0698\u06a9\u06af\u0679\u067e\u0686\u0688\u0691\u06cc\u06d2\u06d3\u06ba\u06be\u06c0\u06c1\u06c2\u06c3\u06f0-\u06f9',
		script:'arabic',
		direction:'rtl'
	},
	{	id:'portugese',
		twoLetterISO:'pt',
		threeLetterISO:'por',
		characterSet:'a-zA-Z\u00e1\u00e2\u00e3\u00e0\u00e7\u00e9\u00ea\u00ed\u00f3\u00f4\u00f5\u00fa\u00c1\u00c2\u00c3\u00c0\u00c7\u00c9\u00ca\u00cd\u00d3\u00d4\u00d5\u00da',
		script:'latin',
		direction:'ltr'
	},
	{	id:'quechua',
		twoLetterISO:'qu',
		threeLetterISO:'que',
		characterSet:'a-zA-Z\u00e1\u00e9\u00ed\u00f3\u00fa\u00fc\u00f1\u00c1\u00c9\u00cd\u00d3\u00da\u00dc\u00d1',
		script:'latin',
		direction:'ltr'
	},
	{	id:'romanian',
		twoLetterISO:'ro',
		threeLetterISO:'ron',
		characterSet:'a-zA-Z\u0103\u00ee\u00e2\u0219\u021b\u0102\u00ce\u00c2\u0218\u021a',
		script:'latin',
		direction:'ltr'
	},
	{	id:'russian',
		twoLetterISO:'ru',
		threeLetterISO:'rus',
		characterSet:'\u0410-\u044f',
		script:'cyrillic',
		direction:'ltr',
		weight:8
	},
	{	id:'sama',
		threeLetterISO:'ssb',
		characterSet:'a-zA-Z',
		script:'latin',
		direction:'ltr',
		variants:['sml', 'slm']
	},
	{	id:'serbian',
		twoLetterISO:'sr',
		threeLetterISO:'srp',
		characterSet:'\u0410-\u044f\u0452\u0458\u0459\u045a\u045b\u045f',
		script:'cyrillic',
		direction:'ltr'
	},
	{	id:'sindhi',
		twoLetterISO:'sd',
		threeLetterISO:'snd',
		characterSet:'\u0600-\u063a',
		script:'arabic',
		direction:'rtl'
	},	
	{	id:'siraiki',
		threeLetterISO:'skr',
		characterSet:'\u0600-\u063a\u0698\u06a9\u06af\u0679\u067e\u0686\u0688\u0691\u06cc\u06d2\u06d3\u06ba\u06be\u06c0\u06c1\u06c2\u06c3\u06b0\u06f0-\u06f9',
		script:'arabic',
		direction:'rtl'
	},
	{	id:'slovene',
		twoLetterISO:'sl',
		threeLetterISO:'slv',
		characterSet:'a-zA-Z',
		script:'latin',
		direction:'ltr'
	},
	{	id:'slovak',
		twoLetterISO:'sk',
		threeLetterISO:'slk',
		characterSet:'a-zA-Z\u013e\u0161\u010d\u0165\u017e\u00fd\u00e1\u00ed\u00e9\u00fa\u00e4\u0148\u00f4',
		script:'latin',
		direction:'ltr'
	},
	{	id:'sorani',
		threeLetterISO:'ckb',
		characterSet:'\u0600-\u063a\u06ce\u06b5\u06b6\u06b7\u06c6\u06ca\u0695\u06a4\u0692\u0694',
		script:'arabic',
		direction:'rtl'
	},
	{	id:'spanish',
		twoLetterISO:'es',
		threeLetterISO:'spa',
		characterSet:'a-zA-Z\u00e1\u00e9\u00ed\u00f3\u00fa\u00fc\u00f1\u00c1\u00c9\u00cd\u00d3\u00da\u00dc\u00d1',
		script:'latin',
		direction:'ltr',
		weight: 7
	},
	{	id:'sudanese',
		twoLetterISO:undefined,
		threeLetterISO:'apd',
		characterSet:'\u0600-\u063a',
		script:'arabic',
		direction:'rtl'
	},
	{	id:'swahili',
		twoLetterISO:'sw',
		threeLetterISO:'swa',
		characterSet:'a-zA-Z',
		script:'latin',
		direction:'ltr',
		variants:['swc', 'swh']
	},
	{	id:'swedish',
		twoLetterISO:'sv',
		threeLetterISO:'swe',
		characterSet:'a-zA-Z\u00e5\u00f6\u00e4\u00c5\u00d6\u00c4',
		script:'latin',
		direction:'ltr'
	},
	{	id:'tagalog',
		twoLetterISO:'tl',
		threeLetterISO:'tgl',
		characterSet:'a-zA-Z',
		script:'latin',
		direction:'ltr'
	},
	{	id:'tajik',
		twoLetterISO:'tg',
		threeLetterISO:'tgk',
		characterSet:'\u0400-\u044f\u0493\u04ef\u049b\u04b3\u04b7\u04e3\u0492\u04ee\u049a\u04b2\u04b6\u04e2',
		script:'cyrillic',
		direction:'ltr'
	},
	{	id:'thai',
		twoLetterISO:'th',
		threeLetterISO:'tha',
		characterSet:'\u0e00-\u0e7f',
		script:'thai',
		direction:'ltr'
	},
	{	id:'tigrinya',
		twoLetterISO:'ti',
		threeLetterISO:'tir',
		characterSet:'\u1200-\u137f',
		script:'geez',
		direction:'ltr'
	},
	{	id:'turkish',
		twoLetterISO:'tr',
		threeLetterISO:'tur',
		characterSet:'a-zA-Z\u00e9\u011f\u00fc\u015f\u00f6\u00e7\u011f\u00fc\u015f\u00e7',
		script:'latin',
		direction:'ltr'
	},
	{	id:'turkmen',
		twoLetterISO:'tk',
		threeLetterISO:'tuk',
		characterSet:'a-zA-Z\u00fd\u00e4\u00fc\u00f6\u017e\u0148\u015f\u00e7\u00dd\u00c4\u00dc\u00d6\u017d\u0147\u015e\u00c7',
		script:'latin',
		direction:'ltr'
	},
	{	id:'ukrainian',
		twoLetterISO:'uk',
		threeLetterISO:'ukr',
		characterSet:'\u0400-\u044f\u0454\u0404\u0406\u0491\u0456\u0457',
		script:'cyrillic',
		direction:'ltr'
	},
	{	id:'uzbek',
		twoLetterISO:'uz',
		threeLetterISO:'uzb',
		characterSet:'\u0400-\u044f',
		script:'cyrillic',
		direction:'ltr',
		variants:['uzn', 'uzs']
	},
	{	id:'wolof',
		twoLetterISO:'wo',
		threeLetterISO:'wol',
		characterSet:'a-zA-Z\u014b\u00e0\u0101\u00e9\u00eb\u0113\u012b\u00f3\u014d\u016b\u00f1\u014a\u00c0\u00c9\u00d3\u00cb\u0100\u0112\u012a\u014c\u016a\u00d1',
		script:'latin',
		direction:'ltr'
	},
	{	id:'urdu',
		twoLetterISO:'ur',
		threeLetterISO:'urd',
		characterSet:'\u0600-\u063a\u0698\u06a9\u06af\u0679\u067e\u0686\u0688\u0691\u06cc\u06d2\u06d3\u06ba\u06be\u06c0\u06c1\u06c2\u06c3\u06f0-\u06f9',
		script:'arabic',
		direction:'rtl',
		weight:2
	},
	{	id:'vietnamese',
		twoLetterISO:'vi',
		threeLetterISO:'vie',
		characterSet:'a-zA-Z\u0103\u00e2\u00ea\u00f4\u01a1\u01b0\u0102\u00c2\u00ca\u00d4\u01a0\u01af\u0300\u0301\u0303\u0309\u0323',
		script:'latin',
		direction:'ltr'
	},
	{	id:'yakan',
		threeLetterISO:'yka',
		characterSet:'a-zA-Z',
		script:'latin',
		direction:'ltr'
	},
	{	id:'yoruba',
		twoLetterISO:'yo',
		threeLetterISO:'yor',
		characterSet:'a-zA-Z\u00c0\u00c1\u00c8\u00c9\u00cc\u00cd\u00d2\u00d3\u00d9\u00da\u00e0\u00e1\u00e8\u00e9\u00ec\u00ed\u00f2\u00f3\u00f9\u00fa\u0300\u0301\u0323\u1e62\u1e63\u1eb8\u1eb9\u1ecc\u1ecd',
		script:'latin',
		direction:'ltr'
	}
	]
}
} );