NFLCIME.dispatchEvent( { type:'ModuleAdd', module:
{
	id:'rt',
	type:'core',
	dependency:['cursor'],
	//--- Event handlers
	onModuleActivate:function(evt) {
		var module = evt.module;
		if(module == this && !this.active) {
			this.active = true;
			NFLCIME.addEventListener('FocusChanged', this);
			NFLCIME.addEventListener('RichTextRetrieve', this);
			NFLCIME.addEventListener('RichTextTransfer', this);
			NFLCIME.addEventListener('RichTextRetrieveHTML', this);
			NFLCIME.addEventListener('CursorMoved', this, true);
			var evt = { type:'CursorGetFocusedEdit', target:null };
			NFLCIME.dispatchEvent(evt);
			if(evt.target) {
				this.attachDOMHandler(evt.target, 'paste', 'onPaste');
			}
		}
	},
	onModuleDeactivate:function(evt) {
		var module = evt.module;
		if(module == this && this.active) {
			NFLCIME.removeEventListener('FocusChanged', this);
			NFLCIME.removeEventListener('RichTextRetrieve', this);
			NFLCIME.removeEventListener('RichTextRetrieveHTML', this);
			NFLCIME.removeEventListener('CursorMoved', this, true);
			var evt = { type:'CursorGetFocusedEdit', target:null };
			NFLCIME.dispatchEvent(evt);
			if(evt.target) {
				this.detachDOMHandler(evt.target, 'paste', 'onPaste');
			}
		}
	},
	onRichTextRetrieve:function(evt) {
		var element = evt.target;
		var segments = this.retrieveTextAndStyle(element);
		evt.textSegments.push.apply(evt.textSegments, segments);
		return true;
	},
	onRichTextRetrieveHTML:function(evt) {
		var element = evt.target;
		var segments = this.retrieveTextAndStyle(element);
		if(evt.forPaste) {
			// give other modules the opportunity to alter the text
			NFLCIME.dispatchEvent( { type:'RichTextPaste', target:evt.pasteDestination, textSegments:segments } );
		}
		evt.html = this.getHTMLFromTextSegments(segments);
		return true;
	},
	onCursorMoved:function(evt) {
		// swallow the event when it occurs in the middle of the paste operation
		if(this.isPasting) {
			return false;
		}
	},
	onPaste:function(evt) {
		// find the actual edit
		var edit = this.getFocusedEdit();
		if(edit) {
			if(this.isServiceApplicable(edit)) {
				this.isPasting = true;
				switch(this.browser) {
					case 'ie':
						// attach paste destination
						var doc = edit.ownerDocument;
						var div = this.createPasteDestination(doc);
						document.body.appendChild(div);
						// select it and paste the text into it
						var rng = document.body.createTextRange();
						rng.moveToElementText(div);
						rng.execCommand('paste');
						// this should stop images in the HTML from loading
						div.contentEditable = false;
						div.style.display = 'none';
						this.pasteTrueTarget = edit;
						this.pasteDesination = div;
						this.onPasteComplete();
						return false;
						break;
					case 'firefox':
						if(edit.tagName == 'TEXTAREA' || edit.tagName == 'INPUT') {
							this.selectionBeforePaste = { fromBeginning:edit.selectionStart, fromEnd:edit.value.length - edit.selectionEnd };
							this.pasteTrueTarget = edit;
							this.pasteDesination = edit;
							this.onPasteComplete(true);
						} else {
							var doc = edit.ownerDocument;
							var win = doc.defaultView;
							var selection = win.getSelection();
							var range = selection.getRangeAt(0);
							// delete what's selected first
							range.deleteContents();
							// insert a hidden DIV into the element and select it
							var div = this.createPasteDestination(doc);
							range.insertNode(div);
							range.selectNodeContents(div);
							// grab the contents once Firefox has pasted them into the span
							this.pasteTrueTarget = edit;
							this.pasteDesination = div;
							this.onPasteComplete(true);
						}
						break;
					case 'safari':
						if(edit.tagName == 'TEXTAREA' || edit.tagName == 'INPUT') {
							this.selectionBeforePaste = { fromBeginning:edit.selectionStart, fromEnd:edit.value.length - edit.selectionEnd };
							this.pasteTrueTarget = edit;
							this.pasteDesination = edit;
							this.onPasteComplete(true);
						} else {
							var doc = edit.ownerDocument;
							var win = doc.defaultView;
							var selection = win.getSelection();
							var range = selection.getRangeAt(0);
							// extract the content behind and ahead of cursor
							var range_behind = doc.createRange();
							range_behind.setStart(edit, 0);
							range_behind.setEnd(range.startContainer, range.startOffset);
							this.fragmentBehindCursor = range_behind.extractContents();
							var range_ahead = doc.createRange();
							range_ahead.setStart(range.endContainer, range.endOffset);
							range_ahead.setEnd(edit, edit.childNodes.length);
							this.fragmentAheadOfCursor = range_ahead.extractContents();
							// select the edit (this works, but for some reason it isn't possible to select individual elements inside the edit)
							range.selectNodeContents(edit);
							selection.addRange(range);
							// grab the contents once Safari has pasted them
							this.pasteTrueTarget = edit;
							this.pasteDesination = edit;
							this.onPasteComplete(true);
						}
						break;
				}
			}
		}
	},
	onPasteComplete:function(defer) {
		if(defer) {
			var closure = this.closures['onPasteComplete'];
			if(!closure) {
				var self = this;
				closure = function() { self.onPasteComplete(); };
				this.closures['onPasteComplete'] = closure;
			}
			setTimeout(closure, 0);
			return;
		}
		var edit = this.pasteTrueTarget;
		var dest = this.pasteDesination;
		var doc = edit.ownerDocument;
		var segments;
		if(dest.tagName == 'TEXTAREA' || dest.tagName == 'INPUT') {
			// plain-text for firefox and safari
			var sel = this.selectionBeforePaste;
			var text = edit.value;
			var addition = text.substring(sel.fromBeginning, text.length - sel.fromEnd);
			edit.value = text.substr(0, sel.fromBeginning) + text.substr(text.length - sel.fromEnd);
			edit.setSelectionRange(sel.fromBeginning, sel.fromBeginning);
			segments = [ { lang:'', text:addition, style:{ fontFamily:'', fontSize:'12pt', fontWeight:400, fontStyle:'normal', color:'#000000', backgroundColor:null, textDecoration:'none' } } ];
		} else {
			switch(this.browser) {
				case 'ie':
				case 'firefox':
					if(dest.parentElement != doc.body) {
						// remove the hidden div from the edit and place it into the document
						doc.body.appendChild(dest);
					}
					segments = this.retrieveTextAndStyle(dest);
					// clear it and remove it from document
					doc.body.removeChild(dest);
					dest.innerHTML = '';
					break;
				case 'safari':
					var win = doc.defaultView;
					var selection = win.getSelection();
					var segments = this.retrieveTextAndStyle(edit);
					// clear the contents
					var range = doc.createRange();
					range.setStart(edit, 0);
					range.setEnd(edit, edit.childNodes.length);
					range.deleteContents();
					range.setStart(edit, 0);
					range.setEnd(edit, 0);
					var cursor_node = this.fragmentBehindCursor.lastChild;
					var cursor_offset = 1;
					if(!cursor_node) {
						cursor_node = this.fragmentAheadOfCursor.firstChild;
						cursor_offset = 0;
					}
					range.insertNode(this.fragmentAheadOfCursor);
					range.insertNode(this.fragmentBehindCursor);
					selection.collapse(cursor_node, (cursor_node.nodeType == 3) ? cursor_node.nodeValue.length : 1);
					break;
			}
		}
		// give other modules the opportunity to alter the text
		NFLCIME.dispatchEvent( { type:'RichTextPaste', target:edit, textSegments:segments } );
		// insert the HTML
		var html = this.getHTMLFromTextSegments(segments);
		var plain_text = this.getPlainTextFromTextSegments(segments);
		NFLCIME.dispatchEvent( { type:'CursorInsertHTML', target:edit, text:plain_text, html:html } );
		this.isPasting = false;
	},
	// Attach onpaste handler to active element
	onFocusChanged:function(evt) {
		var edit = evt.target;
		var prev = evt.previousTarget;
		if(prev) {
			this.detachDOMHandler(prev, 'paste', 'onPaste');
		}
		if(edit) {
			// onpaste doesn't bubble up, so we need to attach the handler to the element directly
			this.attachDOMHandler(edit, 'paste', 'onPaste');
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
	// See if the rt service is active on for edit
	isServiceApplicable:function(edit) {
		var evt = { type:'ServiceApplicable', target:edit, service:'rt', applicable:false };
		NFLCIME.dispatchEvent(evt);
		return evt.applicable;
	},
	isSameStyle:function(s1, s2) {
		var style_properties = ['fontFamily', 'fontSize', 'fontWeight', 'fontStyle', 'textDecoration', 'color', 'backgroundColor', 'direction', 'verticalAlign'];
		if(!s2 || !s1) {
			return false;
		}
		if(s1 == s2) {
			return true;
		}
		for(var i = 0; i < style_properties.length; i++) {
			var prop = style_properties[i];
			if(s1[prop] != s2[prop]) {
				return false;
			}
		}
		return true;
	},
	getLegacySizeHash:function(font_name) {
		var legacy_sizes = this.legacyPointSizesHash[font_name];
		if(!legacy_sizes) {
			var legacy_pixel_height = new Array;
			for(var i = 1; i <= 7; i++) {
				var font = document.createElement("FONT");
				font.innerHTML = 'HELLO';
				font.face = font;
				font.size = i;
				font.style.visibility = 'hidden';
				font.style.position = 'absolute';
				document.body.appendChild(font);
				legacy_pixel_height[i] = font.offsetHeight;
				document.body.removeChild(font);
			}
			var css_pixel_height = new Array;
			for(var i = 1; i <= 128; i++) {
				var font = document.createElement("FONT");
				font.innerHTML = 'HELLO';
				font.style.fontFamily = font;
				font.style.fontSize = i + 'pt';
				font.style.visibility = 'hidden';
				font.style.position = 'absolute';
				document.body.appendChild(font);
				css_pixel_height[i] = font.offsetHeight;
				document.body.removeChild(font);
				if(css_pixel_height[i] > legacy_pixel_height[7]) {
					break;
				}
			}
			legacy_sizes = new Array;
			for(var i = 1; i <= 7; i++) {
				var a = legacy_pixel_height[i];
				var p = 8000;
				for(var j = 1; j <= css_pixel_height.length - 1; j++) {
					var b = css_pixel_height[j];
					if(b == a) {
						legacy_sizes[i] = j;
					} else if(b > a) {
						// too large, see if the previous size is closer
						if(Math.abs(a - p) < Math.abs(a - b)) {
							legacy_sizes[i] = j - 1;
							break;
						} else {
							legacy_sizes[i] = j;
							break;
						}
					}
					p = b;
				}
			}
			this.legacyPointSizesHash[font_name] = legacy_sizes;
		}
		return legacy_sizes;
	},
	findLegacySize:function(font, pt_size) {
		var legacy_sizes = this.getLegacySizeHash(font);
		pt_size = parseInt(pt_size);
		for(var i = 1; i <= 7; i++) {
			var a = legacy_sizes[i];
			if(a == pt_size) {
				return i;
			} else if(a > pt_size && i > 1) {
				// no exact match, use something smaller
				return i - 1;
			}
		}
		return 7;
	},
	getLegacyPointSize:function(font, size) {
		var legacy_sizes = this.getLegacySizeHash(font);
		if(size < 1 || size > 7) {
			size = 3;
		}
		return legacy_sizes[size];
	},
	getComputedStyle:function(element) {
		var style = element.currentStyle;
		if(!style) {
			style = getComputedStyle(element, '');
		}
		return style;
	},
	parseFontFamily:function(fontFamily) {
		list = fontFamily.split(/\s*,\s*/);
		var first = list[0];
		return first.replace(/\s*["']\s*(.*)\s*["']\s*/, '$1');
	},
	// Return the closest point size
	parseFontSize:function(size, fontFamily, parentSize) {
		if(/^\d+\s*pt$/.test(size)) {			// point size
			return size;
		}
		if(/^\+?\d+$/.test(size)) {		// old style font size
			return this.getLegacyPointSize(fontFamily, parseInt(size)) + 'pt';
		}
		if(/^\d+\s*%$/.test(size)) {		// percent
			return Math.round(parseFloat(size) / 100 * parseFloat(parentSize), 1) + 'pt';
		}
		if(/^[\d\.]+\s*px$/.test(size)) {		// pixel
			return Math.round(parseFloat(size) * 72 / 96, 1) + 'pt';	// assume 96dpi
		}
		if(/^[\d\.]+\s*em$/.test(size)) {		// em
			return Math.round(parseFloat(size) * 11, 1) + 'pt';
		}
		if(/^[a-z-]+$/.test(size)) {		// a word
			if(size == 'inherit') {
				return parentSize;
			} else {
				var legacy_size;
				switch(size) {
					case 'xx-small': legacy_size = 1; break;
					case 'x-small':legacy_size = 2; break;
					case 'small': legacy_size = 3; break;
					case 'medium':	legacy_size = 4; break;
					case 'large': legacy_size = 5; break;
					case 'x-large': legacy_size = 6; break;
					case 'xx-large': legacy_size = 7; break;
					case 'larger': legacy_size = Math.min(7, this.findLegacySize(parseInt(parentSize)) + 1); break;
					case 'smaller': legacy_size = Math.max(1, this.findLegacySize(parseInt(parentSize)) - 1); break;
				}
				if(legacy_size) {
					this.getLegacyPointSize(fontFamily, legacy_size) + 'pt';
				}
			}
		}
		return parentSize;
	},
	parseColor:function(color, parentColor) {
		if(color.charAt(0) == '#') {
			return color.toUpperCase();
		}
		if(color == 'inherited') {
			return parentColor;
		}
		var match;
		if((match = /RGB\((.+)\)/i.exec(color)) || (match = /RGBA\((.+)\)/i.exec(color))) {
			var list = match[1].split(/\s*,\s*/);
			var r = '#';
			var alpha = parseFloat(list[3]);
			if(isNaN(alpha)) {
				alpha = 1;
			}
			if(alpha == 0) {
				return null;
			}
			for(var i = 0; i < 3; i++) {
				var num;
				if(/^\d+\s*%/.test(list[i])) {
					num = Math.round(parseInt(list[i]) * 255 / 100);
				} else if(/^[\d\.]+$/.test(list[i])) {
					num = Math.min(parseInt(list[i]), 255);
				} else {
					num = 0;
				}
				var hex = num.toString(16);
				while(hex.length < 2) hex = '0' + hex;
				r += hex;
			}
			return r.toUpperCase();
		}
		var predefined = this.htmlColors[color];
		if(predefined) {
			return predefined;
		}
		return null;
	},
	// Take a style object and convert the info into a simplier, more predictable format
	convertStyle:function(element, computedStyle, parentStyle) {
		var style = {};
		style.fontFamily = this.parseFontFamily(computedStyle.fontFamily);
		style.fontSize = this.parseFontSize(computedStyle.fontSize, style.fontFamily, (parentStyle) ? parentStyle.fontSize : '12pt');
		style.fontWeight = (computedStyle.fontWeight == 'bold' || computedStyle.fontWeight > 400) ? 700 : 400;	// firefox gives 401 for bolded text for some reason
		style.fontStyle = computedStyle.fontStyle;
		// don't use the color of an anchor tag, since we're stripping the hyperlink
		if(element.tagName == 'A' && element.href) {
			style.color = parentStyle.color;
		} else {
			style.color = this.parseColor(computedStyle.color);
		}
		if(style.color == '#000000') {
			style.color = null;
		}
		style.backgroundColor = this.parseColor(computedStyle.backgroundColor);
		// if background color is white then assume a transparent background is intended
		if(style.backgroundColor == '#FFFFFF') {
			style.backgroundColor = null;
		}
		style.textDecoration = computedStyle.textDecoration;
		if(style.textDecoration == 'none' && parentStyle) {
			// if the parent is has a decoration, it obviously would appear on the child nodes too
			style.textDecoration = parentStyle.textDecoration;
		}
		style.direction = computedStyle.direction;
		style.verticalAlign = computedStyle.verticalAlign;
		return style;
	},
	retrieveTextAndStyle:function(div) {
		var computed_style = this.getComputedStyle(div);
		var default_style = this.convertStyle(div, computed_style);
		var default_lang = '';
		var segments = this.retrieveTextAndStyleRecursive(div, default_style, default_lang);
		// merge adjacent segments with the style
		var result = [];
		var current_style = null;
		var current_segment = null;
		var current_lang = null;
		for(var i = 0, l = segments.length; i < l; i++) {
			var segment = segments[i];
			if(!this.isSameStyle(segment.style, current_style) || segment.lang != current_lang) {
				if(current_segment) {
					result.push({style:current_style, text:current_segment, lang:current_lang});
				}
				current_style = segment.style;
				current_segment = segment.text;
				current_lang = segment.lang;
			}
			else {
				current_segment += segment.text;
			}
		}
		if(current_segment) {
			result.push({style:current_style, text:current_segment, lang:current_lang});
		}
		return result;
	},
	retrieveTextAndStyleRecursive:function(element, elementStyle, elementLang, acceptLeadingWS) {
		var segments = [];
		// deal with special tags
		switch(element.tagName) {
			case 'BR':
				segments.push({style:elementStyle, text:'\n', lang:elementLang});
				break;
		}
		switch(this.browser) {
			case 'ie':
				if(element.canHaveChildren) {
					var children = element.children;
					var children_count = children.length;
					// process text ahead of first element
					var text = element.getAdjacentText('afterBegin');
					if(text) segments.push({style:elementStyle, text:text, lang:elementLang});
					var prev_is_blocking = false;
					for(var i = 0; i < children_count; i++) {
						// process element
						var child = children[i];
						var computed_style = this.getComputedStyle(child);
						if(computed_style.display != 'none') {
							var child_style = this.convertStyle(child, computed_style, elementStyle);
							var child_is_blocking = (computed_style.display == 'block');
							var child_lang = child.lang;
							if(!child_lang) {
								child_lang = child.getAttribute('mso-ansi-language');
							}
							if(child_lang) {
								child_lang = child_lang.toLowerCase();
							} else {
							 	child_lang = elementLang;
							}
							var child_segments = this.retrieveTextAndStyleRecursive(child, child_style, child_lang);
							if(child_segments.length > 0) {
								if(prev_is_blocking || child_is_blocking) {
									segments.push({style:child_style, text:'\n', lang:child_lang});
								}
								segments = segments.concat(child_segments);
							}
							prev_is_blocking = child_is_blocking;
						}
						// process text following element
						var text = child.getAdjacentText('afterEnd');
						if(text) segments.push({style:elementStyle, text:text, lang:elementLang});
					}
				}
				break;
			case 'firefox':
			case 'safari':
				var prev_is_blocking = false;
				for(var child = element.firstChild; child; child = child.nextSibling) {
					if(child.nodeType == 1) {
						var computed_style = this.getComputedStyle(child);
						if(computed_style.display != 'none') {
							var child_style = this.convertStyle(child, computed_style, elementStyle);
							var child_is_blocking = (computed_style.display == 'block');
							var child_lang = (child.lang) ? child.lang.toLowerCase() : elementLang;
							var child_segments = this.retrieveTextAndStyleRecursive(child, child_style, child_lang, !child_is_blocking);
							if(child_segments.length > 0) {
								if(prev_is_blocking || (child_is_blocking && segments.length > 0)) {
									segments.push({style:child_style, text:'\n', lang:child_lang});
								}
								segments.push.apply(segments, child_segments);
							}
							prev_is_blocking = child_is_blocking;
						}
					} else if(child.nodeType == 3) {
						var text = child.nodeValue;
						if(!acceptLeadingWS && segments.length == 0) {
							// trim leading white spaces
							text = text.replace(/^\s+/, '');
						}
						text = text.replace(/[\r\n\s]+/g, ' ');
						if(text) segments.push({style:elementStyle, text:text, lang:elementLang});
						prev_is_blocking = false;
					}
				}
				break;
		}
		return segments;
	},
	addTextSegments:function(container, segments) {
		var p_tag = null;
		for(var i = 0; i < segments.length; i++) {
			var seg = segments[i];
			var paragraphs = seg.text.split('\n');
			for(var j = 0; j < paragraphs.length; j++) {
				var text = paragraphs[j];
				if(!p_tag || j > 0) {
					p_tag = document.createElement("P");
					if(seg.style.direction) {
						p_tag.style.direction = seg.style.direction;
					}
					container.appendChild(p_tag);
				}
				if(text.length > 0) {
					var chain = [];
					var tag = document.createElement("SPAN");
					if(seg.style) {
						if(seg.style.textDecoration == 'underline') {
							chain.push(document.createElement("U"));
						} else if(seg.style.textDecoration == 'line-through') {
							chain.push(document.createElement("S"));
						}
						if(seg.style.fontStyle == 'italic') {
							chain.push(document.createElement("EM"));
						}
						if(seg.style.fontWeight >= 700) {
							chain.push(document.createElement("STRONG"));
						}
						if(seg.style.verticalAlign == 'super') {
							chain.push(document.createElement("SUP"));							
						} else if(seg.style.verticalAlign == 'sub') {
							chain.push(document.createElement("SUB"));							
						}
					}
					var tag = document.createElement("SPAN");
					if(seg.style) {
						if(seg.style.fontFamily) {
							tag.style.fontFamily = seg.style.fontFamily;
						}
						if(seg.style.fontSize) {
							tag.style.fontSize = seg.style.fontSize;
						}
						if(seg.style.color) {
							tag.style.color = seg.style.color;
						}
						if(seg.style.backgroundColor) {
							tag.style.backgroundColor = seg.style.backgroundColor;
						}
					}
					if(seg.className) {
						tag.className = seg.className;
					}
					if(seg.lang) {
						tag.lang = seg.lang;
					}
					chain.push(tag);
					var last = chain[chain.length - 1];
					switch(this.browser) {
						case 'ie':
							last.innerText = text;
							break;
						case 'firefox':
						case 'safari':
							last.textContent = text;
							break;
					}
					for(var m = chain.length - 1, n = m - 1; n >= 0; m--, n--) {
						chain[n].appendChild(chain[m]);
					}
					p_tag.appendChild(chain[0]);
				}
			}
		}
	},
	getHTMLFromTextSegments:function(segments) {
		var container = document.createElement("DIV");
		this.addTextSegments(container, segments)
		return container.innerHTML;
	},
	getPlainTextFromTextSegments:function(segments) {
		var strings = [];
		for(var i = 0; i < segments.length; i++) {
			var segment = segments[i];
			strings.push(segment.text);
		}
		return strings.join('');
	},
	getFocusedEdit:function() {
		var evt = { type:'CursorGetFocusedEdit', target:null };
		NFLCIME.dispatchEvent(evt);
		return evt.target;
	},
	createPasteDestination:function(doc) {
		var div = null;
		switch(this.browser) {
			case 'ie':
				var div = doc.createElement('DIV');
				div.contentEditable = true;
				div.style.position = 'absolute';
				div.style.height = '1px';
				div.style.width = '1px';
				div.style.right = '0px';
				div.style.top = '0px';
				div.style.border = '0px'
				div.style.overflow = 'scroll';
				div.style.whiteSpace = 'nowrap';
				return div;
				break;
			case 'firefox':
				div = doc.createElement('DIV');
				div.style.display = 'none';
				div.style.height = '1em';
				return div;
				break;
		}
		return div;
	},
	removePasteDestination:function() {
		if(this.pasteDestination) {
			document.body.removeChild(this.pasteDestination);
			this.pasteDestination = null;
		}
	},
	initialize:function(env) {
		this.browser = env.browser;
		this.closures = {};
		NFLCIME.addEventListener('ModuleActivate', this);
		NFLCIME.addEventListener('ModuleDeactivate', this);
	},
	//--- Private variables
	active:false,
	browser:'',
	pasteDestination:null,
	pasteTrueTarget:null,
	selectionBeforePaste:null,
	fragmentBehindCursor:null,
	fragmentAheadOfCursor:null,
	isPasting:false,
	legacyPointSizesHash:{},
	htmlColors:{
		aliceblue:'#f0f8ff',
		antiquewhite:'#faebd7',
		aqua:'#00ffff',
		aquamarine:'#7fffd4',
		azure:'#f0ffff',
		beige:'#f5f5dc',
		bisque:'#ffe4c4',
		black:'#000000',
		blanchedalmond:'#ffebcd',
		blue:'#0000ff',
		blueviolet:'#8a2be2',
		brown:'#a52a2a',
		burlywood:'#deb887',
		cadetblue:'#5f9ea0',
		chartreuse:'#7fff00',
		chocolate:'#d2691e',
		coral:'#ff7f50',
		cornflowerblue:'#6495ed',
		cornsilk:'#fff8dc',
		crimson:'#dc143c',
		cyan:'#00ffff',
		darkblue:'#00008b',
		darkcyan:'#008b8b',
		darkgoldenrod:'#b8860b',
		darkgray:'#a9a9a9',
		darkgrey:'#a9a9a9',
		darkgreen:'#006400',
		darkkhaki:'#bdb76b',
		darkmagenta:'#8b008b',
		darkolivegreen:'#556b2f',
		darkorange:'#ff8c00',
		darkorchid:'#9932cc',
		darkred:'#8b0000',
		darksalmon:'#e9967a',
		darkseagreen:'#8fbc8f',
		darkslateblue:'#483d8b',
		darkslategray:'#2f4f4f',
		darkslategrey:'#2f4f4f',
		darkturquoise:'#00ced1',
		darkviolet:'#9400d3',
		deeppink:'#ff1493',
		deepskyblue:'#00bfff',
		dimgray:'#696969',
		dimgrey:'#696969',
		dodgerblue:'#1e90ff',
		firebrick:'#b22222',
		floralwhite:'#fffaf0',
		forestgreen:'#228b22',
		fuchsia:'#ff00ff',
		gainsboro:'#dcdcdc',
		ghostwhite:'#f8f8ff',
		gold:'#ffd700',
		goldenrod:'#daa520',
		gray:'#808080',
		grey:'#808080',
		green:'#008000',
		greenyellow:'#adff2f',
		honeydew:'#f0fff0',
		hotpink:'#ff69b4',
		indianred:'#cd5c5c',
		indigo:'#4b0082',
		ivory:'#fffff0',
		khaki:'#f0e68c',
		lavender:'#e6e6fa',
		lavenderblush:'#fff0f5',
		lawngreen:'#7cfc00',
		lemonchiffon:'#fffacd',
		lightblue:'#add8e6',
		lightcoral:'#f08080',
		lightcyan:'#e0ffff',
		lightgoldenrodyellow:'#fafad2',
		lightgray:'#d3d3d3',
		lightgrey:'#d3d3d3',
		lightgreen:'#90ee90',
		lightpink:'#ffb6c1',
		lightsalmon:'#ffa07a',
		lightseagreen:'#20b2aa',
		lightskyblue:'#87cefa',
		lightslategray:'#778899',
		lightslategrey:'#778899',
		lightsteelblue:'#b0c4de',
		lightyellow:'#ffffe0',
		lime:'#00ff00',
		limegreen:'#32cd32',
		linen:'#faf0e6',
		magenta:'#ff00ff',
		maroon:'#800000',
		mediumaquamarine:'#66cdaa',
		mediumblue:'#0000cd',
		mediumorchid:'#ba55d3',
		mediumpurple:'#9370d8',
		mediumseagreen:'#3cb371',
		mediumslateblue:'#7b68ee',
		mediumspringgreen:'#00fa9a',
		mediumturquoise:'#48d1cc',
		mediumvioletred:'#c71585',
		midnightblue:'#191970',
		mintcream:'#f5fffa',
		mistyrose:'#ffe4e1',
		moccasin:'#ffe4b5',
		navajowhite:'#ffdead',
		navy:'#000080',
		oldlace:'#fdf5e6',
		olive:'#808000',
		olivedrab:'#6b8e23',
		orange:'#ffa500',
		orangered:'#ff4500',
		orchid:'#da70d6',
		palegoldenrod:'#eee8aa',
		palegreen:'#98fb98',
		paleturquoise:'#afeeee',
		palevioletred:'#d87093',
		papayawhip:'#ffefd5',
		peachpuff:'#ffdab9',
		peru:'#cd853f',
		pink:'#ffc0cb',
		plum:'#dda0dd',
		powderblue:'#b0e0e6',
		purple:'#800080',
		red:'#ff0000',
		rosybrown:'#bc8f8f',
		royalblue:'#4169e1',
		saddlebrown:'#8b4513',
		salmon:'#fa8072',
		sandybrown:'#f4a460',
		seagreen:'#2e8b57',
		seashell:'#fff5ee',
		sienna:'#a0522d',
		silver:'#c0c0c0',
		skyblue:'#87ceeb',
		slateblue:'#6a5acd',
		slategray:'#708090',
		slategrey:'#708090',
		snow:'#fffafa',
		springgreen:'#00ff7f',
		steelblue:'#4682b4',
		tan:'#d2b48c',
		teal:'#008080',
		thistle:'#d8bfd8',
		tomato:'#ff6347',
		turquoise:'#40e0d0',
		violet:'#ee82ee',
		wheat:'#f5deb3',
		white:'#ffffff',
		whitesmoke:'#f5f5f5',
		yellow:'#ffff00',
		yellowgreen:'#9acd32'
	}
}
} );