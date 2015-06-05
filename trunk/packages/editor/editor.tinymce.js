
NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'editor.tinymce',
		type: 'editor integration',

		onModuleActivate: function(evt) {
			
			var module = evt.module;
			// need to look at more than one instance
			// if (module == this && !this.active) {
			if (module == this) {
				this.active = true;
				var list = [];
				NFLCIME.dispatchEvent({
					type: 'WindowGetList',
					list: list
				});
				
				// console.log('list:',list);

				for (var i = 0; i < list.length; i++) {
					var win = list[i];
					// debugger;
					if (win.tinyMCE) {
						this.attachTinyMCEHandlers(win.tinyMCE);

					} else {
						this.attachDOMHandler(win, 'load', 'onLoadCheckTinyMCE');
					}
				}
				NFLCIME.addEventListener('WindowListen', this);
				NFLCIME.addEventListener('WindowIgnore', this)
				NFLCIME.addEventListener('FocusChanged', this, true);
				NFLCIME.addEventListener('LanguageSelected', this);
				NFLCIME.addEventListener('LanguageChange', this);
			}
		},
		onModuleDeactivate: function(evt) {
			var module = evt.module;
			if (module == this && this.active) {
				this.active = false;
				NFLCIME.removeEventListener('WindowListen', this);
				NFLCIME.removeEventListener('WindowIgnore', this);
				NFLCIME.removeEventListener('FocusChanged', this, true);
			} else if (module.type == 'encoding converter') {
				if (this.converter == module) {
					this.converter = null;
				}
			}
		},
		onWindowListen: function(evt) {
			var win = evt.target;
			if (win.tinyMCE) {
				this.attachTinyMCEHandlers(win.tinyMCE);
			} else {
				this.attachDOMHandler(win, 'load', 'onLoadCheckTinyMCE');
			}
		},
		onWindowIgnore: function(evt) {
			var win = evt.target;
			if (win.tinyMCE) {
				this.detachTinyMCEHandlers(win.tinyMCE);
			} else {
				this.detachDOMHandler(win, 'load', 'onLoadCheckTinyMCE');
			}
		},
		onFocusChanged: function(evt) {
			var element = evt.target;
			if (element && element.tagName != 'TEXTAREA' && element.tagName != 'INPUT') {
				var doc = element.ownerDocument;
				var win = (doc.parentWindow) ? doc.parentWindow : doc.defaultView;
				var editor = this.getWindowEditor(win);
				if (editor) {
					// copy properties from the element replaced
					var body = win.document.body;
					var textarea = editor.getElement();
					for (var e = textarea; e && e.getAttribute; e = e.parentNode) {
						var services = e.getAttribute('NFLCIME')
						if (services) {
							body.setAttribute('NFLCIME', services);
							body.parentNode.setAttribute('NFLCIME', services);
							break;
						}
					}
					for (var e = textarea; e && e.getAttribute; e = e.parentNode) {
						var lang = (e.getAttribute('lang') || '');
						body.setAttribute('lang', lang);
						body.parentNode.setAttribute('lang', lang);

					}
				}
			}
		},
		onLoadCheckTinyMCE: function(evt) {
			var doc = evt.target;
			if (!doc) {
				doc = evt.listener.document;
			}
			var win = (doc.parentWindow) ? doc.parentWindow : doc.defaultView;
			if (win.tinyMCE) {
				this.attachTinyMCEHandlers(win.tinyMCE);
			}
		},
		
		onLanguageChange: function(evt) {
		    // console.log('langchange', evt);
			var editor = tinyMCE.activeEditor,
				editor_lang = editor && editor.language,
				keyboard_lang = evt && evt.languageTag,
				keyboard_lang = (keyboard_lang == 'null' || keyboard_lang == 'unknown') ? '' : keyboard_lang,
				direction = evt.languageDir;


			editor.fire('langchange', {
				lang: keyboard_lang
			});

			if (editor_lang != keyboard_lang && editor.onLanguageChange) {
				editor.language = keyboard_lang;
				editor.onLanguageChange.dispatch({
					lang: keyboard_lang,
					dir: direction
				});
			};
		},
		
		onLanguageSelected: function(evt) {
			var editor = evt.editor,
				lang = evt.language;
			editor.language = lang;
			editor.getElement().setAttribute('lang', (lang || ""));

			if (!lang) {
				NFLCIME.dispatchEvent({
					type: 'CursorInsertEmptyText',
					target: editor.getDoc()
				});
			};
			editor.focus();
			editor.getBody().focus();
			NFLCIME.dispatchEvent({
				type: 'LanguageChange',
				languageTag: lang
			});
		},
		//--- Private functions
		attachTinyMCEHandlers: function(tinymce) {
			var editors = tinymce.editors,
				self = this;

			for (i = 0, len = editors.length; i < len; i++) {
				var editor = editors[i];
				this.attachDOMHandlers(editor);
				// editor.onLanguageSelected.add(this.onLanguageSelected, {scope: self});
				editor.on('languagechange', this.onLanguageSelected, {
					scope: self
				});
			};
			this.tinymceInstances.push(tinymce);
		},
		detachTinyMCEHandlers: function(tinymce) {
			for (var i = this.tinymceInstances.length - 1; i >= 0; i--) {
				if (this.tinymceInstances[i] == tinymce) {
					this.tinymceInstances.splice(i, 1);
				}
			}
		},
		attachDOMHandlers: function(editor) {
			var win = this.getEditorWindow(editor);
			if (win) {
				var body = win.document.body;
				body.contentEditable = true;
				body.parentNode.contentEditable = true;
				NFLCIME.dispatchEvent({
					type: 'WindowListen',
					target: win
				});
			}
		},
		detachDOMHandlers: function(editor) {
			var win = this.getEditorWindow(editor);
			if (win) {
				NFLCIME.dispatchEvent({
					type: 'WindowIgnore',
					target: win
				})
			}
		},
		// Attach a closure to a DOM element that sends the events to the named handler
		attachDOMHandler: function(element, eventName, handlerName, capturing) {
			var handler = this[handlerName];
			var closure = this.closures[handlerName];
			if (!closure) {
				var self = this;
				switch (this.browser) {
					case 'ie':
						closure = function(evt) {
							if (!evt.target) {
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
							if (result != undefined && result == false) {
								evt.preventDefault();
							}
						}
				}
				this.closures[handlerName] = closure;
			}
			switch (this.browser) {
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
		detachDOMHandler: function(element, eventName, handlerName, capturing) {
			var closure = this.closures[handlerName];
			if (closure) {
				switch (this.browser) {
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
		getElementEditor: function(element) {
			var doc = element.ownerDocument;
			var win = (doc.parentWindow) ? doc.parentWindow : doc.defaultView;
			return this.getWindowEditor(win);
		},
		getWindowEditor: function(win) {
			for (var i = 0; i < this.tinymceInstances.length; i++) {
				var tinymce = this.tinymceInstances[i];
				var editors = tinymce.editors;
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
		getEditorWindow: function(editor) {
			if (editor) {
				return editor.getWin();
			}
			return null;
		},
		initialize: function(env, subclassing) {
			this.browser = env.browser;
			this.closures = {};
			NFLCIME.addEventListener('ModuleActivate', this);
			NFLCIME.addEventListener('ModuleDeactivate', this)
		},
		//--- Private variables
		active: false,
		browser: '',
		tinymceInstances: []
	}
});