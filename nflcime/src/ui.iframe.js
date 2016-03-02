NFLCIME.dispatchEvent( { type:'ModuleAdd', module:
{
	id:'ui.iframe.base',
	type:'iframe',
	//--- Event handlers
	onModuleActivate:function(evt) {
		var module = evt.module;
		if(module == this) {
			this.stopAnimation();
			if(this.url != this.urlLoaded) {
				if(document.body) {
					this.loadPage();
				} else {
					this.attachDOMHandler(window, 'load', 'loadPage');
				}
			} else {
				// just make sure the iFrame is visible
				this.show();
			}
		}
	},
	onModuleDeactivate:function(evt) {
		var module = evt.module;
		if(module == this) {
			if(this.iFrame) {
				if(evt.animation) {
					this.startAnimation(evt.animation);
				} else {
					this.hide();
				}
			} else {
				if(!document.body) {
					this.detachDOMHandler(window, 'load', 'loadPage');
				}
			}
		}
	},
	onMouseMove:function(evt) {
		var pos = this.getEventPosition(evt);
		if(this.dragAction == 'move') {
			this.moveBy(pos.x - this.dragActionMousePosition.x, pos.y - this.dragActionMousePosition.y);
		} else if(this.dragAction == 'resize') {
			this.resizeBy(pos.x - this.dragActionMousePosition.x, pos.y - this.dragActionMousePosition.y, this.dragActionParameters);
		}
	},
	onMouseDown:function(evt) {
		this.bringToTop();
	},
	onFocus:function(evt) {
		this.bringToTop();
	},
	onMouseUp:function(evt) {
		this.stopDragAction();
	},
	onLoseCapture:function(evt) {
		this.stopDragAction();
	},
	onLoad:function(evt) {
		this.iFrameWindow = this.getIFrameWindow(this.iFrame);
		var self = this;
		this.iFrameWindow.NFLCIME = NFLCIME;
		this.iFrameWindow.module = this;
		this.iFrameWindow.show = function() { self.show() };
		this.iFrameWindow.hide = function() { self.hide() };
		this.iFrameWindow.bringToTop = function() { self.bringToTop() };
		this.iFrameWindow.applyLayout = function(options) { self.applyLayout(options) };
		this.iFrameWindow.startMoving = function(evt) { self.startMoving(evt) };
		this.iFrameWindow.startResizing = function(sides, evt) { self.startResizing(sides, evt) };
		this.adjustDimension();		
		this.show();
		if(this.iFrameWindow.initialize) {
			this.iFrameWindow.initialize(this.environment);
		}
		this.attachDOMHandler(this.iFrameWindow, 'focus', 'onFocus');
		this.attachDOMHandler(this.iFrameWindow, 'mousedown', 'onMouseDown');
		this.attachDOMHandler(this.iFrameWindow, 'unload', 'onUnload');
		NFLCIME.dispatchEvent( { type:'WindowListen', target:this.iFrameWindow } );
	},
	onUnload:function(evt) {
		if(this.iFrameWindow.shutdown) {
			this.iFrameWindow.shutdown();
		}
			NFLCIME.dispatchEvent( { type:'WindowIgnore', target:this.iFrameWindow } );
		this.iFrameWindow = null;
	
	},
	onUnloadRemoveIframes:function(evt) {
		for(var i = 0; i < this.allIFrames.length; i++) {
			var iframe = this.allIFrames[i];
			var win = this.getIFrameWindow(iframe);
			if(win.shutdown) {
				win.shutdown();
			}
		}
		for(var i = 0; i < this.allIFrames.length; i++) {
			document.body.removeChild(this.allIFrames[i]);
		}
		this.allIFrames = [];
	},
	//--- Private functions
	// Merge default options with saved data
	mergeOptions:function(defaultOptions) {
		var options = {
			fixed:true,
			x:0,
			y:0,
			hAlign:'left',
			vAlign:'top',
			width:'default',
			height:'default',
			minWidth:50,
			minHeight:50,
			collapsed:false
		};
		var name;
		for(name in options) {
			var evt = { type:'PersistenceGetValue', id:this.id, name:name, value:undefined }
			NFLCIME.dispatchEvent(evt);
			if(evt.value != undefined) {
				var type = typeof(options[name]);
				var value = evt.value;
				switch(type) {
					case 'boolean': value = (value == 'true'); break;
					case 'number': value = parseFloat(value); break;
				}
				options[name] = value;
			} else {
				if(defaultOptions) {
					var default_value = defaultOptions[name];
					if(default_value != undefined) {
						options[name] = default_value;
					}
				}
			}
		}
		return options;
	},
	loadPage:function() {
		if(!this.iFrame) {
			var options = this.mergeOptions(this.options);
			this.addToParent(options);
		}
		this.urlLoaded = this.url;
		if(this.iFrameWindow) {
			this.iFrameWindow.location.replace(this.url);
		} else {
			this.iFrame.src = this.url;
		}
	},
	// Create an iframe
	addToParent:function(options) {
		// keep the iframe hidden initially
		this.iFrame = document.createElement('IFRAME');
		this.iFrame.id = this.id;
		this.iFrame.name = this.id;
		this.iFrame.style.visibility = 'hidden';
		this.iFrame.style.width = '50px';
		this.iFrame.style.height = '50px';
		this.iFrame.style.border = '0px';
		this.iFrame.style.zIndex = this.zIndexStart + this.allIFrames.length;
		this.iFrame.allowTransparency = true;
		this.iFrame.setAttribute('unselectable', 'on');
		this.applyLayout(options);
		document.body.appendChild(this.iFrame);
		this.attachDOMHandler(this.iFrame, 'load', 'onLoad');
		this.allIFrames.push(this.iFrame);
	},
	// Show the iframe
	show:function() {
		this.stopAnimation();
		this.setOpacity(100);
	},
	// Hide the iframe
	hide:function() {
		this.setOpacity(0);
	},
	// Bring an iframe to the top
	bringToTop:function() {
		for(var i = 0; i < this.allIFrames.length; i++) {
			if(this.allIFrames[i] == this.iFrame) {
				this.allIFrames.splice(i, 1);
				this.allIFrames.push(this.iFrame);
				break;
			}
		}
		for(var i = 0, z = this.zIndexStart; i < this.allIFrames.length; i++, z++) {
			this.allIFrames[i].style.zIndex = z;
		}
	},
	startMoving:function(evt) {
		this.startDragAction('move', null, evt);
	},
	startResizing:function(sides, evt) {
		if(!this.collapsed) {
			this.startDragAction('resize', sides, evt);
		}
	},
	// Start dragging or resizing an iframe
	startDragAction:function(action, parameters, evt) {
		if(this.dragAction) {
			this.stopDragAction();
		}
		this.bringToTop();
		this.dragAction = action;
		this.dragActionParameters = parameters;
		this.dragActionMousePosition = this.getEventPosition(evt);
		this.attachDOMHandler(this.iFrameWindow.document, 'mousemove', 'onMouseMove');
		this.attachDOMHandler(this.iFrameWindow.document, 'mouseup', 'onMouseUp');
		this.attachDOMHandler(this.iFrameWindow.document.body, 'losecapture', 'onLoseCapture');
		this.setMouseCapture();
	},
	// Stop previously initiated action
	stopDragAction:function() {
		if(this.dragAction) {
			this.detachDOMHandler(this.iFrameWindow.document, 'mousemove', 'onMouseMove');
			this.detachDOMHandler(this.iFrameWindow.document, 'mouseup', 'onMouseUp');
			this.detachDOMHandler(this.iFrameWindow.document.body, 'losecapture', 'onLoseCapture');
			this.releaseMouseCapture();
			this.snapToViewPort();
			// save the layout info
			var id = this.id;
			var options = this.getLayout();
			var save = [];
			if(this.dragAction == 'move' || this.dragAction == 'resize') {
				save.push('x', 'y', 'hAlign', 'vAlign');
			}
			if(this.dragAction == 'resize') {
				for(var i = 0; i < this.dragActionParameters.length; i++) {
					switch(this.dragActionParameters[i]) {
						case 'left':
						case 'right': save.push('width'); break;
						case 'top':
						case 'bottom': save.push('height'); break;
					}
				}
			}
			for(var i = 0; i < save.length; i++) {
				var name = save[i];
				NFLCIME.dispatchEvent( { type:'PersistenceSetValue', id:id, name:name, value:options[name] } );
			}
			this.dragAction = '';
			this.dragActionMousePosition = null;
			this.dragActionParameters = null;
		}
	},
	// Set the style of an iframe
	// Options can contain the following properties:
	//
	//  - fixed (boolean): whether the iframe remain stationary or scroll along with the document
	//  - width (number): the width of the iframe in pixel; setting this to the string 'default' means the width of the document in the iframe
	//  - height (number): the height of the iframe in pixel; setting this to the string 'default' means the height of the document in the iframe
	//  - minWidth (number): how narrow the window can be if resizable
	//  - minHeight (number): how tall the window can be if resizable
	//  - hAlign (string): 'left' or 'right', which edge of the document frame the iframe aligns with
	//  - vAlign (string): 'top' or 'bottom', which edge of the document frame the iframe aligns with
	//  - x (number): horizontal position; if hAlign is 'right' then the CSS style 'right' is set to this value
	//  - y (number): vertical position; if vAlign is 'bottom' then the CSS style 'bottom' is set to this value
	//
	// The object passed to addToPage() initially should contain all of the above properties. Afterward, each of them can be passed in independently.
	// If fixed is changed, the current position of the iframe will be preserved. Changing the alignment, without providing a new position, will cause the iframe
	// to jump from one side to the other.
	applyLayout:function(options) {
		if(options.width != undefined) {
			if(options.width == 'default') {
				this.iFrame.adjustWidth = true;
			} else {
				this.iFrame.adjustWidth = false;
				this.iFrame.style.width = options.width + 'px';
			}
		}
		if(options.height != undefined) {
			if(options.height == 'default') {
				this.iFrame.adjustHeight = true;
			} else {
				this.iFrame.adjustHeight = false;
				this.iFrame.style.height = options.height + 'px';
			}
		}
		if(options.minWidth != undefined) {
			this.iFrame.minWidth = options.minWidth;
		}
		if(options.minHeight != undefined) {
			this.iFrame.minHeight = options.minHeight;
		}
		if(options.collapsed != undefined) {
			this.collapsed = options.collapsed;
		}
		// adjust the dimension
		if(this.iFrameWindow && (options.height == 'default' || options.width == 'default' || options.minWidth != undefined || options.minHeight != undefined)) {
			this.adjustDimension();
		}
		if(options.fixed != undefined) {
			// adjust the position of the iframe if there's a change from fixed to absolute and vice versa
			if(this.iFrame.fixed != undefined && options.fixed != this.iFrame.fixed) {
				var pos = this.getElementPosition(this.iFrame);
				var scroll = this.getScrollPosition(document);
				// substract the scroll width when switching from absolute to fixed
				var sign = (!this.iFrame.fixed && options.fixed) ? -1 : 1;
				this.moveBy(sign * scroll.x, sign * scroll.y);
			}
			this.iFrame.fixed = options.fixed;
		}
		if(options.hAlign != undefined) {
			if(this.iFrame.hAlign != undefined && options.hAlign != this.iFrame.hAlign) {
				if(!this.ieQuirkMode) {
					// swap the two if there's a change
					if(options.hAlign == 'right') {
						this.iFrame.style.right = this.iFrame.style.left;
						this.iFrame.style.left = 'auto';
					} else {
						this.iFrame.style.left = this.iFrame.style.right;
						this.iFrame.style.right = 'auto';
					}
				}
			}
			this.iFrame.hAlign = options.hAlign;
		}
		if(options.vAlign != undefined) {
			if(this.iFrame.vAlign != undefined && options.vAlign != this.iFrame.vAlign) {
				if(!this.ieQuirkMode) {
					if(options.vAlign == 'bottom') {
						this.iFrame.style.bottom = this.iFrame.style.top;
						this.iFrame.style.top = 'auto';
					} else {
						this.iFrame.style.top = this.iFrame.style.bottom;
						this.iFrame.style.bottom = 'auto';
					}
				}
			}
			this.iFrame.vAlign = options.vAlign;
		}
		if(this.ieQuirkMode) {
			// in IE quirk mode the iframe is always position absolutely
			// the fixed behavior is attained using CSS expression (see addIEQuirkModeCSSClass)
			this.iFrame.style.position = 'absolute';
			this.iFrame.className = this.cssClassPrefix + '_' + this.iFrame.vAlign + this.iFrame.hAlign;
		} else {
			this.iFrame.style.position = (this.iFrame.fixed) ? 'fixed' : 'absolute';
		}
		// set the position if provided
		if(options.x != undefined) {
			if(this.ieQuirkMode) {
				this.iFrame.positionX = parseInt(options.x);
			} else {
				if(this.iFrame.hAlign == 'right') {
					this.iFrame.style.right = options.x + 'px';
					this.iFrame.style.left = 'auto';
				} else {
					this.iFrame.style.left = options.x + 'px';
					this.iFrame.style.right = 'auto';
				}
			}
		}
		if(options.y != undefined) {
			if(this.ieQuirkMode) {
				this.iFrame.positionY = parseInt(options.y);
			} else {
				if(this.iFrame.vAlign == 'bottom') {
					this.iFrame.style.bottom = options.y + 'px';
					this.iFrame.style.top = 'auto';
				} else {
					this.iFrame.style.top = options.y + 'px';
					this.iFrame.style.bottom = 'auto';
				}
			}
		}
	},
	// Return the current layout info of the iFrame
	getLayout:function() {
		var options = {};
		options.fixed = this.iFrame.fixed;
		options.hAlign = this.iFrame.hAlign;
		options.vAlign = this.iFrame.vAlign;
		options.width = parseInt(this.iFrame.style.width);
		options.height = parseInt(this.iFrame.style.height);
		if(this.ieQuirkMode) {
			options.x = this.iFrame.positionX;
			options.y = this.iFrame.positionY;
		} else {
			if(this.iFrame.hAlign == 'right') {
				options.x = parseInt(this.iFrame.style.right);
			} else {
				options.x = parseInt(this.iFrame.style.left);
			}
			if(this.iFrame.vAlign == 'bottom') {
				options.y = parseInt(this.iFrame.style.bottom);
			} else {
				options.y = parseInt(this.iFrame.style.top);
			}
		}
		return options;
	},
	// see how large is a document's contents
	getDocumentContentExtent:function(doc) {
		var size = { width:0, height:0 };
		for(var e = doc.body.firstChild; e; e = e.nextSibling) {
			if(e.nodeType == 1) {
				var right = e.offsetLeft + e.offsetWidth;
				var bottom = e.offsetTop + e.offsetHeight;
				size.width = Math.max(size.width, right);
				size.height = Math.max(size.height, bottom);
			}
		}
		return size;
	},
	// Adjust the iframe to the size of the document if necessary
	adjustDimension:function() {
		var doc = this.iFrameWindow.document;
		var size = this.getDocumentContentExtent(doc);
		if(this.iFrame.adjustWidth) {
			var width = size.width;
			if(width < this.iFrame.minWidth) {
				width = this.iFrame.minWidth;
			}
			this.iFrame.style.width = width + 'px';
			size.width = width;
		}
		if(this.iFrame.adjustHeight) {
			var height = size.height;
			if(height < this.iFrame.minHeight) {
				height = this.iFrame.minHeight;
			}
			this.iFrame.style.height = height + 'px';
			size.height = height;
		}
		
		
		var frame = this.iFrameWindow.document.getElementById('frame');
		if(frame) {
			if(this.collapsed) {
				if(frame.className != 'collapsed') {
					if(!this.heightBeforeCollapse) {
						this.heightBeforeCollapse = size.height;
					}
					this.frameHeightBeforeCollapse = frame.getAttribute('height');
					frame.setAttribute('height', '');
					frame.className = 'collapsed';
					var height = frame.offsetHeight;
					this.iFrame.style.height = height + 'px';
				}
			} else {
				if(frame.className == 'collapsed') {			
					var height = this.heightBeforeCollapse;
					this.iFrame.style.height = height + 'px';
					frame.setAttribute('height', this.frameHeightBeforeCollapse);
					frame.className = '';
					this.heightBeforeCollapse = 0;
				}
			}
		}
	},
	// Attach a closure to a DOM element that sends the events to the named handler
	attachDOMHandler:function(element, eventName, handlerName) {
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
					break;
			}
			this.closures[handlerName] = closure;
		}
		switch(this.browser) {
			case 'ie':
				element.attachEvent('on' + eventName, closure);
				break;
			case 'firefox':
			case 'safari':
				element.addEventListener(eventName, closure, false);
				break;
		}
	},
	// Detach an earlier attached closure
	detachDOMHandler:function(element, eventName, handlerName) {
		var closure = this.closures[handlerName];
		if(closure) {
			switch(this.browser) {
				case 'ie':
					element.detachEvent('on' + eventName, closure);
					break;
				case 'firefox':
				case 'safari':
					element.removeEventListener(eventName, closure, false);
					break;
			}
		}
	},
	// Resize the iframe by the specified amount
	resizeBy:function(deltaX, deltaY, sides) {
		var shift_x = 0, shift_y = 0;
		for(var i = 0; i < sides.length; i++) {
			switch(sides[i]) {
				case 'left':
					var width = parseInt(this.iFrame.style.width);
					var new_width = width - deltaX;
					if(new_width < this.iFrame.minWidth) {
						new_width = this.iFrame.minWidth;
						deltaX = width - new_width;
					}
					this.iFrame.style.width = new_width + 'px';
					if(this.iFrame.hAlign == 'left') {
						shift_x = deltaX;
					}
					break;
				case 'right':
					var width = parseInt(this.iFrame.style.width);
					var new_width = width + deltaX;
					if(new_width < this.iFrame.minWidth) {
						new_width = this.iFrame.minWidth;
						deltaX = new_width - width;
					}
					this.iFrame.style.width = new_width + 'px';
					if(this.iFrame.hAlign == 'right') {
						shift_x = deltaX;
					}
					this.dragActionMousePosition.x += deltaX;
					break;
				case 'top':
					var height = parseInt(this.iFrame.style.height);
					var new_height = height - deltaY;
					if(new_height < this.iFrame.minHeight) {
						new_height = this.iFrame.minHeight;
						deltaY = height - new_height;
					}
					this.iFrame.style.height = new_height + 'px';
					if(this.iFrame.vAlign == 'top') {
						shift_y = deltaY;
					}
					break;
				case 'bottom':
					var height = parseInt(this.iFrame.style.height);
					var new_height = height + deltaY;
					if(new_height < this.iFrame.minHeight) {
						new_height = this.iFrame.minHeight;
						deltaY = new_height - height;
					}
					this.iFrame.style.height = new_height + 'px';
					if(this.iFrame.vAlign == 'bottom') {
						shift_y = deltaY;
					}
					this.dragActionMousePosition.y += deltaY;
					break;
			}
		}
		if(shift_x || shift_y) {
			this.moveBy(shift_x, shift_y);
		}
	},
	// Move the iframe by the given amount (positive meaning left or down)
	moveBy:function(deltaX, deltaY) {
		if(this.ieQuirkMode) {
			if(this.iFrame.hAlign == 'right') {
				this.iFrame.positionX -= deltaX;
			} else {
				this.iFrame.positionX += deltaX;
			}
			if(this.iFrame.vAlign == 'bottom') {
				this.iFrame.positionY -= deltaY;
			} else {
				this.iFrame.positionY += deltaY;
			}
		} else {
			if(this.iFrame.hAlign == 'right') {
				this.iFrame.style.right = parseInt(this.iFrame.style.right) - deltaX + 'px';
			} else {
				this.iFrame.style.left = parseInt(this.iFrame.style.left) + deltaX + 'px';
			}
			if(this.iFrame.vAlign == 'bottom') {
				this.iFrame.style.bottom = parseInt(this.iFrame.style.bottom) - deltaY + 'px';
			} else {
				this.iFrame.style.top = parseInt(this.iFrame.style.top) + deltaY + 'px';
			}
		}
	},
	toggleCollapse:function() {
		this.collapsed = !this.collapsed;
		this.adjustDimension();
		NFLCIME.dispatchEvent( { type:'PersistenceSetValue', id:this.id, name:'collapsed', value:this.collapsed.toString() } );
	},	
	// Returns the mouse position stored in an event object
	getEventPosition:function(evt) {
		var pos = { x:0, y:0 };
		switch(this.browser) {
			case 'ie':
				pos.x = evt.clientX;
				pos.y = evt.clientY;
				var doc = (evt.srcElement.nodeType == 9) ? evt.srcElement : evt.srcElement.ownerDocument;
				var scroll = this.getScrollPosition(doc);
				pos.x += scroll.x;
				pos.y += scroll.y;
				break;
			case 'firefox':
			case 'safari':
				pos.x = evt.pageX;
				pos.y = evt.pageY;
				break;
		}
		return pos;
	},
	// Returns the scroll position
	getScrollPosition:function(doc) {
		var pos = { x:0, y:0 };
		if(!doc.compatMode || doc.compatMode == 'BackCompat') {
			pos.x = doc.body.scrollLeft;
			pos.y = doc.body.scrollTop;
		} else {
			pos.x = doc.documentElement.scrollLeft;
			pos.y = doc.documentElement.scrollTop;
		}
		return pos;
	},
	// Return the position of an element in page coordinate
	getElementPosition:function(element) {
		var pos = { x:0, y:0 };
		pos.x = element.offsetLeft;
		pos.y = element.offsetTop;
		var parent = element.offsetParent;
		if(!parent && element.tagName != 'BODY') {
			// fixed element have apparently have null offsetParent in Safari
			parent = element.ownerDocument.body;
		}
		if(parent) {
			var p_pos = this.getElementPosition(parent);
			pos.x += p_pos.x;
			pos.y += p_pos.y;
			var style = element.currentStyle;
			if(!style) {
				style = getComputedStyle(element, '');
			}
			if(style.position == 'fixed') {
				pos.x += parent.scrollLeft;
				pos.y += parent.scrollTop;
			}
		}
		return pos;
	},
	// Returns the window object of the given iframe
	getIFrameWindow:function(iFrame) {
		var a;
		try {
			var win = this.getElementWindow(iFrame);
			if(iFrame.contentWindow) {
				return iFrame.contentWindow;
			} else if(iFrame.contentDocument) {
				return iFrame.contentDocument.defaultView;
			} else if(win.frames) {
				win.frames[iFrame.id];
			}
		} catch(e) {
		}
	},
	// Returns the iframe object of the given window object
	getWindowIFrame:function(win) {
		var iframes = this.getIFramesRecursive(window);
		for(var i = 0; i < iframes.length; i++) {
			var f = iframes[i];
			var w = this.getIFrameWindow(f);
			if(w == win) {
				return f;
			}
		}
		return null;
	},
	// Returns the window containing the element
	getElementWindow:function(element) {
		var doc = element.ownerDocument;
		if(doc.defaultView) {
			return doc.defaultView;
		} else if(doc.parentWindow) {
			return doc.parentWindow;
		}
	},
	// Returns the coordinates of the rectangular area of the document that's currently onscreen
	getViewPort:function(doc) {
		var size = { width:0, height: 0 };
		if(!doc.compatMode || doc.compatMode == 'BackCompat') {
			size.x = doc.body.clientWidth;
			size.y = doc.body.clientHeight;
		} else {
			size.x = doc.documentElement.clientWidth;
			size.y = doc.documentElement.clientHeight;
		}
		return { left:0, top:0, right:size.x, bottom:size.y };
	},
	// Returns the coordinates of the rectangular area occupied by the iframe
	getIFrameBounds:function(iFrame) {
		var pos = this.getElementPosition(iFrame);
		return { left:pos.x, top:pos.y, right:pos.x + iFrame.offsetWidth, bottom:pos.y + iFrame.offsetHeight };
	},
	// See if the iframe should snap to an edge
	snapToViewPort:function() {
		var doc_area = this.getViewPort(document);
		var if_area = this.getIFrameBounds(this.iFrame);
		var snapping = false;
		var options = {};
		var distance = this.snappingDistance;
		if(if_area.left - doc_area.left < distance) {
			options.x = 0;
			options.hAlign = 'left';
			snapping = true;
		} else if(doc_area.right - if_area.right < distance) {
			options.x = 0;
			options.hAlign = 'right';
			snapping = true;
		}
		// only makes sense perform vertical snapping on fixed iframes
		if(this.iFrame.fixed) {
			if(if_area.top - doc_area.top < distance) {
				options.y = 0;
				options.vAlign = 'top';
				snapping = true;
			} else if(doc_area.bottom - if_area.bottom < distance) {
				options.y = 0;
				options.vAlign = 'bottom';
				snapping = true;
			}
		}
		if(snapping) {
			this.applyLayout(options);
		}
	},
	addIEQuirkModeCSSClass:function() {
		this.cssClassPrefix = this.id.replace(/\./g, '');
		var css = "\
				.#prefix#_topleft {\
					left: expression( (this.positionX + ((this.fixed) ? document.body.scrollLeft : 0)) + 'px' );\
					top:  expression( (this.positionY + ((this.fixed) ? document.body.scrollTop : 0)) + 'px' );\
				}\
				.#prefix#_topright {\
					left: expression( (document.body.clientWidth - this.positionX - this.offsetWidth + ((this.fixed) ? document.body.scrollLeft : 0)) + 'px' );\
					top:  expression( (this.positionY + ((this.fixed) ? document.body.scrollTop : 0)) + 'px' );\
				}\
				.#prefix#_bottomleft {\
					left: expression( (this.positionX + ((this.fixed) ? document.body.scrollLeft : 0)) + 'px' );\
					top: expression( (document.body.clientHeight - this.positionY - this.offsetHeight + ((this.fixed) ? document.body.scrollTop : 0)) + 'px' );\
				}\
				.#prefix#_bottomright {\
					left: expression( (document.body.clientWidth - this.positionX - this.offsetWidth + ((this.fixed) ? document.body.scrollLeft : 0)) + 'px' );\
					top: expression( (document.body.clientHeight - this.positionY - this.offsetHeight + ((this.fixed) ? document.body.scrollTop : 0)) + 'px' );\
				}\
			";
		css = css.replace(/#prefix#/g, this.cssClassPrefix);
		if(document.compatMode == 'CSS1Compat') {
			// IE6 compliant mode
			css = css.relace(/document\.body/g, 'document.documentElement');
		}
		var head = document.getElementsByTagName("head")[0];
		if(head) {
			var style = document.createElement("style");
			style.setAttribute("type", "text/css");
			style.styleSheet.cssText = css;
			head.appendChild(style);
		}
	},
	getIFrameWindowsRecursive:function(win) {
		var list = [];
		var iframes = win.document.getElementsByTagName('IFRAME');
		for(var i = 0; i < iframes.length; i++) {
			var child_win = this.getIFrameWindow(iframes[i]);
			list.push(child_win);
			var grand_children = this.getIFrameWindowsRecursive(child_win);
			list.push.apply(list, grand_children);
		}
		return list;
	},
	getIFramesRecursive:function(win) {
		var list = [];
		var iframes = win.document.getElementsByTagName('IFRAME');
		for(var i = 0; i < iframes.length; i++) {
			var iframe = iframes[i];
			var child_win = this.getIFrameWindow(iframe);
			list.push(iframe);
			var grand_children = this.getIFramesRecursive(child_win);
			list.push.apply(list, grand_children);
		}
		return list;
	},
	// Redirect mouse events to iframe being moved or dragged
	setMouseCapture:function() {
		switch(this.browser) {
			case 'ie':
				// call the actual function
				this.iFrameWindow.document.body.setCapture();
				break;
			case 'firefox':
			case 'safari':
				// attach listeners that redirect event to the active frame to the parent document as well as all other iframes
				var iframe_windows = this.getIFrameWindowsRecursive(window);
				for(var i = 0; i < iframe_windows.length; i++) {
					var win = iframe_windows[i];
					if(win != this.iFrameWindow) {
						// use a try block in case window contains page from different domain
						try {
							this.attachDOMHandler(win, 'mousemove', 'onMouseMoveRedirectFromIFrame', true);
							this.attachDOMHandler(win, 'mouseup', 'onMouseMoveRedirectFromIFrame', true);
						} catch(e) {
						}
					}
				}
				this.attachDOMHandler(window, 'mousemove', 'onMouseMoveRedirectFromParent');
				this.attachDOMHandler(window, 'mouseup', 'onMouseMoveRedirectFromParent');
				this.attachDOMHandler(window, 'blur', 'onBlurDuringCapture');
		}
	},
	// End mouse event capturing
	releaseMouseCapture:function() {
		switch(this.browser) {
			case 'ie':
				this.iFrameWindow.document.body.releaseCapture();
				break;
			case 'firefox':
			case 'safari':
				var iframe_windows = this.getIFrameWindowsRecursive(window);
				for(var i = 0; i < iframe_windows.length; i++) {
					var win = iframe_windows[i];
					if(win != this.iFrameWindow) {
						this.detachDOMHandler(win, 'mousemove', 'onMouseMoveRedirectFromIFrame', true);
						this.detachDOMHandler(win, 'mouseup', 'onMouseMoveRedirectFromIFrame', true);
					}
				}
				this.detachDOMHandler(window, 'mousemove', 'onMouseMoveRedirectFromParent');
				this.detachDOMHandler(window, 'mouseup', 'onMouseMoveRedirectFromParent');
				this.detachDOMHandler(window, 'blur', 'onBlurDuringCapture');
		}
	},
	// Find out when the iframe sits in the document, then fire an event to the parent
	onMouseMoveRedirectFromIFrame:function(evt) {
		var doc = (evt.target.nodeType == 9) ? evt.target : evt.target.ownerDocument;
		var win = doc.defaultView;
		var iframe = this.getWindowIFrame(win);
		var scroll = this.getScrollPosition(doc);
		var parent_doc = win.parent.document;
		var parent_scroll = this.getScrollPosition(parent_doc);
		if(iframe) {
			var pos = this.getElementPosition(iframe);
			var new_evt = doc.createEvent('MouseEvent');
			if(new_evt.initMouseEvent) {
				new_evt.initMouseEvent(evt.type, true, true, evt.view, evt.detail, evt.screenX, evt.screenY, evt.clientX + pos.x - parent_scroll.x, evt.clientY + pos.y - parent_scroll.y, evt.ctrlKey, evt.altKey, evt.shiftKey, evt.metaKey, evt.button, evt.relatedTarget);
			} else {
				new_evt.initEvent(evt.type, true, true);
				new_evt.view = evt.view;
				new_evt.detail = evt.detail;
				new_evt.screenX = evt.screenX;
				new_evt.screenY = evt.screenY;
				new_evt.clientX = evt.clientX + pos.x - parent_scroll.x;
				new_evt.clientY = evt.clientY + pos.y - parent_scroll.y;
				new_evt.pageX = evt.pageX + pos.x;
				new_evt.pageY = evt.pageY + pos.y;
				new_evt.ctrlKey = evt.ctrlKey;
				new_evt.altKey = evt.altKey;
				new_evt.shiftKey = evt.shiftKey;
				new_evt.metaKey = evt.metaKey;
				new_evt.button = evt.button;
				new_evt.relatedTarget = evt.relatedTarget;
			}
			parent_doc.body.dispatchEvent(new_evt);
			evt.stopPropagation();
			evt.preventDefault();
		}
	},
	// Send the event to the active frame
	onMouseMoveRedirectFromParent:function(evt) {
		var doc = (evt.target.nodeType == 9) ? evt.target : evt.target.ownerDocument;
		var pos = this.getElementPosition(this.iFrame);
		var scroll = this.getScrollPosition(doc);
		var new_evt = doc.createEvent('MouseEvent');
		if(new_evt.initMouseEvent) {
			new_evt.initMouseEvent(evt.type, true, true, evt.view, evt.detail, evt.screenX, evt.screenY, evt.clientX - scroll.x - pos.x, evt.clientY - scroll.y - pos.y, evt.ctrlKey, evt.altKey, evt.shiftKey, evt.metaKey, evt.button, evt.relatedTarget);
		} else {
			new_evt.initEvent(evt.type, true, true);
			new_evt.view = evt.view;
			new_evt.detail = evt.detail;
			new_evt.screenX = evt.screenX;
			new_evt.screenY = evt.screenY;
			new_evt.clientX = evt.clientX - pos.x;
			new_evt.clientY = evt.clientY - pos.y;
			new_evt.pageX = evt.pageX - pos.x;
			new_evt.pageY = evt.pageY - pos.y;
			new_evt.ctrlKey = evt.ctrlKey;
			new_evt.altKey = evt.altKey;
			new_evt.shiftKey = evt.shiftKey;
			new_evt.metaKey = evt.metaKey;
			new_evt.button = evt.button;
			new_evt.relatedTarget = evt.relatedTarget;
		}
		this.iFrameWindow.document.body.dispatchEvent(new_evt);
		evt.stopPropagation();
		evt.preventDefault();
	},
	// Generate a losecapture event if the browser window loses focus
	onBlurDuringCapture:function(evt) {
		var new_evt = document.createEvent('Event');
		new_evt.initEvent('losecapture', false, false);
		this.iFrameWindow.document.body.dispatchEvent(new_evt);
	},
	startAnimation:function(type) {
		this.animationType = type;
		if(!this.animationIntervalId) {
			var closure = this.closures['doAnimation'];
			if(!closure) {
				var self = this;
				closure = function() { self.doAnimation(); };
				this.closures['doAnimation'] = closure;
			}
			this.animationIntervalId = setInterval(closure, 20);
		}
	},
	stopAnimation:function() {
		if(this.animationType) {
			this.animationType = null;
			if(this.animationIntervalId) {
				clearInterval(this.animationIntervalId);
				this.animationIntervalId = 0;
			}
		}
	},
	doAnimation:function() {
		switch(this.animationType) {
			case 'fade-out':
				this.setOpacity(this.opacity - 20);
				if(this.opacity <= 0) {
					this.stopAnimation();
				}
				break;
			case 'fade-in':
				this.setOpacity(this.opacity + 20);
				if(this.opacity >= 1) {
					this.stopAnimation();
				}
				break;
		}
	},
	setOpacity:function(value) {
		// give the page a chance to adjust/react to the opacity change
		if(this.iFrameWindow && this.iFrameWindow.setOpacity) {
			this.opacity = this.iFrameWindow.setOpacity(value);
		} else {
			this.opacity = value;
		}
		if(this.opacity > 0 && this.opacity < 100) {
			this.iFrame.style.visibility = 'visible';
			switch(this.browser) {
				case 'ie':
					this.iFrame.style.filter = 'alpha(opacity = ' + this.opacity + ')';
					break;
				case 'firefox':
				case 'safari':
					this.iFrame.style.opacity = (this.opacity / 100) + '';
					break;
			}
		} else {
			this.iFrame.style.visibility = (this.opacity > 0) ? 'visible' : 'hidden';
			switch(this.browser) {
				case 'ie':
					// need to set it to an empty string before removing it, otherwise the filter will stop working
					this.iFrame.style.filter = '';
					// remove the attribute to restore ClearType anti-aliasing
					this.iFrame.style.removeAttribute('filter');
					break;
				case 'firefox':
				case 'safari':
					this.iFrame.style.opacity = '';
					break;
			}
		}
	},
	initialize:function(env, subclassing) {
		this.closures = {};
		// do this only for the base module
		if(!subclassing) {
			this.browser = env.browser;
			if(this.browser == 'ie') {
				if(!(document.documentMode && document.documentMode >= 7)
				&& !(document.compatMode == 'CSS1Compat' && agent.indexOf('MSIE 7') != -1)) {
					this.addIEQuirkModeCSSClass();
					this.ieQuirkMode = true;
				}
			}
			this.attachDOMHandler(window, 'beforeunload', 'onUnloadRemoveIframes');
		}
		// the base module can't be activated
		if(subclassing) {
			NFLCIME.addEventListener('ModuleActivate', this);
			NFLCIME.addEventListener('ModuleDeactivate', this);
		}
	},
	//--- Private variables
	browser:'ie',
	ieQuirkMode:false,
	cssClassPrefix:'',
	closures:null,
	iFrame:null,
	iFrameWindow:null,
	dragAction:'',
	dragActionParameters:null,
	dragActionMousePosition:null,
	allIFrames:[],
	zIndexStart:10000,
	snappingDistance:40,
	animationType:'',
	animationIntervalId:0,
	opacity:100,
	collapsed:false,
	heightBeforeCollapse:0,
	frameHeightBeforeCollapse:''
}
} );
NFLCIME.dispatchEvent( { type:'ModuleAdd', module:
{
	id:'ui.iframe',
	type:'ui module loader',
	onModuleActivate:function(evt) {
		var module = evt.module;
		if(module == this && !this.active) {
			this.active = true;
			NFLCIME.addEventListener('UIModuleLoad', this, true);
			NFLCIME.addEventListener('UIModuleGetStyleSheet', this);
			if(this.initialUIModules) {
				for(var i = 0; i < this.initialUIModules.length; i++) {
					var m = this.initialUIModules[i];
					NFLCIME.dispatchEvent( { type:'UIModuleLoad', moduleId:m.id, url:m.url, options:m.options } );
				}
				this.initialUIModules = null;
			}
		}
	},
	onModuleDeactivate:function(evt) {
		var module = evt.module;
		if(module == this && this.active) {
			NFLCIME.removeEventListener('UIModuleLoad', this, true);
			NFLCIME.removeEventListener('UIModuleGetStyleSheet', this);
			this.active = false;
		}
	},
	onUIModuleLoad:function(evt) {


		if (evt.url) {
			evt.url = NFLCIME.mapUrlToPackage(evt.url);
		}

		var id = evt.moduleId;
		var url = (evt.url) ? evt.url : evt.moduleId + '.html';
		var options = evt.options;
		var module = this.UIModules[id];
		// base relative urls on the folder holding nflcime.js
		if(url.charAt(0) != '/') {
			url = this.URLRoot + url;
		}
		if(module) {
			module.url = url;
			module.options = options;
		} else {
			// create the module object and add it
			var module = {
				id:id,
				inheritance:['ui.iframe.base'],
				url:url,
				options:options
			};
			this.UIModules[id] = module;
			NFLCIME.dispatchEvent( { type:'ModuleAdd', module:module } );
		}
		// activate the module
		NFLCIME.dispatchEvent( { type:'ModuleActivate', module:module } );
	},
	onUIModuleGetStyleSheet:function(evt) {
		switch(evt.styleSheetType) {
			case 'frame':
				evt.url = this.interfaceCSS;
				break;
		}
	},
	//--- Private function
	initialize:function(env, subclassing) {
		this.URLRoot = env.scriptURLRoot;
		this.interfaceCSS = (env.configuration.UIModuleFrameCSS) ? env.configuration.UIModuleFrameCSS : 'ui.iframe.css';
		this.initialUIModules = env.configuration['UIModules'];
		NFLCIME.addEventListener('ModuleActivate', this);
		NFLCIME.addEventListener('ModuleDeactivate', this)
	},
	//--- Private variables
	active:false,
	URLRoot:false,
	interfaceCSS:null,
	initialUIModules:null,
	UIModules:{}
}
} );