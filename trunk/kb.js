NFLCIME.dispatchEvent({
	type: 'ModuleAdd',
	module: {
		id: 'kb',
		type: 'core',
		dependency: ['cursor'],
		//--- Event handlers
		// Start handling DOM event when module is activated
		onModuleActivate: function(evt) {
			var module = evt.module;
			if (module == this) {
				if (!this.active) {
					this.active = true;
					// get list of windows for which IME is already activated and attach DOM handlers to them
					var list = [];
					NFLCIME.dispatchEvent({
						type: 'WindowGetList',
						list: list
					});

					for (var i = 0; i < list.length; i++) {
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
					NFLCIME.dispatchEvent({
						type: 'KeyboardStatesChanged'
					});
				}
			} else {
				// deactivate this layout if another one is activated
				if (module.type == 'keyboard layout') {
					NFLCIME.dispatchEvent({
						type: 'ModuleDeactivate',
						module: this
					});
				}
			}
		},
		// Stop handling DOM event when module is deactivated
		onModuleDeactivate: function(evt) {
			var module = evt.module;
			if (module == this) {
				if (this.active) {
					this.active = false;
					var list = [];
					NFLCIME.dispatchEvent({
						type: 'WindowGetList',
						list: list
					});
					for (var i = 0; i < list.length; i++) {
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
		onWindowListen: function(evt) {
			var win = evt.target;
			this.attachDOMHandlers(win);
		},
		// Remove DOM handlers
		onWindowIgnore: function(evt) {
			var win = evt.target;
			this.detachDOMHandlers(win);
		},
		onKeyboardGetStates: function(evt) {
			evt.states.altKey = this.combinedKeyboardStates.altKey;
			evt.states.ctrlKey = this.combinedKeyboardStates.ctrlKey;
			evt.states.shiftKey = this.combinedKeyboardStates.shiftKey;
			evt.states.capsLock = this.combinedKeyboardStates.capsLock;
			evt.states.plane = this.combinedKeyboardStates.plane;
		},
		onKeyboardSetStates: function(evt) {
			if (evt.states.altKey != undefined) this.virtualKeyboardStates.altKey = !this.physicalKeyboardStates.altKey && evt.states.altKey;
			if (evt.states.ctrlKey != undefined) this.virtualKeyboardStates.ctrlKey = !this.physicalKeyboardStates.ctrlKey && evt.states.ctrlKey;
			if (evt.states.shiftKey != undefined) this.virtualKeyboardStates.shiftKey = !this.physicalKeyboardStates.shiftKey && evt.states.shiftKey;
			if (evt.states.capsLock != undefined) this.virtualKeyboardStates.capsLock = !this.physicalKeyboardStates.capsLock && evt.states.capsLock;
			this.dispatchKeyboardStateChangeEvent();
		},
		onKeyboardGetPossibleKeys: function(evt) {
			if (this.multikeyCombinations && this.currentContext) {
				var from;
				var mappings = this.getKeyMappings();
				if (mappings) {
					var prefix = this.currentContext
					for (from in this.multikeyCombinations) {
						if (from.indexOf(prefix) == 0 && prefix.length < from.length) {
							var next = from.substr(prefix.length);
							var code;
							for (code in mappings) {
								var entry = mappings[code];
								var character = (typeof(entry) == 'object') ? entry.context : entry;
								if (next == character) {
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
		onKeyboardGetDeadKeys: function(evt) {

			if (this.multikeyCombinations) {
				var mappings = this.getKeyMappings();
				if (mappings) {
					var code;
					for (code in mappings) {
						var entry = mappings[code];
						if (typeof(entry) == 'object' && !entry.insert) {
							var character = entry.context;
							for (from in this.multikeyCombinations) {
								if (from.indexOf(character) == 0) {
									evt.keyCodes.push(parseInt(code))
								}
							}
						}
					}
				}
			}
		},
		onCursorMoved: function(evt) {
			this.clearContext();
		},
		// Translate key code to characters
		onKeyDown: function(evt) {

			var state_key = true;
			switch (evt.keyCode) {
				case 0x12: // alt
				case 0x11: // ctrl
				case 0x10: // shift
					this.physicalKeyboardStates.altKey = evt.altKey;
					this.physicalKeyboardStates.ctrlKey = evt.ctrlKey;
					this.physicalKeyboardStates.shiftKey = evt.shiftKey;
					// if the physical key is pressed, then the virtual key is off
					if (this.physicalKeyboardStates.altKey) this.virtualKeyboardStates.altKey = false;
					if (this.physicalKeyboardStates.ctrlKey) this.virtualKeyboardStates.ctrlKey = false;
					if (this.physicalKeyboardStates.shiftKey) this.virtualKeyboardStates.shiftKey = false;
					break;
				case 0x14: // capslock
					if (!this.capsLockPressed) {
						this.physicalKeyboardStates.capsLock = !this.physicalKeyboardStates.capsLock;
						this.capsLockPressed = true;
						if (this.physicalKeyboardStates.capsLock) this.virtualKeyboardStates.capsLock = false;
					}
					break;
				default:
					state_key = false;
					break;
			}
			this.keyCode = 0;
			var edit = this.getFocusedEdit();
			if (edit && this.isServiceApplicable(edit)) {

				if (state_key) {
					this.dispatchKeyboardStateChangeEvent();
				} else {
					this.keyCode = evt.keyCode;
					var key = this.translateKey(evt.keyCode);
					// fire off an event indicating a key was handled
					NFLCIME.dispatchEvent({
						type: 'KeyboardPressed',
						target: edit,
						keyCode: key
					});
					switch (this.browser) {
						// IE and Safari perform backspace on keydown
						case 'ie':
						case 'safari':
							if (evt.keyCode == 8) {
								return this.onKeyPress(evt);
							}
							break;
					}
				}
			}
		},
		// Clear shift, alt, and ctrl states when key is released
		onKeyUp: function(evt) {
			var state_key = true;
			switch (evt.keyCode) {
				case 0x12: // alt
				case 0x11: // ctrl
				case 0x10: // shift
					this.physicalKeyboardStates.altKey = evt.altKey;
					this.physicalKeyboardStates.ctrlKey = evt.ctrlKey;
					this.physicalKeyboardStates.shiftKey = evt.shiftKey;
					break;
				case 0x14: // capslock
					if (this.capsLockPressed) {
						this.capsLockPressed = false;
					}
					break;
				default:
					state_key = false;
					break;
			}
			var edit = this.getFocusedEdit();

			if (edit && this.isServiceApplicable(edit)) {
				if (state_key) {
					this.dispatchKeyboardStateChangeEvent();
				} else {
					var key = this.translateKey(evt.keyCode);
					NFLCIME.dispatchEvent({
						type: 'KeyboardReleased',
						target: edit,
						keyCode: key
					})
					this.clearVirtualKeys();
				}
			};


		},
		onKeyPress: function(evt) {
			// cursor.js write to textarea and input in Firefox through keypress events;
			// setting this.keyCode to zero ensure

			if (this.keyCode) {
				var key = this.translateKey(this.keyCode);

				this.keyCode = 0;
				var edit = this.getFocusedEdit();

				if (edit) {
					// Firefox recreates an event object when it's sent between windows, so
					// we can't use the expando property to determine whether the event is
					// fake; charCode isn't set by ui.kb.js however, so we know
					var fake = (this.browser == 'firefox') ? !evt.charCode : evt.fake;
					// set what changes will be effected by the key;
					// this 
					var changes = this.determineChanges(edit, key);
					// don't handle carriage return or space unless the event is fake
					if ((key == 0x0d || key == 0x20) && !fake) {
						if (changes) {
							this.rememberChanges(changes);
						}
						return;
					}
					// see if there's text selected and let default action go forward if so (unless the event is fake)
					if ((key == 0x08 || key == 0x24) && (!fake || this.browser == 'firefox')) {
						var evt = {
							type: 'CursorGetSelectedText',
							target: edit,
							text: ''
						};
						NFLCIME.dispatchEvent(evt);
						if (evt.text.length > 0) {
							return;
						}
					}
					if (key == 0x08 && (fake && this.browser != 'firefox')) {
						// we typically leave it to the browser to handle backspace;
						// when the event is fake, however, we need to do so in IE 
						// and Safari since they don't react to the event
						if (!changes) {
							// make sure there's text behind the cursor
							var evt = {
								type: 'CursorGetContext',
								target: edit,
								textAhead: '',
								textBehind: '',
								behindCount: 1,
								aheadCount: 0
							};
							NFLCIME.dispatchEvent(evt);
							if (evt.textBehind.length > 0) {
								changes = {
									cursorStart: -1,
									cursorEnd: 0,
									insert: '',
									context: ''
								};
							}
						}
					}

					if (changes) {
						if (changes.cursorStart || changes.cursorEnd) {
							NFLCIME.dispatchEvent({
								type: 'CursorMove',
								target: edit,
								start: changes.cursorStart,
								end: changes.cursorEnd
							});
						} else if (changes.insert == ' ' && !fake) {
							// don't handle space unless the event is fake
							return;
						}

						var lang = {
							type: 'LanguageGet'
						};
						NFLCIME.dispatchEvent(lang);

						// THIS IS IMPORTANT!!!!!!!
						// add custom attributes for language


						var doc = edit.ownerDocument;
						var win = doc.defaultView;
						var selection = win.getSelection();
						var range = selection.getRangeAt(0);
						var container = range.commonAncestorContainer.parentNode
						var origContainer = container;

						var pEl = null;
						// walk container backwards to find a lang, or, alternately, a p
						while (container.nodeName != 'BODY' && !container.getAttribute('lang')) {
							if (container.nodeName == 'P') {
								pEl = container;
							}
							container = container.parentNode;
						}

						if (container.nodeName == 'BODY') {
							container = pEl;
						}

						var langAttr = container.getAttribute('lang');

						// within same language block
						if (langAttr && lang.code3 == langAttr) {
							NFLCIME.dispatchEvent({
								type: 'CursorInsertText',
								target: edit,
								lang: lang.code3,
								text: changes.insert,
								html: html
							});
						} else {

							// determine if we need to add a span, or modify P

							if (pEl && !(pEl.getAttribute('lang'))) {

								// configure paragraph element

								pEl.setAttribute("lang", lang.code3);
								pEl.setAttribute("class", "lang-" + lang.code3);
								pEl.setAttribute("dir", lang.direction);


								NFLCIME.dispatchEvent({
									type: 'CursorInsertText',
									target: edit,
									lang: lang.code3,
									text: changes.insert,
									html: html
								});

							} else {

								var html = '<span ';
								html += 'lang="' + lang.code3 + '" ';
								html += 'class="lang-' + lang.code3 + '" ';
								html += 'dir="' + lang.direction + '">';
								html += changes.insert;
								html += '</span>';

								NFLCIME.dispatchEvent({
									type: 'CursorInsertHTML',
									target: edit,
									lang: lang.code3,
									text: changes.insert,
									html: html
								});
							};


						}

						// remember the changes
						this.rememberChanges(changes);
						return false;
					}
				}
			}
		},
		//--- Private functions
		attachDOMHandlers: function(win) {
			this.attachDOMHandler(win.document, 'keyup', 'onKeyUp', true);
			this.attachDOMHandler(win.document, 'keydown', 'onKeyDown', true);
			this.attachDOMHandler(win.document, 'keypress', 'onKeyPress');
		},
		detachDOMHandlers: function(win) {
			this.detachDOMHandler(win.document, 'keyup', 'onKeyUp', true);
			this.detachDOMHandler(win.document, 'keydown', 'onKeyDown', true);
			this.detachDOMHandler(win.document, 'keypress', 'onKeyPress');
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
		getFocusedEdit: function() {
			var evt = {
				type: 'CursorGetFocusedEdit',
				target: null
			};
			NFLCIME.dispatchEvent(evt);
			return evt.target;
		},
		isServiceApplicable: function(edit) {
			// see if the kb service is active on for edit
			var evt = {
				type: 'ServiceApplicable',
				target: edit,
				service: 'kb',
				applicable: false
			};
			NFLCIME.dispatchEvent(evt);
			return evt.applicable;
		},
		// Clear virtual alt/ctrl/shift keys
		clearVirtualKeys: function(clearCapsLock) {
			this.virtualKeyboardStates.altKey = false;
			this.virtualKeyboardStates.ctrlKey = false;
			this.virtualKeyboardStates.shiftKey = false;
			if (clearCapsLock) {
				this.virtualKeyboardStates.capsLock = false;
			}
			this.dispatchKeyboardStateChangeEvent();
		},
		dispatchKeyboardStateChangeEvent: function() {
			var old_states = {
				altKey: this.combinedKeyboardStates.altKey,
				ctrlKey: this.combinedKeyboardStates.ctrlKey,
				shiftKey: this.combinedKeyboardStates.shiftKey,
				capsLock: this.combinedKeyboardStates.capsLock
			};
			this.combinedKeyboardStates.altKey = this.physicalKeyboardStates.altKey || this.virtualKeyboardStates.altKey;
			this.combinedKeyboardStates.ctrlKey = this.physicalKeyboardStates.ctrlKey || this.virtualKeyboardStates.ctrlKey;
			this.combinedKeyboardStates.shiftKey = this.physicalKeyboardStates.shiftKey || this.virtualKeyboardStates.shiftKey;
			this.combinedKeyboardStates.capsLock = this.physicalKeyboardStates.capsLock || this.virtualKeyboardStates.capsLock;
			var new_states = this.combinedKeyboardStates;
			if ((old_states.altKey != new_states.altKey) || (old_states.ctrlKey != new_states.ctrlKey) || (old_states.shiftKey != new_states.shiftKey) || (old_states.capsLock != new_states.capsLock)) {
				var plane = '';
				if (new_states.altKey) {
					plane += 'Alt';
				}
				if (new_states.capsLock) {
					plane += 'Capslock';
				}
				if (new_states.ctrlKey) {
					plane += 'Ctrl';
				}
				if (new_states.shiftKey) {
					plane += 'Shift';
				}
				if (!this[plane]) {
					if (plane.indexOf('Capslock') != -1) {
						// deal with capslock
						if (plane.indexOf('Shift') != -1) {
							// shift cancels capslock
							plane = plane.replace('Capslock', '').replace('Shift', '');
						} else {
							// capslock acts as shift
							plane = plane.replace('Capslock', '') + 'Shift';
						}
					}
					if (plane == '') {
						plane = 'Normal';
					}
				}
				this.combinedKeyboardStates.plane = plane;

				NFLCIME.dispatchEvent({
					type: 'KeyboardStatesChanged'
				});
			}
		},
		translateKey: function(key) {
			switch (key) {
				// The following keyCodes are mapped differently in Firefox.
				case 0x3b:
					key = 0xba;
					break; // ;
				case 0x6b:
					key = 0xbb;
					break; // =
				case 0x6d:
					key = 0xbd;
					break; // -
			}
			return key;
		},
		getKeyMappings: function() {
			return this['map' + this.combinedKeyboardStates.plane];
		},
		lookUpKey: function(key, context) {
			var result = {
				insert: '',
				context: '',
				isMultikey: false
			};
			var mappings = this.getKeyMappings();

			var entry;
			if (mappings && (entry = mappings[key]) != undefined) {
				// usually the entry is a Unicode string to be inserted; but sometimes we want to perform a look-up of possible combination
				// without inserting a character should the look-up fail; in such a case the entry be an object instead of a string (e.g. kb.geez.amharic.powergeez)
				if (entry instanceof Object) {
					result.insert = entry.insert;
					result.context = entry.context;
				} else {
					// the context is the letter
					result.insert = entry;
					result.context = entry;
				}
				if (this.multikeyCombinations) {
					// this keyboard has multi-key sequences (e.g. A + ' => �)
					entry = this.multikeyCombinations[context + result.context];
					if (entry != undefined) {
						result.isMultikey = true;
						// do this again in case the multikey combination leave behind a context that isn't what will be inserted
						if (entry instanceof Object) {
							result.insert = entry.insert;
							result.context = entry.context;
						} else {
							result.insert = entry;
							result.context = entry;
						}
					} else {
						if (this.multikeyNoMatch) {
							entry = this.multikeyNoMatch[result.context];
							if (entry != undefined) {
								result.isMultikey = true;
								if (entry instanceof Object) {
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
		determineChanges: function(edit, key) {
			var changes = {
				cursorStart: 0,
				cursorEnd: 0,
				insert: '',
				context: ''
			};
			var keyinfo = this.lookUpKey(key, this.currentContext);
			if (keyinfo) {
				changes.insert = keyinfo.insert;
				changes.context = keyinfo.context;
				if (keyinfo.isMultikey) {
					if (changes.insert) {
						// replace the previously inserted character
						changes.cursorStart = -this.lastInsertion.length;
					}
				} else {
					if (!this.lastInsertion && this.currentContext) {
						// the previous key was a dead-key; as we can't find any combination, just
						// insert the character it stands for along with the new character--unless 
						// it's a space, in which case we'll insert only the dead-key character
						if (keyinfo.insert == ' ') {
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
		rememberChanges: function(changes) {
			this.lastInsertion = changes.insert;
			this.currentContext = changes.context;
		},
		deleleCharacter: function(edit, direction) {
			return false;
		},
		clearContext: function() {
			this.currentContext = '';
			this.lastInsertion = '';
		},
		// Initialization function
		initialize: function(env, subclassing) {
			this.browser = env.browser;
			this.closures = {};
			this.active = false;
			// only keyboard layouts can be activated
			if (this.type == 'keyboard layout') {
				NFLCIME.addEventListener('ModuleActivate', this);
				NFLCIME.addEventListener('ModuleDeactivate', this)
			}
			// keep an eye on focus change so the keyboard states can be updated when the browser lose or gain focus
			if (!subclassing) {
				NFLCIME.addEventListener('FocusChanged', this);
			}
		},
		//--- Private variables
		active: false,
		browser: '',
		physicalKeyboardStates: {
			capsLock: false,
			shiftKey: false,
			altKey: false,
			ctrlKey: false
		},
		virtualKeyboardStates: {
			capsLock: false,
			shiftKey: false,
			altKey: false,
			ctrlKey: false
		},
		combinedKeyboardStates: {
			capsLock: false,
			shiftKey: false,
			altKey: false,
			ctrlKey: false,
			plane: 'Normal'
		},
		closures: null,
		lastInsertion: '',
		keyCode: 0,
		capsLockPressed: false,
		currentContext: ''
	}
});