/*
 * This file has been compressed with CKPackager
 */

// get the NFLCIME object
var NFLCIME;
try {
	var p = window;
	do {
		p = p.parent;
		if(p.NFLCIME) {
			NFLCIME = p.NFLCIME;
			break;
		}
	} while(p != p.parent);
} catch(e) {
}
if(NFLCIME) {
	NFLCIME.dispatchEvent( { type:'WindowListen', target:window } );
}
if(window.addEventListener) {
	window.addEventListener('unload', function() { NFLCIME.dispatchEvent( { type:'WindowIgnore', target:window } ) }, false);
} else if(window.attachEvent) {
	window.attachEvent('onbeforeunload', function() { NFLCIME.dispatchEvent( { type:'WindowIgnore', target:window } ) } );
}
var NFLCIME = {
	// Add a listener for a specific event (listner['on' + eventName] will be invoked)
	addEventListener:function(eventName, listener, capture) {
		var name = eventName + ((capture) ? '_cap' : '');
		var listeners = this.eventListenerHash[name];
		if(!listeners) {
			this.eventListenerHash[name] = listeners = [];
		}
		listeners.push(listener);
	},
	// Remove a listener
	removeEventListener:function(eventName, listener, capture) {
		var name = eventName + ((capture) ? '_cap' : '');
		var listeners = this.eventListenerHash[name];
		if(listeners) {
			for(var i = listeners.length - 1; i >= 0; i--) {
				if(listeners[i] == listener) {
					listeners.splice(i, 1);
				}
			}
			if(listeners.length == 0) {
				this.eventListenerHash[name] = undefined;
			}
		}
	},
	// Dispatch an event to all listening objects
	dispatchEvent:function(evt) {
		var result;
		var loops = ['_cap', ''];	// send event to capturing listeners first
		for(var k = 0; k < loops.length; k++) {
			var name = evt.type + loops[k];
			var listeners = this.eventListenerHash[name];
			if(listeners) {
				listeners = listeners.concat();
				for(var i = 0; i < listeners.length; i++) {
					var listener = listeners[i];
					var handler = listener['on' + evt.type];
					if(handler) {
						result = handler.call(listener, evt);
					}
					if(result != undefined) {
						return result;
					}
				}
			}
		}
		return undefined;
	},
	//--- Event handlers
	// Attach handlers to a a window
	onWindowListen:function(evt) {
		var win = evt.target;
		switch(this.environment.browser) {
			case 'firefox':
			case 'safari':
				// prevent textboxes from losing focus to elements marked as "unselectable"
				win.addEventListener('mousedown', this.enforceUnselectable, false);
				break;
		}
		this.windowsHandled.push(win);
	},
	// Detach handlers a window
	onWindowIgnore:function(evt) {
		var win = evt.target;
		switch(this.environment.browser) {
			case 'firefox':
			case 'safari':
				win.removeEventListener('mousedown', this.enforceUnselectable, false);
				break;
		}
		for(var i = this.windowsHandled.length - 1; i >= 0; i--) {
			if(this.windowsHandled[i] == win) {
				this.windowsHandled.splice(i, 1);
			}
		}
	},
	// Get the list of windows
	onWindowGetList:function(evt) {
		for(var i = this.windowsHandled.length - 1; i >= 0; i--) {
			var win = this.windowsHandled[i];
			if(win.closed || !win.document) {
				this.windowsHandled.splice(i, 1);
			}
		}
		for(var i = 0; i < this.windowsHandled.length; i++) {
			evt.list.push(this.windowsHandled[i]);
		}
	},
	// Whether a given IME service is active for a given element
	onServiceApplicable:function(evt) {
		var element = evt.target;
		var services_requested = evt.service.split(/\s*,\s*/);
		evt.applicable = false;
		if(element) {
			// look at the comma-delimited list stored as an attribute in the element
			for(var e = element; e && e.getAttribute; e = e.parentNode) {
				var attribute = e.getAttribute('NFLCIME');
				if(attribute) {
					attribute = attribute.toLowerCase();
					attribute = attribute.replace(/\s+/g, '');
					attribute = attribute.replace(/\bon\b/, 'kb,cvt');
					var services_enabled = attribute.split(',');
					for(var i = 0; i < services_enabled.length; i++) {
						var s = services_enabled[i];
						if(s == 'all') {
							evt.applicable = true;
							return;
						} else {
							for(var j = 0; j < services_requested.length; j++) {
								var r = services_requested[j];
								if(s == r) {
									evt.applicable = true;
									return;
								}
							}
						}
					}
					break;
				}
			}
		}
	},
	// Add a module (triggered by dynamically loaded script files)
	onModuleAdd:function(evt) {
		var module = evt.module;
		if(this.checkModuleDependency(module)) {
			var ready = this.initializeModule(module);
			if(ready) {
				this.dispatchEvent( { type:'ModuleRegister', module:module } );
			} else {
				// the module isn't quite ready yet, likely because it's waiting for an asynchronous operation to finish
				// once that's done, the module will fire a ModuleRegister event itself
			}
		} else {
			this.loadDependentModules(module);
			this.pendingModules.push(module);
		}
	},
	// Register a module
	onModuleRegister:function(evt) {
		var module = evt.module;
		this.registeredModules[module.id] = module;
		// activate the module if it's supposed to be active
		if(this.activateOnLoad[module.id]) {
			this.dispatchEvent( { type:'ModuleActivate', module:module } );
		}
		// see if any of the pending module might be ready
		for(var i = this.pendingModules.length - 1; i >= 0; i--) {
			var pending_module = this.pendingModules[i];
			if(this.checkModuleDependency(pending_module)) {
				// add the module then stop the loop, since the scan will occur again
				this.pendingModules.splice(i, 1);
				this.dispatchEvent( { type:'ModuleAdd', module:pending_module } );
				break;
			}
		}
		if(this.initialModuleList) {
			if(this.initialModuleList[this.initialModuleListIndex] == module.id) {
				// load the next module in the list
				this.initialModuleListIndex++;
				if(this.initialModuleListIndex < this.initialModuleList.length) {
					var id = this.initialModuleList[this.initialModuleListIndex];
					this.dispatchEvent( { type:'ModuleLoad', moduleId:id } );
				}
			}
		}
	},
	// Load a module contained in a Javascript file
	onModuleLoad:function(evt) {
		var id = evt.moduleId;
		var activate = evt.activate;
		var compressed = evt.compressed;
		var module = this.registeredModules[id];
		if(module) {
			if(activate) {
				this.dispatchEvent( { type:'ModuleActivate', module:module } );
			}
		} else {
			if(activate) {
				this.activateOnLoad[id] = true;
			}
			if (!compressed) {
				this.loadScriptFile(id + '.js');
			}
		}
		return true;
	},
	// Get list of load modules
	onModuleGetList:function(evt) {
		var id;
		for(id in this.registeredModules) {
			evt.list.unshift(this.registeredModules[id]);
		}
	},
	//--- Private functions
	// See if the modules that a module depends on are loaded
	checkModuleDependency:function(module) {
		if(module.dependency) {
			for(var j = 0; j < module.dependency.length; j++) {
				var id = module.dependency[j];
				if(!this.registeredModules[id]) {
					return false;
				}
			}
		}
		if(module.inheritance) {
			for(var j = 0; j < module.inheritance.length; j++) {
				var id = module.inheritance[j];
				if(!this.registeredModules[id]) {
					return false;
				}
			}
		}
		return true;
	},
	// Load modules that a module dpends on
	loadDependentModules:function(module) {
		if(module.dependency) {
			for(var j = 0; j < module.dependency.length; j++) {
				var id = module.dependency[j];
				if(!this.registeredModules[id]) {
					this.dispatchEvent( { type:'ModuleLoad', moduleId:id, activate:true } );
				}
			}
		}
		if(module.inheritance) {
			for(var j = 0; j < module.inheritance.length; j++) {
				var id = module.inheritance[j];
				if(!this.registeredModules[id]) {
					this.dispatchEvent( { type:'ModuleLoad', moduleId:id } );
				}
			}
		}
	},
	// Load a Javascript file by adding a SCRIPT tag to the HEAD element
	loadScriptFile:function(url) {
		var head = document.getElementsByTagName('HEAD')[0];
		if(head) {
			// add the folder path if necessary
			var full_url = (/^\w+:/.test(url) || /^\//.test(url)) ? url : this.environment.scriptURLRoot + url;
			// make sure we're not loading a script twice
			var scripts = document.getElementsByTagName('SCRIPT');
			for(var i = 0; i < scripts.length; i++) {
				if(scripts[i].src == full_url) {
					return;
				}
			}
			var script = document.createElement('SCRIPT');
			script.src = full_url;
			head.appendChild(script);
		}
	},
	// Initialize a module, copy functionalities from inherited modules if necessary
	initializeModule:function(module) {
		var result;
		if(module.inheritance) {
			// remember the module's own init function
			var module_init_func = module.initialize;
			// copy functionalities from other modules
			for(var i = 0; i < module.inheritance.length; i++) {
				var parent_id = module.inheritance[i];
				var parent_module = this.registeredModules[parent_id];
				var name;
				for(name in parent_module) {
					if(module[name] == undefined) {
						module[name] = parent_module[name];
					}
				}
			}
			// fire all inherited init function
			var functions = [];
			this.getInitializationFunctions(module, functions);
			for(var i = functions.length - 1; i >= 0; i--) {
				var f = functions[i];
				result = f.call(module, this.environment, f != module_init_func);
			}
		} else {
			// just run the init function
			if(module.initialize) {
				result = module.initialize(this.environment, false);
			}
		}
		return (result != false);
	},
	// Get a list of initialization functions, including those of inherited modules
	getInitializationFunctions:function(module, list) {
		var func = module.initialize;
		if(func) {
			// make sure the function isn't on the list already
			var duplicate = false;
			for(var i = list.length - 1; i >= 0; i--) {
				if(list[i] == func) {
					duplicate = true;
					break;
				}
			}
			if(!duplicate) {
				list.push(func);
			}
		}
		if(module.inheritance) {
			for(var i = module.inheritance.length - 1; i >= 0; i--) {
				var parent_id = module.inheritance[i];
				var parent_module = this.registeredModules[parent_id];
				this.getInitializationFunctions(parent_module, list);
			}
		}
	},
	// Evaluate the code inside the SCRIPT node as an object
	parseConfigurationCode:function() {
		var code = this.scriptNode.innerHTML;
		var browser = this.environment.browser;
		code = 'this.environment.configuration = {' + code.replace(/,\s*$/, '') + '};';
		try {
			eval(code);
		} catch(e) {
			alert(e.message);
		}
	},
	// Prevent focus change on unseletable elements
	enforceUnselectable:function(evt) {
		var unselectable = evt.target.getAttribute("unselectable");
		if(unselectable && unselectable.toLowerCase() == 'on') {
			evt.preventDefault();
		}
	},
	// Initialization function
	initialize:function() {
		// figure out the url root of this script
		var scripts = document.getElementsByTagName('SCRIPT');
		for(var i = 0; i < scripts.length; i++) {
			var script = scripts[i];
			var url = script.src;
			if(url) {
				var match;
				if(match = /(.*\/)?[^\/]*nflcime.js$/i.exec(url)) {
					this.scriptNode = script;
					this.scriptContainer = script.parentNode;
					this.environment.scriptURLRoot = match[1];
					var module_ids = script.getAttribute('modules');
					if(module_ids && (module_ids = module_ids.replace(/^\s+/g, '$1').replace(/\s+$/))) {
						this.initialModuleList = module_ids.split(/\s*,\s*/);
					}
					break;
				}
			}
		}
		if(!this.scriptNode) {
			alert('Cannot find the SCRIPT node linking to nflcime.js');
			return;
		}
		var agent = navigator.userAgent;
		if(agent.indexOf('KHTML') != -1) {
			this.environment.browser = 'safari';
		} else if(agent.indexOf('Gecko') != -1) {
			this.environment.browser = 'firefox';
		}
		this.parseConfigurationCode();
		this.addEventListener('WindowListen', this);
		this.addEventListener('WindowIgnore', this);
		this.addEventListener('WindowGetList', this);
		this.addEventListener('ServiceApplicable', this);
		this.addEventListener('ModuleAdd', this);
		this.addEventListener('ModuleRegister', this);
		this.addEventListener('ModuleActivate', this);
		this.addEventListener('ModuleLoad', this);
		this.addEventListener('ModuleGetList', this);
		var init_modules = this.environment.configuration['Modules'];
		if(init_modules) {
			for(var i = 0; i < init_modules.length; i++) {
				var m = init_modules[i];
				this.dispatchEvent( { type:'ModuleLoad', moduleId:m.id, activate:m.activate, compressed:m.compressed } );
			}
		}
		this.dispatchEvent( { type:'WindowListen', target:window } );
	},
	//--- Private variables
	environment:{ scriptUrlRoot:'', browser:'ie', configuration:{} },
	scriptNode:null,
	scriptContainer:null,
	settingsCode:'',
	eventListenerHash:{},
	closures:{},
	registeredModules:{},
	pendingModules:[],
	activateOnLoad:{},
	windowsHandled:[]
};
function trace() {};
NFLCIME.initialize();
NFLCIME.dispatchEvent( { type:'ModuleAdd', module:
{
	id:'pers.cookie',
	type:'persistence',
	//--- Event handlers
	onModuleActivate:function(evt) {
		var module = evt.module;
		if(module == this) {
			NFLCIME.addEventListener('PersistenceGetValue', this);
			NFLCIME.addEventListener('PersistenceSetValue', this);
		}
	},
	// Stop handling DOM event when module is deactivated
	onModuleDeactivate:function(evt) {
		var module = evt.module;
		if(module == this) {
			NFLCIME.removeEventListener('PersistenceGetValue', this);
			NFLCIME.removeEventListener('PersistenceSetValue', this);
		}
	},
	onPersistenceGetValue:function(evt) {
		evt.value = this.getValue(evt.id, evt.name);
	},
	onPersistenceSetValue:function(evt) {
		this.setValue(evt.id, evt.name, evt.value);
	},
	//--- Private functions
	getValue:function(group, name) {
		var cookie_values = this.cookieValueGroups[group];
		if(!cookie_values) {
			this.cookieValueGroups[group] = cookie_values = this.getCookieValues(group);
		}
		var value = cookie_values[name];
		return value;
	},
	setValue:function(group, name, value) {
		var cookie_values = this.cookieValueGroups[group];
		if(!cookie_values) {
			this.cookieValueGroups[group] = cookie_values = this.getCookieValues(group);
		}
		cookie_values[name] = value + '';
		var cookie_pairs = [], n;
		for(n in cookie_values) {
			var val = cookie_values[n];
			if(typeof(val) != 'function') {
				cookie_pairs.push(n + '::' + val);
			}
		}
		var now = new Date();
		var next_year = new Date(now.getTime() + 31536000000);
		document.cookie = group + '="' + cookie_pairs.join('//') + '"' + '; expires=' + next_year;
	},
	getCookieValues:function(group) {
		var cookie_values = Array();
		var regex = new RegExp('(^|\\s)' + group + '="([^"]*)"', 'i');
		var match;
		if(match = regex.exec(document.cookie)) {
			var cookie_pairs = match[2].split('//');
			for(var i = 0; i < cookie_pairs.length; i++) {
				var a = cookie_pairs[i].split('::');
				var name = a[0], value = a[1];
				if(name != 'PHPSESSID') {
					cookie_values[name] = value;
				}
			}
		}
		return cookie_values;
	},
	initialize:function(env, subclassing) {
		NFLCIME.addEventListener('ModuleActivate', this);
		NFLCIME.addEventListener('ModuleDeactivate', this)
	},
	//--- Private variables
	cookieValueGroups:{}
}
} );
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
NFLCIME.dispatchEvent( { type:'ModuleAdd', module:
{
	id:'editor.ckeditor',
	type:'editor integration',
	onModuleActivate:function(evt) {
		var module = evt.module;
		if(module == this && !this.active) {
			this.active = true;
			var list = [];
			NFLCIME.dispatchEvent( { type:'WindowGetList', list:list } );
			for(var i = 0; i < list.length; i++) {
				var win = list[i];
				if(win.CKEDITOR) {
					this.attachCKEditorHandlers(win.CKEDITOR);
				} else {
					this.attachDOMHandler(win, 'load', 'onLoadCheckCKEditor');
				}
			}
			NFLCIME.addEventListener('WindowListen', this);
			NFLCIME.addEventListener('WindowIgnore', this)
			NFLCIME.addEventListener('FocusChanged', this, true);
			NFLCIME.addEventListener('ServiceApplicable', this, true);
			NFLCIME.addEventListener('CursorInsertHTML', this, true);
		} else if(module.type == 'encoding converter') {
			this.converter = module;
		}
	},
	onModuleDeactivate:function(evt) {
		var module = evt.module;
		if(module == this && this.active) {
			this.active = false;
			NFLCIME.removeEventListener('WindowListen', this);
			NFLCIME.removeEventListener('WindowIgnore', this);
			NFLCIME.removeEventListener('FocusChanged', this, true);
			NFLCIME.removeEventListener('ServiceApplicable', this, true);
			NFLCIME.removeEventListener('CursorInsertHTML', this, true);
		} else if(module.type == 'encoding converter') {
			if(this.converter == module) {
				this.converter = null;
			}
		}
	},
	onWindowListen:function(evt) {
		var win = evt.target;
		if(win.CKEDITOR) {
			this.attachCKEditorHandlers(win.CKEDITOR);
		} else {
			this.attachDOMHandler(win, 'load', 'onLoadCheckCKEditor');
		}
	},
	onWindowIgnore:function(evt) {
		var win = evt.target;
		if(win.CKEDITOR) {
			this.detachCKEditorHandlers(win.CKEDITOR);
		} else {
			this.detachDOMHandler(win, 'load', 'onLoadCheckCKEditor');
		}
	},
	onCursorInsertHTML:function(evt) {
		var edit = evt.target;
		var ckeditor = this.getElementEditor(edit);
		var html = evt.html;
		if(ckeditor) {
			ckeditor.insertHtml(html);
			return true;
		}
	},
	onServiceApplicable:function(evt) {
		var service = evt.service;
		var edit = evt.target;
		var from = evt.from;
		// don't handle if the this module is the one doing the asking
		if(from != this) {
			if(service == 'rt') {
				var ckeditor = this.getElementEditor(edit);
				if(ckeditor) {
					var body = ckeditor.document.getBody();
					if(body.hasListeners('beforepaste')) {
						// stop the rt module from handling paste events since CKEditor is handling them
						evt.applicable = false;
						return true;
					}
				}
			}
		}
	},
	onFocusChanged:function(evt) {
		var element = evt.target;
		if(element && element.tagName != 'TEXTAREA' && element.tagName != 'INPUT') {
			var doc = element.ownerDocument;
			var win = (doc.parentWindow) ? doc.parentWindow : doc.defaultView;
			var editor = this.getWindowEditor(win);
			if(editor) {
				// copy properties from the element replaced
				var body = win.document.body;
				var textarea = editor.element.$;
				for(var e = textarea; e && e.getAttribute; e = e.parentNode) {
					var services = e.getAttribute('NFLCIME')
					if(services) {
						body.setAttribute('NFLCIME', services);
						body.parentNode.setAttribute('NFLCIME', services);
						break;
					}
				}
				// give the language module a hint on what's the likely language (for detecting language during copy-and-paste)
				for(var e = textarea; e && e.getAttribute; e = e.parentNode) {
					var lang = e.getAttribute('lang')
					if(lang) {
						NFLCIME.dispatchEvent( { type:'LanguageSetHint', languageTag:lang } );
						break;
					}
				}
			}
		} else {
			// clear the hint
			NFLCIME.dispatchEvent( { type:'LanguageSetHint', languageTag:null } );
		}
	},
	onLoadCheckCKEditor:function(evt) {
		var doc = evt.target;
		if(!doc) {
			doc = evt.listener.document;
		}
		var win = (doc.parentWindow) ? doc.parentWindow : doc.defaultView;
		if(win.CKEDITOR) {
			this.attachCKEditorHandlers(win.CKEDITOR);
		}
	},
	detachCKEditorDOMHandler:function(object, eventName) {
		var listeners = object.getCustomData("_cke_nativeListeners")
		var listener = listeners[eventName];
		if(listener) {
			var element = object.$;
			switch(this.browser) {
				case 'ie':
					element.detachEvent('on' + eventName, listener);
					break;
				case 'firefox':
				case 'safari':
					element.removeEventListener(eventName, listener, false);
					break;
			}
		}
	},
	onInstanceReady:function(ckevt) {
		this.attachDOMHandlers(ckevt.editor);
		ckevt.editor.on("paste", this.onPaste, this, null, 1);
	},
	oninstanceDestroyed:function(ckevt) {
		this.detachDOMHandlers(ckevt.editor);
	},
	onPaste:function(ckevt) {
		// see if the rt service is active
		var win = this.getEditorWindow(ckevt.editor);
		var edit = win.document.body;
		var evt = { type:'ServiceApplicable', target:edit, service:'rt', applicable:false, from:this };
		NFLCIME.dispatchEvent(evt);
		if(evt.applicable) {
			// create a hidden div and drop the stuff there
			var div = document.createElement('DIV');
			div.style.display = 'none';
			div.innerHTML = ckevt.data.html;
			document.body.appendChild(div);
			var evt = { type:'RichTextRetrieveHTML', target:div, html:'', forPaste:true, pasteDestination:edit };
			NFLCIME.dispatchEvent(evt);
			document.body.removeChild(div);
			if(evt.html) {
				ckevt.data.html = evt.html;
			}
		}
	},
	//--- Private functions
	attachCKEditorHandlers:function(ckeditor) {
		ckeditor.on("instanceReady", this.onInstanceReady, this, null, 1);
		ckeditor.on("instanceDestroyed", this.oninstanceDestroyed, this, null, 1);
		var editors = ckeditor.instances;
		for(name in editors) {
			var editor = editors[name];
			this.attachDOMHandlers(editor);
		}
		this.ckeditorInstances.push(ckeditor);
	},
	detachCKEditorHandlers:function(ckeditor) {
		ckeditor.removeListener("instanceReady", this.onInstanceReady);
		ckeditor.removeListener("instanceDestroyed", this.oninstanceDestroyed);
		var editors = ckeditor.instances;
		for(name in editors) {
			var editor = editors[name];
			this.detachDOMHandlers(editor);
		}
		for(var i = this.ckeditorInstances.length - 1; i >= 0; i--) {
			if(this.ckeditorInstances[i] == ckeditor) {
				this.ckeditorInstances.splice(i, 1);
			}
		}
	},
	attachDOMHandlers:function(editor) {
		var win = this.getEditorWindow(editor);
		if(win) {
			NFLCIME.dispatchEvent( { type:'WindowListen', target:win } )
		}
	},
	detachDOMHandlers:function(editor) {
		var win = this.getEditorWindow(editor);
		if(win) {
			NFLCIME.dispatchEvent( { type:'WindowIgnore', target:win } )
		}
	},
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
						evt.listener = element;
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
	getElementEditor:function(element) {
		var doc = element.ownerDocument;
		var win = (doc.parentWindow) ? doc.parentWindow : doc.defaultView;
		return this.getWindowEditor(win);
	},
	getWindowEditor:function(win) {
		for(var i = 0; i < this.ckeditorInstances.length; i++) {
			var ckeditor = this.ckeditorInstances[i];
			var editors = ckeditor.instances;
			var name;
			for(name in editors) {
				var editor = editors[name];
				var editor_win = this.getEditorWindow(editor);
				if(editor_win == win) {
					return editor;
				}
			}
		}
		return null;
	},
	getEditorWindow:function(editor) {
		if(editor.window) {
			return editor.window.$;
		}
		return null;
	},
	initialize:function(env, subclassing) {
		this.browser = env.browser;
		this.closures = {};
		NFLCIME.addEventListener('ModuleActivate', this);
		NFLCIME.addEventListener('ModuleDeactivate', this)
	},
	//--- Private variables
	active:false,
	browser:'',
	ckeditorInstances:[],
	converter:null
}
} );
NFLCIME.dispatchEvent( { type:'ModuleAdd', module:
{
	id:'cursor',
	type:'core',
	onModuleActivate:function(evt) {
		var module = evt.module;
		if(module == this && !this.active) {
			this.active = true;
			// get list of windows for which IME is already activated and attach DOM handlers to them
			var list = [];
			NFLCIME.dispatchEvent( { type:'WindowGetList', list:list } );
			for(var i = 0; i < list.length; i++) {
				var win = list[i];
				this.attachDOMHandlers(win);
			}
			// listen for new windows
			NFLCIME.addEventListener('WindowListen', this);
			NFLCIME.addEventListener('WindowIgnore', this);
			NFLCIME.addEventListener('CursorMove', this);
			NFLCIME.addEventListener('CursorGetContext', this);
			NFLCIME.addEventListener('CursorGetFocusedEdit', this);
			NFLCIME.addEventListener('CursorSaveFocusedEdit', this);
			NFLCIME.addEventListener('CursorRestoreFocusedEdit', this);
			NFLCIME.addEventListener('CursorGetContainer', this);
			NFLCIME.addEventListener('CursorGetSelectedText', this);
			NFLCIME.addEventListener('CursorInsertText', this);
			NFLCIME.addEventListener('CursorInsertHTML', this);
			NFLCIME.addEventListener('CursorClearSelection', this);
		}
	},
	onModuleDeactivate:function(evt) {
		var module = evt.module;
		if(module == this && this.active) {
			this.active = false;
			var list = [];
			NFLCIME.dispatchEvent( { type:'WindowGetList', list:list } );
			for(var i = 0; i < list.length; i++) {
				var win = list[i];
				this.detachDOMHandlers(win);
			}
			NFLCIME.removeEventListener('WindowListen', this);
			NFLCIME.removeEventListener('WindowIgnore', this);
			NFLCIME.removeEventListener('CursorMove', this);
			NFLCIME.removeEventListener('CursorGetContext', this);
			NFLCIME.removeEventListener('CursorGetFocusedEdit', this);
			NFLCIME.removeEventListener('CursorSaveFocusedEdit', this);
			NFLCIME.removeEventListener('CursorRestoreFocusedEdit', this);
			NFLCIME.removeEventListener('CursorGetContainer', this);
			NFLCIME.removeEventListener('CursorGetSelectedText', this);
			NFLCIME.removeEventListener('CursorInsertText', this);
			NFLCIME.removeEventListener('CursorInsertHTML', this);
			NFLCIME.removeEventListener('CursorClearSelection', this);
		}
	},
	//--- Event handlers
	// Move the selection
	onCursorMove:function(evt) {
		var edit = evt.target;
		var move_end = evt.end;
		var move_start = evt.start;
		var doc = edit.ownerDocument;
		switch(this.browser) {
			case 'ie':
				// TODO: check to ensure the new selection doesn't end up outside the edit box
				var range = doc.selection.createRange();
				// move the end point first if it's being moved forward, so the starting point won't end up moving past it
				if(move_end > 0) {
					if (move_end != 0) {
						range.moveEnd('character', move_end);
					}
					if (move_start != 0) {
						range.moveStart('character', move_start);
					}
				} else {
					if (move_start != 0) {
						range.moveStart('character', move_start);
					}
					if (move_end != 0) {
						range.moveEnd('character', move_end);
					}
				}
				range.select();
				break;
			case 'firefox':
			case 'safari':
				if(edit.tagName == 'TEXTAREA' || edit.tagName == 'INPUT') {				
					if(move_end > 0) {
						edit.selectionEnd += move_end;
						edit.selectionStart += move_start;
					} else {
						edit.selectionStart += move_start;
						edit.selectionEnd += move_end;
					}
				} else {
					var win = doc.defaultView;
					var selection = win.getSelection();
					var range = selection.getRangeAt(0);
					if(move_end > 0) {
						this.moveRangeEnd(edit, range, move_end);
						this.moveRangeStart(edit, range, move_start);
					} else {
						this.moveRangeStart(edit, range, move_start);
						this.moveRangeEnd(edit, range, move_end);
					}
					// need to do this for safari as modifying the range alone doesn't change the selection
					if(this.browser == 'safari') {
						var new_range = range.cloneRange();
						selection.removeAllRanges();
						selection.addRange(new_range);
					}
				}
				break;
		}
		if(edit == this.focusedEdit) {
			this.previousCursorPosition = this.getCursorPosition(edit);
		}
	},
	onCursorSaveFocusedEdit:function(evt) {
		var edit = evt.target;
		this.previousFocusedEdit = edit;
	},
	onCursorRestoreFocusedEdit:function(evt) {
		if(this.previousFocusedEdit) {
			var edit = this.previousFocusedEdit;
			var doc = edit.ownerDocument;
			var win = (doc.parentWindow) ? doc.parentWindow : doc.defaultView;
			win.focus();
			edit.focus();
			evt.target = this.previousFocusedEdit;
		}
	},
	onCursorGetContainer:function(evt) {
		var edit = evt.target;
		switch(this.browser) {
			case 'ie':
				if(edit.tagName == 'TEXTAREA' || edit.tagName == 'INPUT') {
					evt.container = edit;				
				} else {
					var range = document.selection.createRange();
					evt.container = range.parentElement();
				}
				break;
			case 'firefox':
			case 'safari':
				if(edit.tagName == 'TEXTAREA' || edit.tagName == 'INPUT') {
					evt.container = edit;
				} else {
					var doc = edit.ownerDocument;
					var win = doc.defaultView;
					var selection = win.getSelection();
					if(selection.rangeCount > 0) {
						var range = selection.getRangeAt(0);
						var container = range.commonAncestorContainer;
						evt.container = (container.nodeType == 1) ? container : container.parentNode;
					}
				}
				break;
		}
	},
	// Get a certain number of character before and after the selection
	onCursorGetContext:function(evt) {
		var edit = evt.target;
		var behind_count = evt.behindCount;
		var ahead_count= evt.aheadCount;
		evt.textBehind = '';
		evt.textAhead = '';
		switch(this.browser) {
			case 'ie':
				var range = document.selection.createRange();
				var edit_parent = edit.parentNode;
				range = range.duplicate();
				var bookmark = range.getBookmark();
				range.collapse(true);
				for(var i = 0, outside = false; !outside && i < behind_count; i++) {
					range.moveStart('character', -1);
					outside = true;
					for(var p = range.parentElement(); p; p = p.parentNode) {
						if(p == edit) {
							evt.textBehind = range.text;
							outside = false;
							break;
						}
					}
				}
				range.moveToBookmark(bookmark);
				range.collapse(false);
				for(var i = 0, outside = false; !outside && i < ahead_count; i++) {
					range.moveEnd('character', +1);
					outside = true;
					for(var p = range.parentElement(); p; p = p.parentNode) {
						if(p == edit) {
							evt.textAhead = range.text;
							outside = false;
							break;
						}
					}
				}
				range.moveToBookmark(bookmark);
				break;
			case 'firefox':
			case 'safari':
				if(edit.tagName == 'TEXTAREA' || edit.tagName == 'INPUT') {
					var value = edit.value;
					var behind_end = edit.selectionStart;
					var behind_start = Math.max(0, edit.selectionStart - behind_count);
					var ahead_start = edit.selectionEnd;
					var ahead_end = Math.min(value.length, edit.selectionEnd + ahead_count);
					evt.textAhead = value.substring(ahead_start, ahead_end);
					evt.textBehind = value.substring(behind_start, behind_end);
				} else {
					var doc = edit.ownerDocument;
					var win = doc.defaultView;
					var selection = win.getSelection();
					var range = selection.getRangeAt(0);
					var behind_range = range.cloneRange();
					behind_range.collapse(true);
					this.moveRangeStart(edit, behind_range, -behind_count);
					evt.textBehind = behind_range.toString();
					var ahead_range = range.cloneRange();
					ahead_range.collapse(true);
					this.moveRangeEnd(edit, ahead_range, +ahead_count);
					evt.textAhead = ahead_range.toString();
				}
				break;
		}
	},
	onCursorGetFocusedEdit:function(evt) {
		if(this.focusedEdit && !this.windowLostFocus) {
			evt.target = this.focusedEdit;
		}
	},
	// Insert text at the cursor, removing any selected text
	onCursorInsertText:function(evt) {
		var edit = evt.target;
		var text = evt.text;
		var doc = edit.ownerDocument;
		switch(this.browser) {
			case 'ie':
				// TODO: check to see if the range is in the edit
				var range = doc.selection.createRange();
				if(range.text.length > 0) {
					doc.selection.clear();
				}
				if(text) {
					range.text = text;
					range.collapse(false);
					range.scrollIntoView();
				}
				break;
			case 'firefox':
			case 'safari':
				if(edit.tagName == 'TEXTAREA' || edit.tagName == 'INPUT') {
					if(this.browser == 'firefox') {
						if(text) {
							// change \u000d to \u000a\u000d
							text = text.replace(/([^\u000a]|^)\u000d/, '$1\u000a');
							for(var i = 0; i < text.length; i++) {
								var c = text.charCodeAt(i);
								var evt = doc.createEvent('KeyEvents');
								evt.initKeyEvent('keypress', true, true, win, false, false, false, false, 0, c);
								edit.dispatchEvent(evt);
							}
						} else {
							// delete the selection
							if(edit.selectionStart != edit.selectionEnd) {
								var evt = doc.createEvent('KeyEvents');
								evt.initKeyEvent('keypress', true, true, win, false, false, false, false, 0x08, 0);
								edit.dispatchEvent(evt);							
							}
						}
					} else {					
						var value = edit.value;
						var beginning = value.substr(0, edit.selectionStart) + text;
						var end = value.substr(edit.selectionEnd);
						edit.value = beginning;
						edit.scrollTop = edit.scrollHeight;
						edit.scrollLeft = edit.scrollWidth;
						edit.value = beginning + end;
						edit.setSelectionRange(beginning.length, beginning.length);
					}
				} else {
					var win = doc.defaultView;
					var selection = win.getSelection();
					var range = selection.getRangeAt(0);
					if(range.toString().length > 0) {
						range.deleteContents();
					}
					if(text) {
						var text_node = doc.createTextNode(text);
						range.insertNode(text_node);
						// now we need to normalize the text node so complex text will join correctly
						// first, figure out where the selection will be after the normalization
						var cursor = this.findNormalizedPosition(text_node, text.length);
						// normalize the parent node
						var parent = text_node.parentNode;
						parent.normalize();
						// restore the cursor
						var normalized_node = parent.childNodes[cursor.nodeIndex];
						range.selectNode(normalized_node);
						range.setStart(normalized_node, cursor.textIndex);
						range.setEnd(normalized_node, cursor.textIndex);
						selection.removeAllRanges();
						selection.addRange(range);
					}
					// scroll the container if the caret isn't visible, inserting a span so we know where it is
					var caret = doc.createElement('SPAN');
					caret.textContent = '\u200d';	// ZWJ
					range.insertNode(caret);
					var top = caret.offsetTop, bottom = top + caret.offsetHeight;
					var left = caret.offsetLeft, right = left + caret.offsetWidth;
					for(view = caret.offsetParent; view && view.nodeType == 1; view = view.parentNode) {
						var view_top = view.scrollTop, view_bottom = view_top + view.clientHeight;
						var view_left = view.scrollLeft, view_right = view_left + view.clientWidth;
						if(view == doc.body) {
							var html = view.parentNode;
							view_bottom = view_top + html.clientHeight;
							view_right = view_left + html.clientWidth;
						}
						if(top < view_top) {
							view.scrollTop += top - view_top;
						} else if(bottom > view_bottom) {
							view.scrollTop += bottom - view_bottom;
						}
						if(left < view_left) {
							view.scrollLeft += left - view_left;
						} else if(right > view_right) {
							view.scrollLeft += right - view_right;
						}
						var delta_x = view.offsetLeft - view.scrollLeft;
						var delta_y = view.offsetTop - view.scrollTop;
						top += delta_x;
						left += delta_y;
					}
					// rejoin text node that's been been cut into two
					var caret_parent = caret.parentNode;
					var prev = caret.previousSibling, next = caret.nextSibling;
					if(prev && next && prev.nodeType == 3 && next.nodeType == 3) {
						var cursor = this.findNormalizedPosition(prev, prev.nodeValue.length);
						caret_parent.normalize();
						var normalized_node = caret_parent.childNodes[cursor.nodeIndex];
						range.selectNode(normalized_node);
						range.setStart(normalized_node, cursor.textIndex);
						range.setEnd(normalized_node, cursor.textIndex);
						selection.removeAllRanges();
						selection.addRange(range);
					}
					caret_parent.removeChild(caret);
				}
				break;
		}
		if(edit == this.focusedEdit) {
			this.previousCursorPosition = this.getCursorPosition(edit);
		}
	},
	// Insert HTML at the cursor
	onCursorInsertHTML:function(evt) {
		var edit = evt.target;
		var html = evt.html;
		var plain_text = evt.text;
		var doc = edit.ownerDocument;
		if(edit.tagName == 'TEXTAREA' || edit.tagName == 'INPUT') {
			this.onCursorInsertText(evt);
		} else {
			switch(this.browser) {
				case 'ie':
					// TODO: check to see if the range is in the edit
					var range = doc.selection.createRange();
					if(range.text.length > 0) {
						doc.selection.clear();
					}
					range.pasteHTML(html);
					range.collapse(false);
					range.scrollIntoView();
					break;
				case 'firefox':
				case 'safari':
					var win = doc.defaultView;
					var selection = win.getSelection();
					var range = selection.getRangeAt(0);
					range.deleteContents();
					var fragment = range.createContextualFragment(html);
					var last = fragment.lastChild;
					range.insertNode(fragment);
					// set cursor to behind last item
					if(last) {
						selection.collapse(last, (last.nodeType == 3) ? last.nodeValue.length : 1);
						var element = (last.nodeType == 3) ? last.parentNode : last;
						element.scrollIntoView(false);
					}
					break;
			}
		}
		if(edit == this.focusedEdit) {
			this.previousCursorPosition = this.getCursorPosition(edit);
		}
	},
	onCursorInsertTag:function(evt) {
		var edit = evt.target;
		var tag = evt.html;
		var doc = edit.ownerDocument;
		if(edit.tagName == 'TEXTAREA' || edit.tagName == 'INPUT') {
		} else {
			switch(this.browser) {
				case 'ie':
					// TODO: check to see if the range is in the edit
					var range = doc.selection.createRange();
					if(range.text.length > 0) {
						doc.selection.clear();
					}
					range.pasteHTML(tag);
					range.collapse(true);
					range.scrollIntoView();
					break;
				case 'firefox':
				case 'safari':
					var win = doc.defaultView;
					var selection = win.getSelection();
					var range = selection.getRangeAt(0);
					range.deleteContents();
					var fragment = range.createContextualFragment(tag);
					var last = fragment.lastChild;
					range.insertNode(fragment);
					// set cursor to within last item
					if(last) {
						range.setStart(last, 0);
						range.setEnd(last, 0);
						selection.removeAllRanges();
						selection.addRange(range);
						var element = (last.nodeType == 3) ? last.parentNode : last;
						element.scrollIntoView(false);
					}
					break;
			}
		}
		if(edit == this.focusedEdit) {
			//this.previousCursorPosition = this.getCursorPosition(edit);
		}
	},
	onCursorGetSelectedText:function(evt) {
		var edit = evt.target;
		var text = evt.text;
		var doc = edit.ownerDocument;
		switch(this.browser) {
			case 'ie':
				var range = doc.selection.createRange();
				evt.text = range.text;
				break;
			case 'firefox':
			case 'safari':
				if(edit.tagName == 'TEXTAREA' || edit.tagName == 'INPUT') {
					evt.text = edit.value.substring(edit.selectionStart, edit.selectionEnd);
				} else {
					var win = doc.defaultView;
					var selection = win.getSelection();
					if(selection.rangeCount > 0) {
						var range = selection.getRangeAt(0);
						evt.text = range.toString();
					} else {
						evt.text = '';
					}
				}
				break;
		}
	},
	// Clear selected text
	onCursorClearSelection:function(evt) {
		var edit = evt.target;
		var doc = edit.ownerDocument;
		switch(this.browser) {
			case 'ie':
				var range = doc.selection.createRange();
				var parent = range.parentElement();
				if(range.text.length > 0) {
					doc.selection.clear();
				}
				range.collapse(false);
				break;
			case 'firefox':
			case 'safari':
				if(edit.tagName == 'TEXTAREA' || edit.tagName == 'INPUT') {
					var sel_start = edit.selectionStart, sel_end = edit.selectionEnd;
					edit.value = edit.value.substr(0, sel_start) + edit.value.substr(sel_end);
					edit.selectionEnd = sel_start;
				} else {
					var win = doc.defaultView;
					var selection = win.getSelection();
					var range = selection.getRangeAt(0);
					range.deleteContents();
				}
		}
	},
	// Fire an onchange event after element blur
	fireElementChangeEvent: function() {
		var element;
		if(this.focusedEdit) {
			element = this.focusedEdit;
		} else {
			element = this.previousFocusedEdit;
		}
		if (element) {
			var doc = element.ownerDocument;
			var changeEvent;
			if (doc.createEventObject) { // IE
				changeEvent = doc.createEventObject();
				element.fireEvent('onchange', changeEvent);
			} else {
				changeEvent = doc.createEvent('HTMLEvents');
				changeEvent.initEvent('change', true, true);
				element.dispatchEvent(changeEvent);
			}		
		}
	},
	// Keep track of which edit control has focus
	onElementFocus:function(evt) {
		var element = evt.target;
		if(element && element.nodeType == 9) {
			element = element.body;
		}
		if(element && element.tagName == 'HTML') {
			element = element.ownerDocument.body;
		}
		if(!element || element.tagName != 'IFRAME') {
			if(this.focusedEdit != element) {
				var prev = this.focusedEdit;
				if(!this.isEditControl(element)) {
					element = null;
				}
				this.focusedEdit = element;
				NFLCIME.dispatchEvent( { type:'FocusChanged', target:this.focusedEdit, previousTarget:prev } );
				if(this.focusedEdit) {
					this.previousCursorPosition = this.getCursorPosition(this.focusedEdit);
					this.scheduleCursorCheck(true);
				} else {
					this.stopCursorCheck();
				}
			}
			if(this.onElementBlurTimeoutId) {
				clearTimeout(this.onElementBlurTimeoutId);
				this.onElementBlurTimeoutId = 0;
			}
		}
	},
	onElementBlurTimeoutId:0,
	onElementBlur:function(evt) {
		var element = evt.target;
		if (!element) return;
		if (element.hasAttribute && element.hasAttribute('nflcime')) this.fireElementChangeEvent();
		if(element.nodeType == 9) {
			element = element.body;
		}
		if(element && element.tagName != 'IFRAME') {
			if(this.focusedEdit && !this.windowLostFocus) {
				NFLCIME.dispatchEvent( { type:'CursorSaveFocusedEdit', target:this.focusedEdit } );
				// don't notify yet, since a focus event might follow immediately
				if(this.onElementBlurTimeoutId) {
					clearTimeout(this.onElementBlurTimeoutId);
				}
				var closure = this.closures['onElementBlurNotify'];
				if(!closure) {
					var self = this;
					closure = function() { self.onElementBlurNotify() };
					this.closures['onElementBlurNotify'] = closure;
				}
				this.onElementBlurTimeoutId = setTimeout(closure, 50);
			}
		}
	},
	onElementBlurNotify:function() {
		this.fireElementChangeEvent();
		var prev = this.focusedEdit;
		this.focusedEdit = null;
		NFLCIME.dispatchEvent( { type:'FocusChanged', target:this.focusedEdit, previousTarget:prev } );
		this.onElementBlurTimeoutId = 0;
		this.stopCursorCheck();
	},
	// Check to see if the previously focused element regained focus when the window regained focus
	onWindowFocus:function(evt) {
		if(!evt.target.nodeType) {
			if(this.windowLostFocus && this.focusedEdit) {
				if(!this.focusedEdit.hasFocus || this.focusedEdit.hasFocus()) {
					NFLCIME.dispatchEvent( { type:'FocusChanged', target:this.focusedEdit, previousTarget:null } );
				} else {
					this.focusedEdit = null;
				}
			}
			this.windowLostFocus = false;
		}
	},
	// Focus is lost if the window containing the focused element loses focus
	onWindowBlur:function(evt) {
		if(!evt.target.nodeType) {
			if(this.focusedEdit && evt.target.document == this.focusedEdit.ownerDocument) {
				NFLCIME.dispatchEvent( { type:'FocusChanged', target:null, previousTarget:this.focusedEdit } );
			}
			this.windowLostFocus = true;
		}
	},
	onWindowListen:function(evt) {
		var win = evt.target;
		this.attachDOMHandlers(win);
	},
	onWindowIgnore:function(evt) {
		var win = evt.target;
		var doc = win.doc;
		this.detachDOMHandlers(win);

		// make sure we're not hanging onto objects from the window being ignored
		if(this.focusedEdit) {
			if(this.focusedEdit.ownerDocument == doc) {
				var prev = this.focusedEdit;
				this.focusedEdit = null;
				NFLCIME.dispatchEvent( { type:'FocusChanged', target:this.focusedEdit, previousTarget:prev } );
			}
		}
		if(this.previousFocusedEdit) {
			if(this.previousFocusedEdit.ownerDocument == doc) {
				this.previousFocusedEdit = null;
			}
		}
		if(this.previousCursorPosition) {
			switch(this.previousCursorPosition.type) {
				case 'ie range':
					var parent = this.previousCursorPosition.data.parentElement();
					if(!parent || parent.ownerDocument == doc) {
						this.previousCursorPosition = null;
					}
					break;
				case 'dom selection indices':
					var parent = this.previousCursorPosition.data.edit;
					if(!parent || parent.ownerDocument == doc) {
						this.previousCursorPosition = null;
					}
					break;
				case 'dom range':
					var parent = this.previousCursorPosition.data.commonAncestorContainer;
					if(!parent || parent.ownerDocument == doc) {
						this.previousCursorPosition = null;
					}
					break;
			}
			
		}
	},
	// See if the cursor has moved
	onKeyDown:function(evt) {
		this.scheduleCursorCheck();
	},
	onMouseDown:function(evt) {
		var target = evt.target;
		var doc = (target.nodeType == 1) ? target.ownerDocument : target;
		this.attachDOMHandler(doc, 'mousedown', 'onMouseMove');
		this.scheduleCursorCheck(false);
	},
	onMouseUp:function() {
		this.detachDOMHandler(doc, 'mousedown', 'onMouseMove');
	},
	onMouseMove:function() {
		this.checkCursorPosition(false);
	},
	//--- Private functions
	// Add handlers for activate and deactivate event so the focus can be tracked
	attachDOMHandlers:function(win) {
		var doc = win.document;
		this.attachDOMHandler(doc, 'keydown', 'onKeyDown');
		this.attachDOMHandler(doc, 'mousedown', 'onMouseDown');
		this.attachDOMHandler(doc, 'mouseup', 'onMouseDown');
		switch(this.browser) {
			case 'ie':
				this.attachDOMHandler(doc, 'focusin', 'onElementFocus');
				this.attachDOMHandler(doc, 'focusout', 'onElementBlur');
				break;
			case 'firefox':
				this.attachDOMHandler(doc, 'focus', 'onElementFocus', true);
				this.attachDOMHandler(doc, 'blur', 'onElementBlur', true);
				this.attachDOMHandler(win, 'focus', 'onWindowFocus');
				this.attachDOMHandler(win, 'blur', 'onWindowBlur');
				break;
			case 'safari':
				this.attachDOMHandler(doc, 'DOMFocusIn', 'onElementFocus');
				this.attachDOMHandler(doc, 'DOMFocusOut', 'onElementBlur');
				this.attachDOMHandler(win, 'focus', 'onWindowFocus');
				this.attachDOMHandler(win, 'blur', 'onWindowBlur');
				break;
		}
	},
	detachDOMHandlers:function(win) {
		var doc = win.document;
		this.attachDOMHandler(doc, 'keydown', 'onKeyDown');
		this.attachDOMHandler(doc, 'mousedown', 'onMouseDown');
		this.attachDOMHandler(doc, 'mouseup', 'onMouseDown');
		this.attachDOMHandler(doc, 'mousemove', 'onMouseMove');
		switch(this.browser) {
			case 'ie':
				this.detachDOMHandler(doc, 'focusin', 'onElementFocus');
				this.detachDOMHandler(doc, 'focusout', 'onElementBlur');
				break;
			case 'firefox':
				this.detachDOMHandler(doc, 'focus', 'onElementFocus', true);
				this.detachDOMHandler(doc, 'blur', 'onElementBlur', true);
				this.detachDOMHandler(win, 'focus', 'onWindowFocus');
				this.detachDOMHandler(win, 'blur', 'onWindowBlur');
				break;
			case 'safari':
				this.detachDOMHandler(doc, 'DOMFocusIn', 'onElementFocus');
				this.detachDOMHandler(doc, 'DOMFocusOut', 'onElementBlur');
				this.detachDOMHandler(win, 'focus', 'onWindowFocus');
				this.detachDOMHandler(win, 'blur', 'onWindowBlur');
				break;
		}
	},
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
	// Whether an element is editable
	isEditControl:function(element) {
		if(element.tagName == 'TEXTAREA') {
			return !element.disabled;
		} else if(element.tagName == 'INPUT' && (element.type == 'text' || element.type == 'file' || element.type == 'password')) {
			return !element.disabled;
		} else if(element.contentEditable == 'true') {
			return !element.disabled;
		} else if(element.ownerDocument && element.ownerDocument.designMode == 'on') {
			return !element.disabled;
		}
		return false;
	},
	// Move the end-point of a DOM range object
	moveRangeEnd:function(container, range, amount) {
		if(amount == 0) {
			return;
		}
		var result = (amount < 0) ? this.findIndexBehind(container, range.endContainer, range.endOffset, -amount, true)
					  : this.findIndexAhead(container, range.endContainer, range.endOffset, amount, true);
		range.setEnd(result.node, result.index);
	},
	// Move the starting-point of a DOM range object
	moveRangeStart:function(container, range, amount) {
		if(amount == 0) {
			return;
		}
		var result = (amount < 0) ? this.findIndexBehind(container, range.startContainer, range.startOffset, -amount, true)
					  : this.findIndexAhead(container, range.startContainer, range.startOffset, amount, true);
		range.setStart(result.node, result.index);
	},
	// Find a text node and index at a given distance ahead of the given node and index
	findIndexAhead:function(container, node, index, amount, canScanUp) {
		var result = { node:node, index:index, amount:0 };
		if(node.nodeType == 3) {
			var text = node.nodeValue;
			result.index = Math.min(text.length, index + amount);
			result.amount = result.index - index;
		} else {
			var amount_found = 0;
			for(var c = node.childNodes[index]; c; c = c.nextSibling) {
				result = this.findIndexAhead(container, c, 0, amount - amount_found, false);
				amount_found += result.amount;
				result.amount = amount_found;
				if(amount_found == amount) {
					break;
				}
			}
		}
		if(result.amount < amount) {
			// don't go pass the container
			if(node != container && canScanUp) {
				// scan parent node, starting from the next node
				var node_index = this.findNodeIndex(node);
				var new_result =  this.findIndexAhead(container, node.parentNode, node_index + 1, amount - result.amount, true);
				new_result.amount += result.amount;
				result = new_result;
			}
		}
		return result;
	},
	// Find a text node and index at a given distance behind the given node and index
	findIndexBehind:function(container, node, index, amount, canScanUp) {
		var result = { node:node, index:index, amount:0 };
		if(node.nodeType == 3) {
			result.index = Math.max(0, index - amount);
			result.amount = index - result.index;
		} else {
			if(index > 0) {
				var amount_found = 0;
				for(var c = node.childNodes[index - 1]; c; c = c.previousSibling) {
					var end_index;
					if(c.nodeType == 3) {
						end_index = c.nodeValue.length;
					} else {
						end_index = c.childNodes.length;
					}
					result = this.findIndexBehind(container, c, end_index, amount - amount_found, false);
					amount_found += result.amount;
					result.amount = amount_found;
					if(amount_found == amount) {
						break;
					}
				}
			}
		}
		if(result.amount < amount) {
			// don't go pass the container
			if(node != container && canScanUp) {
				// scan parent node, starting from the previous node
				var node_index = this.findNodeIndex(node);
				var new_result =  this.findIndexBehind(container, node.parentNode, node_index, amount - result.amount, true);
				new_result.amount += result.amount;
				result = new_result;
			}
		}
		return result;
	},
	// Calculate new indices after neighboring textnodes are fused during normalization
	findNormalizedPosition:function(node, index) {
		var text_index = index;
		var first_text_node = node;
		for(var c = node.previousSibling; c; c = c.previousSibling) {
			if(c.nodeType == 3) {
				text_index += c.nodeValue.length;
				first_text_node = c;
			} else {
				break;
			}
		}
		var node_index = this.findNodeIndex(first_text_node);
		return { nodeIndex:node_index, textIndex:text_index };
	},
	// Find the index of a node
	findNodeIndex:function(node) {
		for(var i = 0, c = node.parentNode.firstChild; c; i++, c = c.nextSibling) {
			if(c == node) {
				return i;
			}
		}
	},
	scheduleCursorCheck:function(continuous) {
		if(continuous) {
			if(!this.cursorCheckIntervalID) {
				var closure = this.closures['checkCursorPositionInterval'];
				if(!closure) {
					var self = this;
					var closure = function() {
						self.checkCursorPosition();
					}
					this.closures['checkCursorPositionInterval'] = closure;
				}
				this.cursorCheckIntervalID = setInterval(closure, 100);
			}
		} else {
			if(!this.cursorCheckTimeoutID) {
				var closure = this.closures['checkCursorPositionTimeout'];
				if(!closure) {
					var self = this;
					var closure = function() {
						self.checkCursorPosition();
						self.cursorCheckTimeoutID = 0;
					}
					this.closures['checkCursorPositionTimeout'] = closure;
				}
				this.cursorCheckTimeoutID = setTimeout(closure, 0);
			}
		}
	},
	stopCursorCheck:function() {
		if(this.cursorCheckTimeoutID) {
			clearTimeout(this.cursorCheckTimeoutID);
			this.cursorCheckIntervalID = 0;
		}
		if(this.cursorCheckIntervalID) {
			clearInterval(this.cursorCheckIntervalID);
			this.cursorCheckIntervalID = 0;
		}
	},
	checkCursorPosition:function() {
		if(this.focusedEdit && !this.windowLostFocus) {
			var new_pos = this.getCursorPosition(this.focusedEdit);
			var old_pos = this.previousCursorPosition;
			if(!this.compareCursorPosition(new_pos, old_pos)) {
				if(old_pos) {
					NFLCIME.dispatchEvent( { type:'CursorMoved', target:this.focusedEdit } );
					this.disposeCursorPosition(old_pos);
				}
				this.previousCursorPosition = new_pos;
			} else {
				this.disposeCursorPosition(new_pos);
			}
		}
	},
	getCursorPosition:function(edit) {
		try {
			var obj = {};
			switch(this.browser) {
				case 'ie':
					var doc = edit.ownerDocument;
					var range = doc.selection.createRange();
					if(range && range.duplicate) {
						obj.data = range.duplicate();
						obj.type = 'ie range';
					} else {
						obj.type = 'null';
					}
					break;
				case 'firefox':
				case 'safari':
					if(edit.tagName == 'TEXTAREA' || edit.tagName == 'INPUT') {
						obj.data = { edit:edit, selectionStart:edit.selectionStart, selectionEnd:edit.selectionEnd };
						obj.type = 'dom selection indices';
					} else {
						var doc = edit.ownerDocument;
						var win = doc.defaultView;
						var selection = win.getSelection();
						if(selection.rangeCount > 0) {
							var range = selection.getRangeAt(0);
							obj.data = range.cloneRange();
							obj.type = 'dom range';
						} else {
							obj.type = 'null';
						}
					}
					break;
			}
			return obj;
		} catch(e) {
			return null;
		}
	},
	compareCursorPosition:function(a, b) {
		if(!a || !b) {
			return false;
		}
		if(a.type != b.type) {
			return false;
		}
		switch(a.type) {
			case 'ie range':
				return a.data.isEqual(b.data);
			case 'dom selection indices':
				return (a.data.edit == b.data.edit && a.data.selectionStart == b.data.selectionStart && a.data.selectionEnd == b.data.selectionEnd);
			case 'dom range':
				// need the try block in case a and b are in different block
				try {
					return ((a.data.compareBoundaryPoints(Range.END_TO_END, b.data) == 0) && (a.data.compareBoundaryPoints(Range.START_TO_START, b.data) == 0));
				} catch(e) {
					return false;
				}
		}
	},
	disposeCursorPosition:function(p) {
		if(p) {
			switch(p.type) {
				case 'dom range':
					p.data.detach();
			}
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
	browser:null,
	closures:null,
	focusedEdit:null,
	previousFocusedEdit:null,
	windowLostFocus:false,
	previousCursorPosition:null,
	cursorCheckIntervalID:0,
	cursorCheckTimeoutID:0
}
} );
NFLCIME.dispatchEvent( { type:'ModuleAdd', module:
{
	id:'kb',
	type:'core',
	dependency:['cursor'],
	//--- Event handlers
	// Start handling DOM event when module is activated
	onModuleActivate:function(evt) {
		var module = evt.module;
		if(module == this) {
			if(!this.active) {
				this.active = true;
				// get list of windows for which IME is already activated and attach DOM handlers to them
				var list = [];
				NFLCIME.dispatchEvent( { type:'WindowGetList', list:list } );
				for(var i = 0; i < list.length; i++) {
					var win = list[i];
					this.attachDOMHandlers(win);
				}
				// listen for new windows
				NFLCIME.addEventListener('WindowListen', this);
				NFLCIME.addEventListener('WindowIgnore', this);
				NFLCIME.addEventListener('KeyboardGetStates', this);
				NFLCIME.addEventListener('KeyboardSetStates', this);
				NFLCIME.addEventListener('KeyboardGetPossibleKeys', this);
				NFLCIME.addEventListener('KeyboardGetDeadKeys', this);
				NFLCIME.addEventListener('CursorMoved', this);
				NFLCIME.dispatchEvent( { type:'KeyboardStatesChanged' } );
			}
		} else {
			// deactivate this layout if another one is activated
			if(module.type == 'keyboard layout') {
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
				var list = [];
				NFLCIME.dispatchEvent( { type:'WindowGetList', list:list } );
				for(var i = 0; i < list.length; i++) {
					var win = list[i];
					this.detachDOMHandlers(win);
				}
				this.physicalKeyboardStates.altKey = false;
				this.physicalKeyboardStates.ctrlKey = false;
				this.physicalKeyboardStates.shiftKey = false;
				this.clearVirtualKeys(true);
				NFLCIME.removeEventListener('WindowListen', this);
				NFLCIME.removeEventListener('WindowIgnore', this);
				NFLCIME.removeEventListener('KeyboardGetStates', this);
				NFLCIME.removeEventListener('KeyboardSetStates', this);
				NFLCIME.removeEventListener('KeyboardGetPossibleKeys', this);
				NFLCIME.removeEventListener('KeyboardGetDeadKeys', this);
				NFLCIME.removeEventListener('CursorMoved', this);
			}
		}
	},
	// Add DOM handlers
	onWindowListen:function(evt) {
		var win = evt.target;
		this.attachDOMHandlers(win);
	},
	// Remove DOM handlers
	onWindowIgnore:function(evt) {
		var win = evt.target;
		this.detachDOMHandlers(win);
	},
	onKeyboardGetStates:function(evt) {
		evt.states.altKey = this.combinedKeyboardStates.altKey;
		evt.states.ctrlKey = this.combinedKeyboardStates.ctrlKey;
		evt.states.shiftKey = this.combinedKeyboardStates.shiftKey;
		evt.states.capsLock = this.combinedKeyboardStates.capsLock;
		evt.states.plane = this.combinedKeyboardStates.plane;
	},
	onKeyboardSetStates:function(evt) {
		if(evt.states.altKey != undefined) this.virtualKeyboardStates.altKey = !this.physicalKeyboardStates.altKey && evt.states.altKey;
		if(evt.states.ctrlKey != undefined) this.virtualKeyboardStates.ctrlKey = !this.physicalKeyboardStates.ctrlKey && evt.states.ctrlKey;
		if(evt.states.shiftKey != undefined) this.virtualKeyboardStates.shiftKey = !this.physicalKeyboardStates.shiftKey && evt.states.shiftKey;
		if(evt.states.capsLock != undefined) this.virtualKeyboardStates.capsLock = !this.physicalKeyboardStates.capsLock && evt.states.capsLock;
		this.dispatchKeyboardStateChangeEvent();
	},
	onKeyboardGetPossibleKeys:function(evt) {
		if(this.multikeyCombinations && this.currentContext) {
			var from;
			var mappings = this.getKeyMappings();
			if(mappings) {
				var prefix = this.currentContext
				for(from in this.multikeyCombinations) {
					if(from.indexOf(prefix) == 0 && prefix.length < from.length) {
						var next = from.substr(prefix.length);
						var code;
						for(code in mappings) {
							var entry = mappings[code];
							var character = (typeof(entry) == 'object') ? entry.context : entry;
							if(next == character) {
								var to = this.multikeyCombinations[from];
								evt.keyCodes.push(parseInt(code));
								evt.characters.push((typeof(to) == 'object') ? to.insert : to);
							}
						}
					}
				}
			}
		}
	},
	onKeyboardGetDeadKeys:function(evt) {
		if(this.multikeyCombinations) {
			var mappings = this.getKeyMappings();
			if(mappings) {
				var code;
				for(code in mappings) {
					var entry = mappings[code];
					if(typeof(entry) == 'object' && !entry.insert) {
						var character = entry.context;
						for(from in this.multikeyCombinations) {
							if(from.indexOf(character) == 0) {
								evt.keyCodes.push(parseInt(code))
							}
						}
					}
				}
			}
		}
	},
	onCursorMoved:function(evt) {
		this.clearContext();
	},
	// Translate key code to characters
	onKeyDown:function(evt) {
		var state_key = true;
		switch(evt.keyCode) {
			case 0x12: // alt
			case 0x11: // ctrl
			case 0x10: // shift
				this.physicalKeyboardStates.altKey = evt.altKey;
				this.physicalKeyboardStates.ctrlKey = evt.ctrlKey;
				this.physicalKeyboardStates.shiftKey = evt.shiftKey;
				// if the physical key is pressed, then the virtual key is off
				if(this.physicalKeyboardStates.altKey) this.virtualKeyboardStates.altKey = false;
				if(this.physicalKeyboardStates.ctrlKey) this.virtualKeyboardStates.ctrlKey = false;
				if(this.physicalKeyboardStates.shiftKey) this.virtualKeyboardStates.shiftKey = false;
				break;
			case 0x14: // capslock
				if(!this.capsLockPressed) {
					this.physicalKeyboardStates.capsLock = !this.physicalKeyboardStates.capsLock;
					this.capsLockPressed = true;
					if(this.physicalKeyboardStates.capsLock) this.virtualKeyboardStates.capsLock = false;
				}
				break;
			default:
				state_key = false;
				break;
		}
		this.keyCode = 0;
		var edit = this.getFocusedEdit();
		if(edit && this.isServiceApplicable(edit)) {
			if(state_key) {
				this.dispatchKeyboardStateChangeEvent();
			} else {
				this.keyCode = evt.keyCode;
				var key = this.translateKey(evt.keyCode);
				// fire off an event indicating a key was handled
				NFLCIME.dispatchEvent( { type:'KeyboardPressed', target:edit, keyCode:key } );
				switch(this.browser) {
					// IE and Safari perform backspace on keydown
					case 'ie':
					case 'safari':
						if(evt.keyCode == 8) {
							return this.onKeyPress(evt);
						}
						break;
				}
			}
		}
	},
	// Clear shift, alt, and ctrl states when key is released
	onKeyUp:function(evt) {
		var state_key = true;
		switch(evt.keyCode) {
			case 0x12: // alt
			case 0x11: // ctrl
			case 0x10: // shift
				this.physicalKeyboardStates.altKey = evt.altKey;
				this.physicalKeyboardStates.ctrlKey = evt.ctrlKey;
				this.physicalKeyboardStates.shiftKey = evt.shiftKey;
				break;
			case 0x14: // capslock
				if(this.capsLockPressed) {
					this.capsLockPressed = false;
				}
				break;
			default:
				state_key = false;
				break;
		}
		var edit = this.getFocusedEdit();
		if(edit && this.isServiceApplicable(edit)) {
			if(state_key) {
				this.dispatchKeyboardStateChangeEvent();
			} else {
				var key = this.translateKey(evt.keyCode);
				NFLCIME.dispatchEvent( { type:'KeyboardReleased', target:edit, keyCode:key } )
				this.clearVirtualKeys();
			}
		}
	},
	onKeyPress:function(evt) {
		// cursor.js write to textarea and input in Firefox through keypress events;
		// setting this.keyCode to zero ensure 
		if(this.keyCode) {
			var key = this.translateKey(this.keyCode);
			this.keyCode = 0;
			var edit = this.getFocusedEdit();
			if(edit) {
				// Firefox recreates an event object when it's sent between windows, so
				// we can't use the expando property to determine whether the event is
				// fake; charCode isn't set by ui.kb.js however, so we know
				var fake = (this.browser == 'firefox') ? !evt.charCode : evt.fake;
				// set what changes will be effected by the key;
				// this 
				var changes = this.determineChanges(edit, key);
				// don't handle carriage return or space unless the event is fake
				if((key == 0x0d || key == 0x20) && !fake) {
					if(changes) {
						this.rememberChanges(changes);
					}
					return;
				}
				// see if there's text selected and let default action go forward if so (unless the event is fake)
				if((key == 0x08 || key == 0x24) && (!fake || this.browser == 'firefox')) {
					var evt = { type:'CursorGetSelectedText', target:edit, text:'' };
					NFLCIME.dispatchEvent(evt);
					if(evt.text.length > 0) {
						return;
					}
				}
				if(key == 0x08 && (fake && this.browser != 'firefox')) {
					// we typically leave it to the browser to handle backspace;
					// when the event is fake, however, we need to do so in IE 
					// and Safari since they don't react to the event
					if(!changes) {
						// make sure there's text behind the cursor
						var evt = { type:'CursorGetContext', target:edit, textAhead:'', textBehind:'', behindCount:1, aheadCount:0 };
						NFLCIME.dispatchEvent(evt);
						if(evt.textBehind.length > 0) {
							changes = { cursorStart:-1, cursorEnd:0, insert:'', context:'' };
						}
					}
				}
				if(changes) {
					if(changes.cursorStart || changes.cursorEnd) {
						NFLCIME.dispatchEvent( { type:'CursorMove', target:edit, start:changes.cursorStart, end:changes.cursorEnd } );
					} else if(changes.insert == ' ' && !fake) {
						// don't handle space unless the event is fake
						return;
					}
					NFLCIME.dispatchEvent( { type:'CursorInsertText', target:edit, text:changes.insert } );
					// remember the changes
					this.rememberChanges(changes);
					return false;
				}
			}
		}
	},
	//--- Private functions
	attachDOMHandlers:function(win) {
		this.attachDOMHandler(win.document, 'keyup', 'onKeyUp', true);
		this.attachDOMHandler(win.document, 'keydown', 'onKeyDown', true);
		this.attachDOMHandler(win.document, 'keypress', 'onKeyPress');
	},
	detachDOMHandlers:function(win) {
		this.detachDOMHandler(win.document, 'keyup', 'onKeyUp', true);
		this.detachDOMHandler(win.document, 'keydown', 'onKeyDown', true);
		this.detachDOMHandler(win.document, 'keypress', 'onKeyPress');
	},
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
	getFocusedEdit:function() {
		var evt = { type:'CursorGetFocusedEdit', target:null };
		NFLCIME.dispatchEvent(evt);
		return evt.target;
	},
	isServiceApplicable:function(edit) {
		// see if the kb service is active on for edit
		var evt = { type:'ServiceApplicable', target:edit, service:'kb', applicable:false };
		NFLCIME.dispatchEvent(evt);
		return evt.applicable;
	},
	// Clear virtual alt/ctrl/shift keys
	clearVirtualKeys:function(clearCapsLock) {
		this.virtualKeyboardStates.altKey = false;
		this.virtualKeyboardStates.ctrlKey = false;
		this.virtualKeyboardStates.shiftKey = false;
		if(clearCapsLock) {
			this.virtualKeyboardStates.capsLock = false;
		}
		this.dispatchKeyboardStateChangeEvent();
	},
	dispatchKeyboardStateChangeEvent:function() {
		var old_states = {
			altKey:this.combinedKeyboardStates.altKey,
			ctrlKey:this.combinedKeyboardStates.ctrlKey,
			shiftKey:this.combinedKeyboardStates.shiftKey,
			capsLock:this.combinedKeyboardStates.capsLock
		};
		this.combinedKeyboardStates.altKey = this.physicalKeyboardStates.altKey || this.virtualKeyboardStates.altKey;
		this.combinedKeyboardStates.ctrlKey = this.physicalKeyboardStates.ctrlKey || this.virtualKeyboardStates.ctrlKey;
		this.combinedKeyboardStates.shiftKey = this.physicalKeyboardStates.shiftKey || this.virtualKeyboardStates.shiftKey;
		this.combinedKeyboardStates.capsLock = this.physicalKeyboardStates.capsLock || this.virtualKeyboardStates.capsLock;
		var new_states = this.combinedKeyboardStates;
		if((old_states.altKey != new_states.altKey) || (old_states.ctrlKey != new_states.ctrlKey) || (old_states.shiftKey != new_states.shiftKey) || (old_states.capsLock != new_states.capsLock)) {
			var plane = '';
			if(new_states.altKey) {
				plane += 'Alt';
			}
			if(new_states.capsLock) {
				plane += 'Capslock';
			}
			if(new_states.ctrlKey) {
				plane += 'Ctrl';
			}
			if(new_states.shiftKey) {
				plane += 'Shift';
			}
			if(!this[plane]) {
				if(plane.indexOf('Capslock') != -1) {
					// deal with capslock
					if(plane.indexOf('Shift') != -1) {
						// shift cancels capslock
						plane = plane.replace('Capslock', '').replace('Shift', '');
					} else {
						// capslock acts as shift
						plane = plane.replace('Capslock', '') + 'Shift';
					}
				}
				if(plane == '') {
					plane = 'Normal';
				}
			}
			this.combinedKeyboardStates.plane = plane;
			NFLCIME.dispatchEvent( { type:'KeyboardStatesChanged' } );
		}
	},
	translateKey:function(key) {
		switch(key) {
			// The following keyCodes are mapped differently in Firefox.
			case 0x3b: key = 0xba; break; // ;
			case 0x6b: key = 0xbb; break; // =
			case 0x6d: key = 0xbd; break; // -
		}
		return key;
	},
	getKeyMappings:function() {
		return this['map' + this.combinedKeyboardStates.plane];
	},
	lookUpKey:function(key, context) {
		var result = { insert:'', context:'', isMultikey:false };
		var mappings = this.getKeyMappings();
		var entry;
		if(mappings && (entry = mappings[key]) != undefined) {
			// usually the entry is a Unicode string to be inserted; but sometimes we want to perform a look-up of possible combination
			// without inserting a character should the look-up fail; in such a case the entry be an object instead of a string (e.g. kb.geez.amharic.powergeez)
			if(entry instanceof Object) {
				result.insert = entry.insert;
				result.context = entry.context;
			} else {
				// the context is the letter
				result.insert = entry;
				result.context = entry;
			}
			if(this.multikeyCombinations) {
				// this keyboard has multi-key sequences (e.g. A + ' => �)
				entry = this.multikeyCombinations[context + result.context];				
				if(entry != undefined) {
					result.isMultikey = true;
					// do this again in case the multikey combination leave behind a context that isn't what will be inserted
					if(entry instanceof Object) {
						result.insert = entry.insert;
						result.context = entry.context;
					} else {
						result.insert = entry;
						result.context = entry;
					}
				} else {
					if(this.multikeyNoMatch) {
						entry = this.multikeyNoMatch[result.context];
						if(entry != undefined) {
							result.isMultikey = true;
							if(entry instanceof Object) {
								result.insert = entry.insert;
								result.context = entry.context;
							} else {
								result.insert = entry;
								result.context = entry;
							}
						}
					}
				}
			}
			return result;
		}
	
	},
	// Determine what changes the key would cause
	determineChanges:function(edit, key) {
		var changes = { cursorStart:0, cursorEnd:0, insert:'', context:'' };
		var keyinfo = this.lookUpKey(key, this.currentContext);
		if(keyinfo) {
			changes.insert = keyinfo.insert;
			changes.context = keyinfo.context;
			if(keyinfo.isMultikey) {
				if(changes.insert) {
					// replace the previously inserted character
					changes.cursorStart = -this.lastInsertion.length;
				}
			} else {
				if(!this.lastInsertion && this.currentContext) {
					// the previous key was a dead-key; as we can't find any combination, just
					// insert the character it stands for along with the new character--unless 
					// it's a space, in which case we'll insert only the dead-key character
					if(keyinfo.insert == ' ') {
						changes.insert = this.currentContext;
					} else {
						changes.insert = this.currentContext + keyinfo.insert;
					}
					changes.context = '';
				}
			}
			return changes;
		}
		
	},
	rememberChanges:function(changes) {
		this.lastInsertion = changes.insert;
		this.currentContext = changes.context;
	},
	deleleCharacter:function(edit, direction) {
		return false;
	},
	clearContext:function() {
		this.currentContext = '';
		this.lastInsertion = '';
	},
	// Initialization function
	initialize:function(env, subclassing) {
		this.browser = env.browser;
		this.closures = {};
		this.active = false;
		// only keyboard layouts can be activated
		if(this.type == 'keyboard layout') {
			NFLCIME.addEventListener('ModuleActivate', this);
			NFLCIME.addEventListener('ModuleDeactivate', this)
		}
		// keep an eye on focus change so the keyboard states can be updated when the browser lose or gain focus
		if(!subclassing) {
			NFLCIME.addEventListener('FocusChanged', this);
		}
	},
	//--- Private variables
	active:false,
	browser:'',
	physicalKeyboardStates:{ capsLock: false, shiftKey: false, altKey: false, ctrlKey: false },
	virtualKeyboardStates:{ capsLock: false, shiftKey: false, altKey: false, ctrlKey: false },
	combinedKeyboardStates:{ capsLock: false, shiftKey: false, altKey: false, ctrlKey: false, plane:'Normal' },
	closures:null,
	lastInsertion:'',
	keyCode:0,
	capsLockPressed:false,
	currentContext:''
}
});
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
		if(this.languageTag != tag) {
			NFLCIME.dispatchEvent( { type:'LanguageChange', languageTag:tag } );
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
NFLCIME.dispatchEvent( { type:'ModuleAdd', module:
{
	id:'rt.scrube',
	type:'util',
	dependency:['rt'],
	onModuleActivate:function(evt) {
		var module = evt.module;
		if(module == this && !this.active) {
			this.active = true;
			NFLCIME.addEventListener('RichTextPaste', this);
		}
	},
	onModuleDeactivate:function(evt) {
		var module = evt.module;
		if(module == this && this.active) {
			NFLCIME.removeEventListener('RichTextPaste', this);
		}
	},
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

