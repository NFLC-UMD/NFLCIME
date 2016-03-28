/**
 * @docauthor Steve Drucker <sdrucker@figleaf.com>
 *
 * @class NFLCIME
 * The endpoint for the library
 */

var NFLCIME = (NFLCIME || {});


/**
 * This function adds properties to the NFLCIME class
 * if they are not already present and overwrites them if they
 * are already present.
 *
 * It works similarly to Ext.apply()
 * @param {Object} [obj] The object to extend
 * @param {Object} [ext] The object, containing properties and methods, that should be added to [obj]. Will not perform assignemnt if associated value is undefined.
 * @return {Object} the extended object
 */

NFLCIME.extend = function(obj, ext) {
	var i, l, name, args = arguments,
		value;
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
	}

	return obj;
};

NFLCIME.extend(NFLCIME, {

	/**
	 * Add a listener for a specific event (listner['on' + eventName] will be invoked)
	 * @param {String} [eventName] The name of the listener
	 * @param {Function} [listener] The listener function
	 * @param {Boolean} [capture] If true, adds '_cap' to the eventName. Defaults to false. Captured events will be executed prior to non-captured events.
	 */
	addEventListener: function(eventName, listener, capture) {
		var name = eventName + ((capture) ? '_cap' : '');

		var listeners = this.eventListenerHash[name];
		if (!listeners) {
			this.eventListenerHash[name] = listeners = [];
		}
		listeners.push(listener);

	},
	
	/**
	 * Remove an event listener
	 * @param {String} [eventName] The name of the listener
	 * @param {Function} [listener] The listener function
	 * @param {Boolean} [capture] If true, adds '_cap' to the eventName. Defaults to false.
	 */

	removeEventListener: function(eventName, listener, capture) {
		var name = eventName + ((capture) ? '_cap' : '');
		var listeners = this.eventListenerHash[name];
		if (listeners) {
			for (var i = listeners.length - 1; i >= 0; i--) {
				if (listeners[i] == listener) {
					listeners.splice(i, 1);
				}
			}
			if (listeners.length == 0) {
				this.eventListenerHash[name] = undefined;
			}
		}
	},
	
	/**
	 * Dispatch an event to all listening objects. Sends events to capturing listeners first.
	 * @param {Object} [evt] An event object
	 * @return {Object} The result from running the event handler
	 */

	dispatchEvent: function(evt) {
		var result;
		var loops = ['_cap', '']; // send event to capturing listeners first
		for (var k = 0; k < loops.length; k++) {
			var name = evt.type + loops[k];
			var listeners = this.eventListenerHash[name];

			if (listeners) {
				listeners = listeners.concat();

				for (var i = 0; i < listeners.length; i++) {
					var listener = listeners[i];

					var handler = listener['on' + evt.type];
					if (handler) {
						result = handler.call(listener, evt);
					}
					if (result != undefined) {
						return result;
					}
				}
			}
		}
		return undefined;
	},
	


	/**
	 * Attach event listeners to a window, evt.target must point to the window
	 * For firefox and safari, adds a mousedown event listener to prevent textboxes from losing focus to elments
	 * marked as "unselectable"
	 * @param {Object} [evt] An event object
	 *
	 */

	onWindowListen: function(evt) {
		var win = evt.target;
		switch (this.environment.browser) {
			case 'firefox':
			case 'safari':
				// prevent textboxes from losing focus to elements marked as "unselectable"
				win.addEventListener('mousedown', this.enforceUnselectable, false);
				break;
		}
		this.windowsHandled.push(win);
	},
	

	/**
	 * Detaches event from all handled windows, evt.target must point to the window
	 * For firefox and safari,removes the mousedown event listener that prevent textboxes from losing focus to elments
	 * marked as "unselectable"
	 * @param {Object} [evt] An event object
	 *
	 */

	onWindowIgnore: function(evt) {
		var win = evt.target;
		switch (this.environment.browser) {
			case 'firefox':
			case 'safari':
				win.removeEventListener('mousedown', this.enforceUnselectable, false);
				break;
		}
		for (var i = this.windowsHandled.length - 1; i >= 0; i--) {
			if (this.windowsHandled[i] == win) {
				this.windowsHandled.splice(i, 1);
			}
		}
	},
	

	/**
	 * Get list of windows
	 * Loops through the this.windowsHandled property and cleans up array for any windows that have been closed.
	 * Updates evt.list array property with registered, available windows
	 * @param {Object} [evt] An event object
	 *
	 */

	onWindowGetList: function(evt) {
		for (var i = this.windowsHandled.length - 1; i >= 0; i--) {
			var win = this.windowsHandled[i];
			if (win.closed || !win.document) {
				this.windowsHandled.splice(i, 1);
			}
		}
		for (var i = 0; i < this.windowsHandled.length; i++) {
			evt.list.push(this.windowsHandled[i]);
		}
	},
	

	/**
	 * Determines whether a given IME service is active for a given element
	 * Looks for an element attribute of NFLCIME, which must be formatted as a space delimited string
	 * @param {Object} [evt] An event object
	 *
	 * Example: &lt;textarea NFLCIME="all"/&gt;, &lt;textarea NFLCIME="kb cvt"/&gt;
	 *
	 */

	onServiceApplicable: function(evt) {

		var element = evt.target;
		var services_requested = evt.service.split(/\s*,\s*/);
		evt.applicable = false;
		if (element) {
			// look at the comma-delimited list stored as an attribute in the element
			for (var e = element; e && e.getAttribute; e = e.parentNode) {
				var attribute = e.getAttribute('NFLCIME');
				if (attribute) {
					attribute = attribute.toLowerCase();
					attribute = attribute.replace(/\s+/g, '');
					attribute = attribute.replace(/\bon\b/, 'kb,cvt');
					var services_enabled = attribute.split(',');
					for (var i = 0; i < services_enabled.length; i++) {
						var s = services_enabled[i];
						if (s == 'all') {
							evt.applicable = true;
							return;
						} else {
							for (var j = 0; j < services_requested.length; j++) {
								var r = services_requested[j];
								if (s == r) {
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
	

	/**
	 * Loads a module, checking module dependencies. Displaytches the 'ModuleRegister' event if the module is ready
	 * Kicks off process for loading dependent modules, if required, and throws current module request into the
	 * @param {Object} [evt] An event object
	 *
	 * Example: &lt;textarea NFLCIME="all"/&gt;, &lt;textarea NFLCIME="kb cvt"/&gt;
	 *
	 */

	onModuleAdd: function(evt) {
		var module = evt.module;
		

		if (this.checkModuleDependency(module)) {
			var ready = this.initializeModule(module);
			if (ready) {
				console.log('module ready:',evt.module.id);
				this.dispatchEvent({
					type: 'ModuleRegister',
					module: module
				});
			} else {
				console.log('module not ready', evt.module);
				// the module isn't quite ready yet, likely because it's waiting for an asynchronous operation to finish
				// once that's done, the module will fire a ModuleRegister event itself
			}
		} else {
			this.loadDependentModules(module);
			this.pendingModules.push(module);
		}
	},
	

	/**
	 * Register a module - event is raised from the core modules
	 * @param {Object} [evt] An event object containing the module info
	 * 
	 */

	onModuleRegister: function(evt) {
		var module = evt.module;
		this.registeredModules[module.id] = module;
		// activate the module if it's supposed to be active

		if (this.activateOnLoad[module.id]) {
			this.dispatchEvent({
				type: 'ModuleActivate',
				module: module
			});
		}

		// see if any of the pending module might be ready
		for (var i = this.pendingModules.length - 1; i >= 0; i--) {
			var pending_module = this.pendingModules[i];
			if (this.checkModuleDependency(pending_module)) {
				// add the module then stop the loop, since the scan will occur again
				this.pendingModules.splice(i, 1);
				this.dispatchEvent({
					type: 'ModuleAdd',
					module: pending_module
				});
				break;
			}
		}
		if (this.initialModuleList) {
			if (this.initialModuleList[this.initialModuleListIndex] == module.id) {
				// load the next module in the list
				this.initialModuleListIndex++;
				if (this.initialModuleListIndex < this.initialModuleList.length) {
					var id = this.initialModuleList[this.initialModuleListIndex];
					this.dispatchEvent({
						type: 'ModuleLoad',
						moduleId: id
					});
				}
			}
		}
	},
	
	/**
	 * Loads a module from an external .js file.
	 * @param {Object} [evt] An event object containing the module info
	 *
	 * Event properties:
	 * moduleId, compressed, activate
	 *
	 * If the compressed bit is set, it is assumed that the module was part of a compressed and minified build
	 * The module gets added to the registeredModules object. If the activate flag is set, the ModuleActivate event is dispatched
	 */

	onModuleLoad: function(evt) {
		var id = evt.moduleId;
		var activate = evt.activate;
		var compressed = evt.compressed;
		var module = this.registeredModules[id];
		if (module) {
			if (activate) {
				this.dispatchEvent({
					type: 'ModuleActivate',
					module: module
				});
			}
		} else {
			if (activate) {
				this.activateOnLoad[id] = true;
			}
			if (!compressed) {
				this.loadScriptFile(id + '.js');
			}
		}
		return true;
	},
	
	/**
	 * Loops through all registered modules and adds references to the evt.list property
	 * @param {Object} [evt] An event object containing the module info
	 *
	 */


	onModuleGetList: function(evt) {
		var id;
		for (id in this.registeredModules) {
			evt.list.unshift(this.registeredModules[id]);
		}
	},
	

	//--- Private functions
	// See if the modules that a module depends on are loaded

	/**
	 * @private
	 *
	 *
	 * @param {Object} [module] A Module reference
	 * @return {Boolean}
	 */



	checkModuleDependency: function(module) {
		if (module.dependency) {
			for (var j = 0; j < module.dependency.length; j++) {
				var id = module.dependency[j];
				if (!this.registeredModules[id]) {
					return false;
				}
			}
		}
		if (module.inheritance) {
			for (var j = 0; j < module.inheritance.length; j++) {
				var id = module.inheritance[j];
				if (!this.registeredModules[id]) {
					return false;
				}
			}
		}
		return true;
	},
	

	/**
	 * @private
	 * Load modules that a module dpends on.
	 * Dispatches the ModuleLoad event for any dependencies (module.dependency[]) or inheritance (module.inheritance[])
	 *
	 * @param {Object} [module] A Module reference
	 */

	loadDependentModules: function(module) {
		if (module.dependency) {
			for (var j = 0; j < module.dependency.length; j++) {
				var id = module.dependency[j];
				if (!this.registeredModules[id]) {
					this.dispatchEvent({
						type: 'ModuleLoad',
						moduleId: id,
						activate: true
					});
				}
			}
		}
		if (module.inheritance) {
			for (var j = 0; j < module.inheritance.length; j++) {
				var id = module.inheritance[j];
				if (!this.registeredModules[id]) {
					this.dispatchEvent({
						type: 'ModuleLoad',
						moduleId: id
					});
				}
			}
		}
	},
	// Load a Javascript file by adding a SCRIPT tag to the HEAD element

	/**
	 * @private
	 *
	 * Maps url of module to a package name
	 * Enables modules and their corresponding data files to be grouped into a directory structure
	 * <br>
	 * Mappings:<br>
	 * cvt : packages/cvt <br>
	 * kb : packages/kb<br>
	 * ui : packages/ui<br>
	 * editor: packages/editor<br>
	 *
	 * @param {String} [url] A Module url (filename, e.g. kb.js)
	 */

	mapUrlToPackage: function(url) {
		var thePackage = url.split('.');

		var sourcefiles = [
			"kb.js",
			"ui.iframe.js",
			"cvt.js",
			"ui.lang.js",
			"ui.kb.js",
			"pers.cookie.js",
			"rt.scrube.js",
			"rt.js",
			"cursor.js",
			"lang.js",
			"languages.json"
		];

		if (sourcefiles.indexOf(url) === -1) {
			if (thePackage[0] == 'cvt' || thePackage[0] == 'kb' || thePackage[0] == 'ui' || thePackage[0] == 'editor') {
				switch (thePackage[0]) {
					case 'cvt':
						url = "packages/cvt/" + url;
						break;
					case 'kb':
						url = "packages/kb/" + url;
						break;
					case 'ui':
						url = "packages/ui/" + thePackage[1] + "/" + url;
						break;
					case 'editor':
						url = "packages/editor/" + url;
						break;
				}
			}
		} else {
			url = "src/" + url;
		}

		return url;
	},


	/**
	 * @private
	 *
	 * Injects a &lt;script&gt; tag into the DOM to load a url
	 *
	 * @param {String} [url] A Module filename (e.g. kb.js)
	 */
	loadScriptFile: function(url) {

		// map urls to packages
		url = NFLCIME.mapUrlToPackage(url);

		var head = document.getElementsByTagName('HEAD')[0];
		if (head) {
			// add the folder path if necessary
			var full_url = (/^\w+:/.test(url) || /^\//.test(url)) ? url : this.environment.scriptURLRoot + url;

			// make sure we're not loading a script twice
			var scripts = document.getElementsByTagName('SCRIPT');
			for (var i = 0; i < scripts.length; i++) {
				if (scripts[i].src == full_url) {
					return;
				}
			}
			var script = document.createElement('SCRIPT');

			
			script.src = full_url;
			head.appendChild(script);

		}
	},
	
	/**
	 * @private
	 *
	 * Initialize a module, copy functionalities from inherited modules if necessary
	 *
	 *
	 * module.initialize : initialization function
	 * module.inheritance: array
	 *
	 *
	 * @param {Object} [module] A Module
	 */
	initializeModule: function(module) {
		var result;
		if (module.inheritance) {
			// remember the module's own init function
			var module_init_func = module.initialize;
			// copy functionalities from other modules
			for (var i = 0; i < module.inheritance.length; i++) {
				var parent_id = module.inheritance[i];
				var parent_module = this.registeredModules[parent_id];
				var name;
				for (name in parent_module) {
					if (module[name] == undefined) {
						module[name] = parent_module[name];
					}
				}
			}
			// fire all inherited init function
			var functions = [];
			this.getInitializationFunctions(module, functions);
			for (var i = functions.length - 1; i >= 0; i--) {
				var f = functions[i];
				result = f.call(module, this.environment, f != module_init_func);
			}
		} else {
			// just run the init function
			if (module.initialize) {
				result = module.initialize(this.environment, false);
			}
		}
		return (result != false);
	},

	/**
	 * @private
	 *
	 * Get a list of initialization functions, including those of inherited modules
	 *
	 *
	 *
	 * @param {Object} [module] A Module
	 * @param {Array} [list] List of functions
	 */


	getInitializationFunctions: function(module, list) {
		var func = module.initialize;
		if (func) {
			// make sure the function isn't on the list already
			var duplicate = false;
			for (var i = list.length - 1; i >= 0; i--) {
				if (list[i] == func) {
					duplicate = true;
					break;
				}
			}
			if (!duplicate) {
				list.push(func);
			}
		}
		if (module.inheritance) {
			for (var i = module.inheritance.length - 1; i >= 0; i--) {
				var parent_id = module.inheritance[i];
				var parent_module = this.registeredModules[parent_id];
				this.getInitializationFunctions(parent_module, list);
			}
		}
	},
	

	/**
	 * @private
	 *
	 * Evaluate the code inside the SCRIPT node as an object (this.scriptNode)
	 *
	 */

	parseConfigurationCode: function() {
		var code = this.scriptNode.innerHTML;
		var browser = this.environment.browser;

		if (code) {
			//Feb 21.2013 SEB. Should be removed. Should never really use eval unless necessary
			code = 'this.environment.configuration = this.extend(this, {' + code.replace(/,\s*$/, '') + '});';

			try {
				eval(code);
			} catch (e) {
				alert(e.message);
			}
		};

		//Feb 21.2013 SEB. Extending the configuration object with the init_modules object. Loading these in tinyMCE
		this.extend(this.environment.configuration, this.init_modules);
	},


	/**
	 * @private
	 *
	 * Prevent focus change on unselectable elements. 
	 * Unselectable elements are defined as html elements that have an "unselectable" attribute,
	 * e.g. (&lt;textarea unselectable="true" /&gt;)
	 * @param {Object} [evt] Event
	 */

	enforceUnselectable: function(evt) {
		var unselectable = evt.target.getAttribute("unselectable");
		if (unselectable && unselectable.toLowerCase() == 'on') {
			evt.preventDefault();
		}
	},
	

	/**
	 * @private
	 * Initialize the module
	 * Tries to locate the Script node that loads nflcime.js or nflcime-packed.js
	 * Will load any modules define by the "modules" property of the script
	 * Invokes this.parseConfigurationCode() method to eval code that's inside the Script element
	 * Attaches event listeners for the following events:
	 * <ul>
	 * <li>WindowListen</li>
	 * <li>WindowIgnore</li>
	 * <li>WindowGetList</li>
	 * <li>ServiceApplicable</li>
	 * <li>ModuleAdd</li>
	 * <li>ModuleRegister</li>
	 * <li>ModuleActivate</li>
	 * <li>ModuleLoad</li>
	 * <li>ModuleGetList</li>
	 * </ul>
	 * Automatically activates the cursor module if the lang module is invoked
	 */


	initialize: function() {
		// figure out the url root of this script
		var scripts = document.getElementsByTagName('SCRIPT');
		for (var i = 0; i < scripts.length; i++) {
			var script = scripts[i];
			var url = script.src;
			if (url) {
				var match;

				if (match = /(.*\/)?[^\/]*[nflcime.js|nflcime-packed]$/i.exec(url)) {

					this.scriptNode = script;
					this.scriptContainer = script.parentNode;
					this.environment.scriptURLRoot = match[1];
					var module_ids = script.getAttribute('modules');
					if (module_ids && (module_ids = module_ids.replace(/^\s+/g, '$1').replace(/\s+$/))) {
						this.initialModuleList = module_ids.split(/\s*,\s*/);
					}
					break;
				}
			}
		}



		if (!this.scriptNode) {
			alert('Cannot find the SCRIPT node linking to nflcime.js');
			return;
		}
		var agent = navigator.userAgent;
		if (agent.indexOf('KHTML') != -1) {
			this.environment.browser = 'safari';
		} else if (agent.indexOf('Gecko') != -1) {
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

		if (init_modules) {

			for (var i = 0; i < init_modules.length; i++) {

				var m = init_modules[i];

				if (m.id == 'lang' && m.compressed) {
					init_modules.push({
						id: 'cursor',
						activate: true,
						compressed: true
					});
				}

				this.dispatchEvent({
					type: 'ModuleLoad',
					moduleId: m.id,
					activate: m.activate,
					compressed: m.compressed
				});
			}
		}
		this.dispatchEvent({
			type: 'WindowListen',
			target: window
		});
	},

	

	//--- Private variables
	environment: {
		scriptUrlRoot: '',
		browser: 'ie',
		configuration: {}
	},
	scriptNode: null,

	/**
	 * @private
	 *  The parent node of the script node that loads nflcime.js (typically the &lt;head&gt;)
	 */

	scriptContainer: null,


	settingsCode: '',
	eventListenerHash: {},
	closures: {},
	registeredModules: {},

	/**
	 * @private
	 *  Array of modules that are waiting for dependencies to load
	 */

	pendingModules: [],

	activateOnLoad: {},
	windowsHandled: []
});

// function trace() {};
NFLCIME.initialize();
