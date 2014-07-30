NFLCIME.dispatchEvent({
	type : 'ModuleAdd',
	module : {
		id : 'editor.ckeditor',
		type : 'editor integration',
		onModuleActivate : function(evt) {
			var module = evt.module;
			if (module == this && !this.active) {
				this.active = true;
				var list = [];
				NFLCIME.dispatchEvent({
							type : 'WindowGetList',
							list : list
						});
				for (var i = 0; i < list.length; i++) {
					var win = list[i];
					if (win.CKEDITOR) {
						this.attachCKEditorHandlers(win.CKEDITOR);
					} else {
						this.attachDOMHandler(win, 'load',
								'onLoadCheckCKEditor');
					}
				}
				NFLCIME.addEventListener('WindowListen', this);
				NFLCIME.addEventListener('WindowIgnore', this)
				NFLCIME.addEventListener('FocusChanged', this, true);
				NFLCIME.addEventListener('ServiceApplicable', this, true);
				NFLCIME.addEventListener('CursorInsertHTML', this, true);
			} else if (module.type == 'encoding converter') {
				this.converter = module;
			}
		},
		onModuleDeactivate : function(evt) {
			var module = evt.module;
			if (module == this && this.active) {
				this.active = false;
				NFLCIME.removeEventListener('WindowListen', this);
				NFLCIME.removeEventListener('WindowIgnore', this);
				NFLCIME.removeEventListener('FocusChanged', this, true);
				NFLCIME.removeEventListener('ServiceApplicable', this, true);
				NFLCIME.removeEventListener('CursorInsertHTML', this, true);
			} else if (module.type == 'encoding converter') {
				if (this.converter == module) {
					this.converter = null;
				}
			}
		},
		onWindowListen : function(evt) {
			var win = evt.target;
			if (win.CKEDITOR) {
				this.attachCKEditorHandlers(win.CKEDITOR);
			} else {
				this.attachDOMHandler(win, 'load', 'onLoadCheckCKEditor');
			}
		},
		onWindowIgnore : function(evt) {
			var win = evt.target;
			if (win.CKEDITOR) {
				this.detachCKEditorHandlers(win.CKEDITOR);
			} else {
				this.detachDOMHandler(win, 'load', 'onLoadCheckCKEditor');
			}
		},
		onCursorInsertHTML : function(evt) {
			var edit = evt.target;
			var ckeditor = this.getElementEditor(edit);
			var html = evt.html;
			if (ckeditor) {
				ckeditor.insertHtml(html);
				return true;
			}
		},
		onServiceApplicable : function(evt) {
			var service = evt.service;
			var edit = evt.target;
			var from = evt.from;
			// don't handle if the this module is the one doing the asking
			if (from != this) {
				if (service == 'rt') {
					var ckeditor = this.getElementEditor(edit);
					if (ckeditor) {
						var body = ckeditor.document.getBody();
						if (body.hasListeners('beforepaste')) {
							// stop the rt module from handling paste events
							// since CKEditor is handling them
							evt.applicable = false;
							return true;
						}
					}
				}
			}
		},
		onFocusChanged : function(evt) {
			var element = evt.target;
			if (element && element.tagName != 'TEXTAREA'
					&& element.tagName != 'INPUT') {
				var doc = element.ownerDocument;
				var win = (doc.parentWindow)
						? doc.parentWindow
						: doc.defaultView;
				var editor = this.getWindowEditor(win);
				if (editor) {
					// copy properties from the element replaced
					try {
						var body = win.document.body;
						var textarea = editor.element.$;
						for (var e = textarea; e && e.getAttribute; e = e.parentNode) {
							var services = e.getAttribute('NFLCIME')
							if (services) {
								body.setAttribute('NFLCIME', services);
								body.parentNode.setAttribute('NFLCIME',
										services);
								break;
							}
						}
						// give the language module a hint on what's the likely
						// language (for detecting language during
						// copy-and-paste)
						for (var e = textarea; e && e.getAttribute; e = e.parentNode) {
							var lang = e.getAttribute('lang')
							if (lang) {
								NFLCIME.dispatchEvent({
											type : 'LanguageSetHint',
											languageTag : lang
										});
								break;
							}
						}
					} catch (e) {
						if(window.console) console.log(e);
					}
				}
			} else {
				// clear the hint
				NFLCIME.dispatchEvent({
							type : 'LanguageSetHint',
							languageTag : null
						});
			}
		},
		onLoadCheckCKEditor : function(evt) {
			var doc = evt.target;
			if (!doc) {
				doc = evt.listener.document;
			}
			var win = (doc.parentWindow) ? doc.parentWindow : doc.defaultView;
			if (win.CKEDITOR) {
				this.attachCKEditorHandlers(win.CKEDITOR);
			}
		},
		detachCKEditorDOMHandler : function(object, eventName) {
			var listeners = object.getCustomData("_cke_nativeListeners")
			var listener = listeners[eventName];
			if (listener) {
				var element = object.$;
				switch (this.browser) {
					case 'ie' :
						element.detachEvent('on' + eventName, listener);
						break;
					case 'firefox' :
					case 'safari' :
						element.removeEventListener(eventName, listener, false);
						break;
				}
			}
		},
		onInstanceReady : function(ckevt) {
			this.attachDOMHandlers(ckevt.editor);
			ckevt.editor.on("paste", this.onPaste, this, null, 1);
			ckevt.editor.on("mode",this.onMode, this, null, 1);
		},
		onMode : function(ckevt) {
			if(ckevt.editor.mode=='wysiwyg'){
				this.attachDOMHandlers(ckevt.editor);
			}
		},
		oninstanceDestroyed : function(ckevt) {
			this.detachDOMHandlers(ckevt.editor);
		},
		onPaste : function(ckevt) {
			// see if the rt service is active
			var win = this.getEditorWindow(ckevt.editor);
			var edit = win.document.body;
			var evt = {
				type : 'ServiceApplicable',
				target : edit,
				service : 'rt',
				applicable : false,
				from : this
			};
			NFLCIME.dispatchEvent(evt);
			if (evt.applicable) {
				// create a hidden div and drop the stuff there
				var div = document.createElement('DIV');
				div.style.display = 'none';
				div.innerHTML = ckevt.data.html;
				document.body.appendChild(div);
				var evt = {
					type : 'RichTextRetrieveHTML',
					target : div,
					html : '',
					forPaste : true,
					pasteDestination : edit
				};
				NFLCIME.dispatchEvent(evt);
				document.body.removeChild(div);
				if (evt.html) {
					ckevt.data.html = evt.html;
				}
			}
		},
		// --- Private functions
		attachCKEditorHandlers : function(ckeditor) {
			ckeditor.on("instanceReady", this.onInstanceReady, this, null, 1);
			ckeditor.on("instanceDestroyed", this.oninstanceDestroyed, this,
					null, 1);
			var editors = ckeditor.instances;
			for (name in editors) {
				var editor = editors[name];
				this.attachDOMHandlers(editor);
			}
			this.ckeditorInstances.push(ckeditor);
		},
		detachCKEditorHandlers : function(ckeditor) {
			ckeditor.removeListener("instanceReady", this.onInstanceReady);
			ckeditor.removeListener("instanceDestroyed",
					this.oninstanceDestroyed);
			var editors = ckeditor.instances;
			for (name in editors) {
				var editor = editors[name];
				this.detachDOMHandlers(editor);
			}
			for (var i = this.ckeditorInstances.length - 1; i >= 0; i--) {
				if (this.ckeditorInstances[i] == ckeditor) {
					this.ckeditorInstances.splice(i, 1);
				}
			}
		},
		attachDOMHandlers : function(editor) {
			var win = this.getEditorWindow(editor);
			if (win) {
				NFLCIME.dispatchEvent({
							type : 'WindowListen',
							target : win
						})
			}
		},
		detachDOMHandlers : function(editor) {
			var win = this.getEditorWindow(editor);
			if (win) {
				NFLCIME.dispatchEvent({
							type : 'WindowIgnore',
							target : win
						})
			}
		},
		// Attach a closure to a DOM element that sends the events to the named
		// handler
		attachDOMHandler : function(element, eventName, handlerName, capturing) {
			var handler = this[handlerName];
			var closure = this.closures[handlerName];
			if (!closure) {
				var self = this;
				switch (this.browser) {
					case 'ie' :
						closure = function(evt) {
							if (!evt.target) {
								evt.target = evt.srcElement;
							}
							evt.listener = element;
							evt.returnValue = handler.call(self, evt);
						}
						break;
					case 'firefox' :
					case 'safari' :
						closure = function(evt) {
							var result = handler.call(self, evt);
							if (result != undefined && result == false) {
								evt.preventDefault();
							}
						}
				}
				this.closures[handlerName] = closure;
			}
			switch (this.browser) {
				case 'ie' :
					element.attachEvent('on' + eventName, closure);
					break;
				case 'firefox' :
				case 'safari' :
					element.addEventListener(eventName, closure, capturing
									? true
									: false);
					break;
			}
		},
		// Detach an earlier attached closure
		detachDOMHandler : function(element, eventName, handlerName, capturing) {
			var closure = this.closures[handlerName];
			if (closure) {
				switch (this.browser) {
					case 'ie' :
						element.detachEvent('on' + eventName, closure);
						break;
					case 'firefox' :
					case 'safari' :
						element.removeEventListener(eventName, closure,
								capturing ? true : false);
						break;
				}
			}
		},
		getElementEditor : function(element) {
			var doc = element.ownerDocument;
			var win = (doc.parentWindow) ? doc.parentWindow : doc.defaultView;
			return this.getWindowEditor(win);
		},
		getWindowEditor : function(win) {
			for (var i = 0; i < this.ckeditorInstances.length; i++) {
				var ckeditor = this.ckeditorInstances[i];
				var editors = ckeditor.instances;
				var name;
				for (name in editors) {
					var editor = editors[name];
					var editor_win = this.getEditorWindow(editor);
					if (editor_win == win) {
						return editor;
					}
				}
			}
			return null;
		},
		getEditorWindow : function(editor) {
			if (editor.window) {
				return editor.window.$;
			}
			return null;
		},
		initialize : function(env, subclassing) {
			this.browser = env.browser;
			this.closures = {};
			NFLCIME.addEventListener('ModuleActivate', this);
			NFLCIME.addEventListener('ModuleDeactivate', this)
		},
		// --- Private variables
		active : false,
		browser : '',
		ckeditorInstances : [],
		converter : null
	}
});