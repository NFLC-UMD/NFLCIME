var NFLCIME = (NFLCIME ||  {});

NFLCIME.extend = function (obj, ext) {
			var i, l, name, args = arguments, value;
			obj = obj || this;
			for (i = 1, l = args.length; i < l; i++) {
				ext = args[i];
				for (name in ext) {
					if (ext.hasOwnProperty(name)) {
						value = ext[name];

						if (value !== undefined) {
							obj[name] = value;
						}
					}
				}
			};

			return obj;
};   

NFLCIME.extend(NFLCIME, {
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
		
		if(code){
			//Feb 21.2013 SEB. Should be removed. Should never really use eval unless necessary
			code = 'this.environment.configuration = this.extend(this, {' + code.replace(/,\s*$/, '') + '});';
			
			try {
				eval(code);
			} catch(e) {
				alert(e.message);
			}
		};
		
		//Feb 21.2013 SEB. Extending the configuration object with the init_modules object. Loading these in tinyMCE
		this.extend(this.environment.configuration, this.init_modules);
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
});

function trace() {};
NFLCIME.initialize();