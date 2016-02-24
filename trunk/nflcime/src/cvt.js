/**
 * @docauthor Steve Drucker <sdrucker@figleaf.com>
 *
 * @class CVT
 *
 */

NFLCIME.dispatchEvent( { type:'ModuleAdd', module:
{
	id:'cvt',
	type:'core',
	dependency:['rt'],
	//--- Event handlers
	onModuleActivate:function(evt) {
		var module = evt.module;
		if(module == this) {
			if(!this.active) {
				this.active = true;
				NFLCIME.addEventListener('RichTextPaste', this, true);
				NFLCIME.addEventListener('ServiceApplicable', this, true);
			}
		} else {
			// deactivate this converter if another one is activated
			if(module.type == 'encoding converter') {
				NFLCIME.dispatchEvent( { type:'ModuleDeactivate', module:this } );
			}
		}
	},
	// Stop handling DOM event when module is deactivated
	onModuleDeactivate:function(evt) {
		var module = evt.module;
		if(module == this) {
			if(this.active) {
				this.active = false;
				NFLCIME.removeEventListener('RichTextPaste', this, true);
				NFLCIME.removeEventListener('ServiceApplicable', this, true);
			}
		}
	},
	onRichTextPaste:function(evt) {
		var edit = evt.target;
		var segments = evt.textSegments;
		if(this.isServiceApplicable(edit)) {
			for(var i = 0; i < segments.length; i++) {
				var segment = segments[i];
				// convert the text if it isn't employing a font known to be a real Unicode font
				if(!this.isKnownNonHackFont(segment.style.fontFamily)) {
					this.convertTextSegment(segment);
				}
			}
		}
	},
	onServiceApplicable:function(evt) {
		var service = evt.service;
		var edit = evt.target;
		// if the cvt service is applicable to the edit, the rt service is applicable as well
		// since the conversion process requires handling of rich-text
		if(service == 'rt') {
			evt.applicable = this.isServiceApplicable(edit);
			return true;
		}
	},
	//--- Private functions
	// Attach a closure to a DOM element that sends the events to the named handler
	attachDOMHandler:function(element, eventName, handlerName, capturing) {
		var handler = this[handlerName];
		var closure = this.closures[handlerName];
		if(!closure) {
			var self = this;
			switch(this.browser) {
				case 'ie':
					closure = function(evt) {
						if(!evt.target) {
							evt.target = evt.srcElement;
						}
						evt.returnValue = handler.call(self, evt);
					}
					break;
				case 'firefox':
				case 'safari':
					closure = function(evt) {
						var result = handler.call(self, evt);
						if(result != undefined && result == false) {
							evt.preventDefault();
						}
					}
			}
			this.closures[handlerName] = closure;
		}
		switch(this.browser) {
			case 'ie':
				element.attachEvent('on' + eventName, closure);
				break;
			case 'firefox':
			case 'safari':
				element.addEventListener(eventName, closure, capturing ? true : false);
				break;
		}
	},
	// Detach an earlier attached closure
	detachDOMHandler:function(element, eventName, handlerName, capturing) {
		var closure = this.closures[handlerName];
		if(closure) {
			switch(this.browser) {
				case 'ie':
					element.detachEvent('on' + eventName, closure);
					break;
				case 'firefox':
				case 'safari':
					element.removeEventListener(eventName, closure, capturing ? true : false);
					break;
			}
		}
	},
	// See if the font list contains a known non-hacked font (meaning the glyphs appear as defined in Unicode--hence no conversion is needed)
	isKnownNonHackFont:function(fontList) {
		var fonts = fontList.split(/\s*,\s*/);
		for(var i = 0; i < fonts.length; i++) {
			var font = fonts[i].toLowerCase();
			if(this.isKnownNonHackFonts[font]) {
				return true;
			}
		}
		return false;
	},
	// See if the cvt service is active for edit
	isServiceApplicable:function(edit) {
		var evt = { type:'ServiceApplicable', target:edit, service:'cvt', applicable:false };
		NFLCIME.dispatchEvent(evt);
		return evt.applicable;
	},
	// Apply a mapping table on the given text
	applyMappings:function(mappings, text) {
		var r = text;
		for(var i = 0, l = mappings.length; i < l; i++) {
			var a = mappings[i];
			r = r.replace(a[0], a[1]);
		}
		return r;
	},
	// Convert the text segment using mapping table
	convertTextSegment:function(segment) {
		segment.text = this.applyMappings(this.mappings, segment.text);
		segment.lang = this.lang;
	},
	initialize:function(env, subclassing) {
		this.browser = env.browser;
		if(!subclassing) {
			// create known non-hacked hash
			for(var i = 0; i < this.knownNonHackFonts.length; i++) {
				var name = this.knownNonHackFonts[i].toLowerCase();
				this.isKnownNonHackFonts[name] = true;
			}
		}
		// only actual converters can be activated
		if(this.type == 'encoding converter') {
			NFLCIME.addEventListener('ModuleActivate', this);
			NFLCIME.addEventListener('ModuleDeactivate', this)
		}
	},
	active:false,
	browser:'',
	converter:null,
	converterId:null,
	converterActive:false,
	// fonts shipped with Windows 7 and Office 2007
	knownNonHackFonts: [ "Agency FB", "Aharoni", "Algerian", "Andalus", "Angsana New", "AngsanaUPC", "Aparajita", "Arabic Typesetting", "Arial", "Arial Black", "Arial Narrow", "Arial Rounded MT", "Arial Unicode MS", "Baskerville Old Face", "Batang", "BatangChe", "Bauhaus 93", "Bell MT", "Berlin Sans FB", "Berlin Sans FB Demi", "Bernard MT Condensed", "Blackadder ITC", "Bodoni MT", "Bodoni MT Black", "Bodoni MT Condensed", "Bodoni MT Poster Compressed", "Book Antiqua", "Bookman Old Style", "Bradley Hand ITC", "Britannic", "Broadway", "Browallia New", "BrowalliaUPC", "Brush Script MT", "Calibri", "Californian FB", "Calisto MT", "Cambria", "Cambria & Cambria Math", "Cambria Math", "Candara", "Centaur", "Century", "Century Gothic", "Century Schoolbook", "Chiller", "Colonna MT", "Comic Sans MS", "Consolas", "Constantia", "Cooper Black", "Copperplate Gothic", "Copperplate Gothic Light", "Corbel", "Cordia New", "CordiaUPC", "Courier New", "Curlz MT", "DaunPenh", "David", "DFKai-SB", "DilleniaUPC", "DokChampa", "Dotum", "DotumChe", "Ebrima", "Edwardian Script ITC", "Elephant", "Engraveras", "Eras  ITC", "Eras Demi ITC", "Eras Light ITC", "Eras Medium ITC", "Estrangelo Edessa", "EucrosiaUPC", "Euphemia", "FangSong", "Felix Titling", "Footlight MT Light", "Forte", "Franklin", "Franklin Gothic Book", "Franklin Gothic Demi", "Franklin Gothic Demi Cond", "Franklin Gothic Heavy", "Franklin Gothic Medium", "Franklin Gothic Medium Cond", "FrankRuehl", "FreesiaUPC", "Freestyle Script", "French Script MT", "Gabriola", "Garamond", "Gautami", "Georgia", "Gigi", "Gill Sans MT", "Gill Sans MT Condensed", "Gill Sans MT Ext Condensed", "Gill Sans Ultra", "Gill Sans Ultra  Condensed", "Gisha", "Gloucester MT Extra Condensed", "Gothic Book", "Goudy Old Style", "Goudy Stout", "Gulim", "GulimChe", "Gungsuh", "GungsuhChe", "Haettenschweiler", "Harlow Solid", "Harrington", "High Tower Text", "Impact", "Imprint MT Shadow", "Informal Roman", "IrisUPC", "Iskoola Pota", "JasmineUPC", "Jokerman", "Juice ITC", "KaiTi", "Kalinga", "Kartika", "Khmer UI", "KodchiangUPC", "Kokila", "Kristen ITC", "Kunstler Script", "Lao UI", "Latha", "Leelawadee", "Levenim MT", "LilyUPC", "Lucida Bright", "Lucida Calligraphy", "Lucida Console", "Lucida Fax", "Lucida Handwriting", "Lucida Sans", "Lucida Sans Typewriter", "Lucida Sans Unicode", "Magneto", "Maiandra GD", "Malgun Gothic", "Mangal", "Matura MT Script Capitals", "Meiryo", "Meiryo UI", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Sans Serif", "Microsoft Tai Le", "Microsoft Uighur", "Microsoft YaHei", "Microsoft Yi Baiti", "MingLiU", "MingLiU_HKSCS", "MingLiU_HKSCS-ExtB", "MingLiU-ExtB", "Miriam", "Miriam Fixed", "Mistral", "Modern No. 20", "Mongolian Baiti", "Monotype Corsiva", "MoolBoran", "MS Gothic", "MS Mincho", "MS Outlook", "MS PGothic", "MS PMincho", "MS Reference Sans Serif", "MS Reference Specialty", "MS UI Gothic", "MT Extra", "MV Boli", "Narkisim", "Niagara Engraved", "Niagara Solid", "NSimSun", "Nyala", "OCR A Extended", "Old English Text MT", "Onyx", "Palace Script MT", "Palatino Linotype", "Papyrus", "Parchment", "Perpetua", "Perpetua Titling MT", "Perpetua Titling MT Light", "Plantagenet Cherokee", "Playbill", "PMingLiU", "PMingLiU-ExtB", "Poor Richard", "Pristina", "Raavi", "Rage", "Ravie Rockwell", "Rockwell", "Rockwell Condensed", "Rockwell Extra", "Rod", "Sakkal Majalla", "Script MT", "Segoe Print", "Segoe Script", "Segoe UI", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Shonar Bangla", "Showcard Gothic", "Shruti", "SimHei", "Simplified Arabic", "Simplified Arabic Fixed", "SimSun", "SimSun-ExtB", "Snap ITC", "Stencil", "Sylfaen", "Symbol", "Tahoma", "Tempus Sans ITC", "Times New Roman", "Traditional Arabic", "Trebuchet MS", "Tunga", "Tw Cen MT", "Tw Cen MT Condensed", "Tw Cen MT Condensed Extra", "Utsaah", "Vani", "Verdana", "Vijaya", "Viner Hand ITC", "Vivaldi", "Vladimir Script", "Vrinda", "Webdings", "Wide Latin", "Wingdings", "Wingdings 2", "Wingdings 3" ],
	isKnownNonHackFonts:{}
}
} );