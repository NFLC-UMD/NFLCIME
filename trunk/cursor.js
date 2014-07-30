NFLCIME.dispatchEvent({
	type : 'ModuleAdd',
	module : {
		id : 'cursor',
		type : 'core',
		onModuleActivate : function(evt) {
			var module = evt.module;
			if (module == this && !this.active) {
				this.active = true;
				// get list of windows for which IME is already activated and
				// attach DOM handlers to them
				var list = [];
				NFLCIME.dispatchEvent({
							type : 'WindowGetList',
							list : list
						});
				for (var i = 0; i < list.length; i++) {
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
				NFLCIME.addEventListener('CursorInsertEmptyText', this);
			}
		},
		onModuleDeactivate : function(evt) {
			var module = evt.module;
			if (module == this && this.active) {
				this.active = false;
				var list = [];
				NFLCIME.dispatchEvent({
							type : 'WindowGetList',
							list : list
						});
				for (var i = 0; i < list.length; i++) {
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
		// --- Event handlers
		// Move the selection
		onCursorMove : function(evt) {
			var edit = evt.target;
			var move_end = evt.end;
			var move_start = evt.start;
			var doc = edit.ownerDocument;
			switch (this.browser) {
				case 'ie' :
					// TODO: check to ensure the new selection doesn't end up
					// outside the edit box
					var range = doc.selection.createRange();
					// move the end point first if it's being moved forward, so
					// the starting point won't end up moving past it
					if (move_end > 0) {
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
				case 'firefox' :
				case 'safari' :
					if (edit.tagName == 'TEXTAREA' || edit.tagName == 'INPUT') {
						if (move_end > 0) {
							edit.selectionEnd += move_end;
							edit.selectionStart += move_start;
						} else {
							edit.selectionStart += move_start;
							edit.selectionEnd += move_end;
						}
					} else {
						var win = doc.defaultView;
						try {
							var selection = win.getSelection();
							var range = selection.getRangeAt(0);
							if (move_end > 0) {
								this.moveRangeEnd(edit, range, move_end);
								this.moveRangeStart(edit, range, move_start);
							} else {
								this.moveRangeStart(edit, range, move_start);
								this.moveRangeEnd(edit, range, move_end);
							}
							// need to do this for safari as modifying the range
							// alone doesn't change the selection
							if (this.browser == 'safari') {
								var new_range = range.cloneRange();
								selection.removeAllRanges();
								selection.addRange(new_range);
							}
						} catch (e) {
							if(window.console) console.log(e);
						}
					}
					break;
			}
			if (edit == this.focusedEdit) {
				this.previousCursorPosition = this.getCursorPosition(edit);
			}
		},
		onCursorSaveFocusedEdit : function(evt) {
			var edit = evt.target;
			this.previousFocusedEdit = edit;
		},
		onCursorRestoreFocusedEdit : function(evt) {
			if (this.previousFocusedEdit) {
				var edit = this.previousFocusedEdit;
				var doc = edit.ownerDocument;
				var win = (doc.parentWindow)
						? doc.parentWindow
						: doc.defaultView;
				win.focus();
				edit.focus();
				evt.target = this.previousFocusedEdit;
			}
		},
		onCursorGetContainer : function(evt) {
			var edit = evt.target;
			switch (this.browser) {
				case 'ie' :
					if (edit.tagName == 'TEXTAREA' || edit.tagName == 'INPUT') {
						evt.container = edit;
					} else {
						var range = document.selection.createRange();
						evt.container = range.parentElement();
					}
					break;
				case 'firefox' :
				case 'safari' :
					if (edit.tagName == 'TEXTAREA' || edit.tagName == 'INPUT') {
						evt.container = edit;
					} else {
						var doc = edit.ownerDocument;
						var win = doc.defaultView;
						try {
							var selection = win.getSelection();
							if (selection.rangeCount > 0) {
								var range = selection.getRangeAt(0);
								var container = range.commonAncestorContainer;
								evt.container = (container.nodeType == 1)
										? container
										: container.parentNode;
							}
						} catch (e) {
							if(window.console) console.log(e);
						}
					}
					break;
			}
		},
		// Get a certain number of character before and after the selection
		onCursorGetContext : function(evt) {
			var edit = evt.target;
			var behind_count = evt.behindCount;
			var ahead_count = evt.aheadCount;
			evt.textBehind = '';
			evt.textAhead = '';
			switch (this.browser) {
				case 'ie' :
					var range = document.selection.createRange();
					var edit_parent = edit.parentNode;
					range = range.duplicate();
					var bookmark = range.getBookmark();
					range.collapse(true);
					for (var i = 0, outside = false; !outside
							&& i < behind_count; i++) {
						range.moveStart('character', -1);
						outside = true;
						for (var p = range.parentElement(); p; p = p.parentNode) {
							if (p == edit) {
								evt.textBehind = range.text;
								outside = false;
								break;
							}
						}
					}
					range.moveToBookmark(bookmark);
					range.collapse(false);
					for (var i = 0, outside = false; !outside
							&& i < ahead_count; i++) {
						range.moveEnd('character', +1);
						outside = true;
						for (var p = range.parentElement(); p; p = p.parentNode) {
							if (p == edit) {
								evt.textAhead = range.text;
								outside = false;
								break;
							}
						}
					}
					range.moveToBookmark(bookmark);
					break;
				case 'firefox' :
				case 'safari' :
					if (edit.tagName == 'TEXTAREA' || edit.tagName == 'INPUT') {
						var value = edit.value;
						var behind_end = edit.selectionStart;
						var behind_start = Math.max(0, edit.selectionStart
										- behind_count);
						var ahead_start = edit.selectionEnd;
						var ahead_end = Math.min(value.length,
								edit.selectionEnd + ahead_count);
						evt.textAhead = value.substring(ahead_start, ahead_end);
						evt.textBehind = value.substring(behind_start,
								behind_end);
					} else {
						var doc = edit.ownerDocument;
						var win = doc.defaultView;
						try {
							var selection = win.getSelection();
							var range = selection.getRangeAt(0);
							var text = range.toString();
							var behind_range = range.cloneRange();
							behind_range.collapse(true);
							this.moveRangeStart(edit, behind_range,
									-behind_count);
							evt.textBehind = behind_range.toString();
							var ahead_range = range.cloneRange();
							ahead_range.collapse(true);
							this.moveRangeStart(edit, ahead_range,
									text.length);
							this.moveRangeEnd(edit, ahead_range, +ahead_count);
							evt.textAhead = ahead_range.toString();
						} catch (e) {
							if(window.console) console.log(e);
						}
					}
					break;
			}
		},
		onCursorGetFocusedEdit : function(evt) {
			if (this.focusedEdit && !this.windowLostFocus) {
				evt.target = this.focusedEdit;
			}
		},
		// Insert text at the cursor, removing any selected text
		onCursorInsertText : function(evt) {
			var edit = evt.target;
			var text = evt.text;
			var doc = edit.ownerDocument;
			switch (this.browser) {
				case 'ie' :
					// TODO: check to see if the range is in the edit
					var range = doc.selection.createRange();
					if (range.text.length > 0) {
						doc.selection.clear();
					}
					if (text) {
						range.text = text;
						range.collapse(false);
						range.scrollIntoView();
					}
					break;
				case 'firefox' :
				case 'safari' :
					if (edit.tagName == 'TEXTAREA' || edit.tagName == 'INPUT') {
						if (this.browser == 'firefox') {
							if (text) {
								// change
								text = text.replace(/([^\u000a]|^)\u000d/,
										'$1\u000a');
								for (var i = 0; i < text.length; i++) {
									var c = text.charCodeAt(i);
									var evt = doc.createEvent('KeyEvents');
									evt.initKeyEvent('keypress', true, true,
											win, false, false, false, false, 0,
											c);
									edit.dispatchEvent(evt);
								}
							} else {
								// delete the selection
								if (edit.selectionStart != edit.selectionEnd) {
									var evt = doc.createEvent('KeyEvents');
									evt.initKeyEvent('keypress', true, true,
											win, false, false, false, false,
											0x08, 0);
									edit.dispatchEvent(evt);
								}
							}
						} else {
							var value = edit.value;
							var beginning = value
									.substr(0, edit.selectionStart)
									+ text;
							var end = value.substr(edit.selectionEnd);
							edit.value = beginning;
							edit.scrollTop = edit.scrollHeight;
							edit.scrollLeft = edit.scrollWidth;
							edit.value = beginning + end;
							edit.setSelectionRange(beginning.length,
									beginning.length);
						}
					} else {
						var win = doc.defaultView;

						var selection = win.getSelection();
						var range = selection.getRangeAt(0);
						if (range.toString().length > 0) {
							range.deleteContents();
						}
						if (text) {
							var text_node = doc.createTextNode(text);
							range.insertNode(text_node);
							// now we need to normalize the text node so complex
							// text will join correctly
							// first, figure out where the selection will be
							// after the normalization
							var cursor = this.findNormalizedPosition(text_node,
									text.length);
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
						// scroll the container if the caret isn't visible,
						// inserting a span so we know where it is
						var caret = doc.createElement('SPAN');
						caret.textContent = '\u200d'; // ZWJ
						range.insertNode(caret);
						var top = caret.offsetTop, bottom = top
								+ caret.offsetHeight;
						var left = caret.offsetLeft, right = left
								+ caret.offsetWidth;
						for (view = caret.offsetParent; view
								&& view.nodeType == 1; view = view.parentNode) {
							var view_top = view.scrollTop, view_bottom = view_top
									+ view.clientHeight;
							var view_left = view.scrollLeft, view_right = view_left
									+ view.clientWidth;
							if (view == doc.body) {
								var html = view.parentNode;
								view_bottom = view_top + html.clientHeight;
								view_right = view_left + html.clientWidth;
							}
							if (top < view_top) {
								view.scrollTop += top - view_top;
							} else if (bottom > view_bottom) {
								view.scrollTop += bottom - view_bottom;
							}
							if (left < view_left) {
								view.scrollLeft += left - view_left;
							} else if (right > view_right) {
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
						if (prev && next && prev.nodeType == 3
								&& next.nodeType == 3) {
							var cursor = this.findNormalizedPosition(prev,
									prev.nodeValue.length);
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
			if (edit == this.focusedEdit) {
				this.previousCursorPosition = this.getCursorPosition(edit);
			}
		},
		// Insert HTML at the cursor
		onCursorInsertHTML : function(evt) {
			var edit = evt.target;
			var html = evt.html;
			var plain_text = evt.text;
			var doc = edit.ownerDocument;
			if (edit.tagName == 'TEXTAREA' || edit.tagName == 'INPUT') {
				this.onCursorInsertText(evt);
			} else {
				switch (this.browser) {
					case 'ie' :
						// TODO: check to see if the range is in the edit
						var range = doc.selection.createRange();
						if (range.text.length > 0) {
							doc.selection.clear();
						}
						range.pasteHTML(html);
						range.collapse(false);
						range.scrollIntoView();
						break;
					case 'firefox' :
					case 'safari' :
						var win = doc.defaultView;
						var selection = win.getSelection();
						var range = selection.getRangeAt(0);
						var fragment = range.createContextualFragment(html);
						var last = fragment.lastChild;
						var parNode = range.startContainer.parentNode;
						
						range.deleteContents();
						
						if(parNode.getAttribute('lang')){
							var langRange = document.createRange();
							langRange.setStartAfter(parNode);
							langRange.insertNode(fragment)
						}else{
							range.insertNode(fragment);
						}
						
						// set cursor to behind last item
						if (last) {
							selection.collapse(last, (last.nodeType == 3)
											? last.nodeValue.length
											: 1);
							var element = (last.nodeType == 3)
									? last.parentNode
									: last;
							element.scrollIntoView(false);
						}
						break;
				}
			}
			if (edit == this.focusedEdit) {
				this.previousCursorPosition = this.getCursorPosition(edit);
			}
		},
		onCursorInsertTag : function(evt) {
			var edit = evt.target;
			var tag = evt.html;
			var doc = edit.ownerDocument;
			if (edit.tagName == 'TEXTAREA' || edit.tagName == 'INPUT') {
			} else {
				switch (this.browser) {
					case 'ie' :
						// TODO: check to see if the range is in the edit
						var range = doc.selection.createRange();
						if (range.text.length > 0) {
							doc.selection.clear();
						}
						range.pasteHTML(tag);
						range.collapse(true);
						range.scrollIntoView();
						break;
					case 'firefox' :
					case 'safari' :
						var win = doc.defaultView;
						var selection = win.getSelection();
						var range = selection.getRangeAt(0);
						range.deleteContents();
						var fragment = range.createContextualFragment(tag);
						var last = fragment.lastChild;
						range.insertNode(fragment);
						// set cursor to within last item
						if (last) {
							range.setStart(last, 0);
							range.setEnd(last, 0);
							selection.removeAllRanges();
							selection.addRange(range);
							var element = (last.nodeType == 3)
									? last.parentNode
									: last;
							element.scrollIntoView(false);
						}
						break;
				}
			}
			if (edit == this.focusedEdit) {
				// this.previousCursorPosition = this.getCursorPosition(edit);
			}
		},
		onCursorInsertEmptyText : function(evt){
			var doc = evt.target,
			    selection = doc.getSelection(),
			    range =  selection.getRangeAt(0),
			    par_selection_node = range.commonAncestorContainer.parentNode,
			    insertAfter = function h(a, d) {
				var b = d.nextSibling,
				    f = d.parentNode;
				
				b ? f.insertBefore(a, b) : f.appendChild(a);
				return a
			    },
			    text_Node = doc.createTextNode('\ufeff'),
			    text_Node = insertAfter(text_Node, par_selection_node);
			    
			    range.setStartAfter(text_Node);
			    selection.removeAllRanges();
			    selection.addRange(range);	
		},
		onCursorGetSelectedText : function(evt) {
			var edit = evt.target;
			var text = evt.text;
			var doc = edit.ownerDocument;
			switch (this.browser) {
				case 'ie' :
					var range = doc.selection.createRange();
					evt.text = range.text;
					break;
				case 'firefox' :
				case 'safari' :
					if (edit.tagName == 'TEXTAREA' || edit.tagName == 'INPUT') {
						evt.text = edit.value.substring(edit.selectionStart,
								edit.selectionEnd);
					} else {
						var win = doc.defaultView;
						if (win) {
							var selection = win.getSelection();
							if (selection.rangeCount > 0) {
								var range = selection.getRangeAt(0);
								evt.text = range.toString();
							} else {
								evt.text = '';
							}
						}
					}
					break;
			}
		},
		// Clear selected text
		onCursorClearSelection : function(evt) {
			var edit = evt.target;
			var doc = edit.ownerDocument;
			switch (this.browser) {
				case 'ie' :
					var range = doc.selection.createRange();
					var parent = range.parentElement();
					if (range.text.length > 0) {
						doc.selection.clear();
					}
					range.collapse(false);
					break;
				case 'firefox' :
				case 'safari' :
					if (edit.tagName == 'TEXTAREA' || edit.tagName == 'INPUT') {
						var sel_start = edit.selectionStart, sel_end = edit.selectionEnd;
						edit.value = edit.value.substr(0, sel_start)
								+ edit.value.substr(sel_end);
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
		fireElementChangeEvent : function() {
			var element;
			if (this.focusedEdit) {
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
		onElementFocus : function(evt) {
			var element = evt.target;
	
			if (element && element.nodeType == 9) {
				element = element.body;
			}
			if (element && element.tagName == 'HTML') {
				element = element.ownerDocument.body;
			}
			if (!element || element.tagName != 'IFRAME') {
				if (this.focusedEdit != element) {
					
					var prev = this.focusedEdit;
					if (!this.isEditControl(element)) {
						element = null;
					}
					
					this.focusedEdit = element;
			
					NFLCIME.dispatchEvent({
								type : 'FocusChanged',
								target : this.focusedEdit,
								previousTarget : prev
							});
					if (this.focusedEdit) {
						this.previousCursorPosition = this
								.getCursorPosition(this.focusedEdit);
						this.scheduleCursorCheck(true);
					} else {
						this.stopCursorCheck();
					}
				}
				if (this.onElementBlurTimeoutId) {
					clearTimeout(this.onElementBlurTimeoutId);
					this.onElementBlurTimeoutId = 0;
				}
			}
		},
		onElementBlurTimeoutId : 0,
		onElementBlur : function(evt) {
			var element = evt.target;
			if (!element)
				return;
			if (element.hasAttribute && element.hasAttribute('nflcime'))
				this.fireElementChangeEvent();
			if (element.nodeType == 9) {
				element = element.body;
			}
			if (element && element.tagName != 'IFRAME') {
				if (this.focusedEdit && !this.windowLostFocus) {
					NFLCIME.dispatchEvent({
								type : 'CursorSaveFocusedEdit',
								target : this.focusedEdit
							});
					// don't notify yet, since a focus event might follow
					// immediately
					if (this.onElementBlurTimeoutId) {
						clearTimeout(this.onElementBlurTimeoutId);
					}
					var closure = this.closures['onElementBlurNotify'];
					if (!closure) {
						var self = this;
						closure = function() {
							self.onElementBlurNotify()
						};
						this.closures['onElementBlurNotify'] = closure;
					}
					this.onElementBlurTimeoutId = setTimeout(closure, 50);
				}
			}
		},
		onElementBlurNotify : function() {
			this.fireElementChangeEvent();
			var prev = this.focusedEdit;
			this.focusedEdit = null;
			NFLCIME.dispatchEvent({
						type : 'FocusChanged',
						target : this.focusedEdit,
						previousTarget : prev
					});
			this.onElementBlurTimeoutId = 0;
			this.stopCursorCheck();
		},
		// Check to see if the previously focused element regained focus when
		// the window regained focus
		onWindowFocus : function(evt) {
			
			if (!evt.target.nodeType) {
				if (this.windowLostFocus && this.focusedEdit) {
					if (!this.focusedEdit.hasFocus
							|| this.focusedEdit.hasFocus()) {
						NFLCIME.dispatchEvent({
									type : 'FocusChanged',
									target : this.focusedEdit,
									previousTarget : null
								});
					} else {
						this.focusedEdit = null;
					}
				}
				this.windowLostFocus = false;
			}
		},
		// Focus is lost if the window containing the focused element loses
		// focus
		onWindowBlur : function(evt) {
			if (!evt.target.nodeType) {
				if (this.focusedEdit
						&& evt.target.document == this.focusedEdit.ownerDocument) {
					NFLCIME.dispatchEvent({
								type : 'FocusChanged',
								target : null,
								previousTarget : this.focusedEdit
							});
				}
				this.windowLostFocus = true;
			}
		},
		onWindowListen : function(evt) {
			var win = evt.target;
			this.attachDOMHandlers(win);
		},
		onWindowIgnore : function(evt) {
			var win = evt.target;
			var doc = win.doc;
			this.detachDOMHandlers(win);

			// make sure we're not hanging onto objects from the window being
			// ignored
			if (this.focusedEdit) {
				if (this.focusedEdit.ownerDocument == doc) {
					var prev = this.focusedEdit;
					this.focusedEdit = null;
					NFLCIME.dispatchEvent({
								type : 'FocusChanged',
								target : this.focusedEdit,
								previousTarget : prev
							});
				}
			}
			if (this.previousFocusedEdit) {
				if (this.previousFocusedEdit.ownerDocument == doc) {
					this.previousFocusedEdit = null;
				}
			}
			if (this.previousCursorPosition) {
				switch (this.previousCursorPosition.type) {
					case 'ie range' :
						var parent = this.previousCursorPosition.data
								.parentElement();
						if (!parent || parent.ownerDocument == doc) {
							this.previousCursorPosition = null;
						}
						break;
					case 'dom selection indices' :
						var parent = this.previousCursorPosition.data.edit;
						if (!parent || parent.ownerDocument == doc) {
							this.previousCursorPosition = null;
						}
						break;
					case 'dom range' :
						var parent = this.previousCursorPosition.data.commonAncestorContainer;
						if (!parent || parent.ownerDocument == doc) {
							this.previousCursorPosition = null;
						}
						break;
				}

			}
		},
		// See if the cursor has moved
		onKeyDown : function(evt) {
			this.scheduleCursorCheck();
		},
		onMouseDown : function(evt) {
			var target = evt.target;
			var doc = (target.nodeType == 1) ? target.ownerDocument : target;
			this.attachDOMHandler(doc, 'mousedown', 'onMouseMove');
			this.scheduleCursorCheck(false);
		},
		onMouseUp : function() {
			this.detachDOMHandler(doc, 'mousedown', 'onMouseMove');
		},
		onMouseMove : function() {
			this.checkCursorPosition(false);
		},
		// --- Private functions
		// Add handlers for activate and deactivate event so the focus can be
		// tracked
		attachDOMHandlers : function(win) {
			var doc = win.document;
			this.attachDOMHandler(doc, 'keydown', 'onKeyDown');
			this.attachDOMHandler(doc, 'mousedown', 'onMouseDown');
			this.attachDOMHandler(doc, 'mouseup', 'onMouseDown');
			switch (this.browser) {
				case 'ie' :
					this.attachDOMHandler(doc, 'focusin', 'onElementFocus');
					this.attachDOMHandler(doc, 'focusout', 'onElementBlur');
					break;
				case 'firefox' :
					this.attachDOMHandler(doc, 'focus', 'onElementFocus', true);
					this.attachDOMHandler(doc, 'blur', 'onElementBlur', true);
					this.attachDOMHandler(win, 'focus', 'onWindowFocus');
					this.attachDOMHandler(win, 'blur', 'onWindowBlur');
					break;
				case 'safari' :
					this.attachDOMHandler(doc, 'DOMFocusIn', 'onElementFocus');
					this.attachDOMHandler(doc, 'DOMFocusOut', 'onElementBlur');
					this.attachDOMHandler(win, 'focus', 'onWindowFocus');
					this.attachDOMHandler(win, 'blur', 'onWindowBlur');
					break;
			}
		},
		detachDOMHandlers : function(win) {
			var doc = win.document;
			this.attachDOMHandler(doc, 'keydown', 'onKeyDown');
			this.attachDOMHandler(doc, 'mousedown', 'onMouseDown');
			this.attachDOMHandler(doc, 'mouseup', 'onMouseDown');
			this.attachDOMHandler(doc, 'mousemove', 'onMouseMove');
			switch (this.browser) {
				case 'ie' :
					this.detachDOMHandler(doc, 'focusin', 'onElementFocus');
					this.detachDOMHandler(doc, 'focusout', 'onElementBlur');
					break;
				case 'firefox' :
					this.detachDOMHandler(doc, 'focus', 'onElementFocus', true);
					this.detachDOMHandler(doc, 'blur', 'onElementBlur', true);
					this.detachDOMHandler(win, 'focus', 'onWindowFocus');
					this.detachDOMHandler(win, 'blur', 'onWindowBlur');
					break;
				case 'safari' :
					this.detachDOMHandler(doc, 'DOMFocusIn', 'onElementFocus');
					this.detachDOMHandler(doc, 'DOMFocusOut', 'onElementBlur');
					this.detachDOMHandler(win, 'focus', 'onWindowFocus');
					this.detachDOMHandler(win, 'blur', 'onWindowBlur');
					break;
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
		// Whether an element is editable
		isEditControl : function(element) {
			if (element.tagName == 'TEXTAREA') {
				return !element.disabled;
			} else if (element.tagName == 'INPUT'
					&& (element.type == 'text' || element.type == 'file' || element.type == 'password')) {
				return !element.disabled;
			} else if (element.contentEditable == 'true') {
				return !element.disabled;
			} else if (element.ownerDocument
					&& element.ownerDocument.designMode == 'on') {
				return !element.disabled;
			}
			return false;
		},
		// Move the end-point of a DOM range object
		moveRangeEnd : function(container, range, amount) {
			if (amount == 0) {
				return;
			}
			var result = (amount < 0) ? this.findIndexBehind(container,
					range.endContainer, range.endOffset, -amount, true) : this
					.findIndexAhead(container, range.endContainer,
							range.endOffset, amount, true);
			range.setEnd(result.node, result.index);
		},
		// Move the starting-point of a DOM range object
		moveRangeStart : function(container, range, amount) {
			if (amount == 0) {
				return;
			}
			var result = (amount < 0)
					? this.findIndexBehind(container, range.startContainer,
							range.startOffset, -amount, true)
					: this.findIndexAhead(container, range.startContainer,
							range.startOffset, amount, true);
			range.setStart(result.node, result.index);
		},
		// Find a text node and index at a given distance ahead of the given
		// node and index
		findIndexAhead : function(container, node, index, amount, canScanUp) {
			var result = {
				node : node,
				index : index,
				amount : 0
			};
			if (node.nodeType == 3) {
				var text = node.nodeValue;
				result.index = Math.min(text.length, index + amount);
				result.amount = result.index - index;
			} else {
				var amount_found = 0;
				for (var c = node.childNodes[index]; c; c = c.nextSibling) {
					result = this.findIndexAhead(container, c, 0, amount
									- amount_found, false);
					amount_found += result.amount;
					result.amount = amount_found;
					if (amount_found == amount) {
						break;
					}
				}
			}
			if (result.amount < amount) {
				// don't go pass the container
				if (node != container && canScanUp) {
					// scan parent node, starting from the next node
					var node_index = this.findNodeIndex(node);
					var new_result = this.findIndexAhead(container,
							node.parentNode, node_index + 1, amount
									- result.amount, true);
					new_result.amount += result.amount;
					result = new_result;
				}
			}
			return result;
		},
		// Find a text node and index at a given distance behind the given node
		// and index
		findIndexBehind : function(container, node, index, amount, canScanUp) {
			var result = {
				node : node,
				index : index,
				amount : 0
			};
			if (node.nodeType == 3) {
				result.index = Math.max(0, index - amount);
				result.amount = index - result.index;
			} else {
				if (index > 0) {
					var amount_found = 0;
					for (var c = node.childNodes[index - 1]; c; c = c.previousSibling) {
						var end_index;
						if (c.nodeType == 3) {
							end_index = c.nodeValue.length;
						} else {
							end_index = c.childNodes.length;
						}
						result = this.findIndexBehind(container, c, end_index,
								amount - amount_found, false);
						amount_found += result.amount;
						result.amount = amount_found;
						if (amount_found == amount) {
							break;
						}
					}
				}
			}
			if (result.amount < amount) {
				// don't go pass the container
				if (node != container && canScanUp) {
					// scan parent node, starting from the previous node
					var node_index = this.findNodeIndex(node);
					var new_result = this.findIndexBehind(container,
							node.parentNode, node_index,
							amount - result.amount, true);
					new_result.amount += result.amount;
					result = new_result;
				}
			}
			return result;
		},
		// Calculate new indices after neighboring textnodes are fused during
		// normalization
		findNormalizedPosition : function(node, index) {
			var text_index = index;
			var first_text_node = node;
			for (var c = node.previousSibling; c; c = c.previousSibling) {
				if (c.nodeType == 3) {
					text_index += c.nodeValue.length;
					first_text_node = c;
				} else {
					break;
				}
			}
			var node_index = this.findNodeIndex(first_text_node);
			return {
				nodeIndex : node_index,
				textIndex : text_index
			};
		},
		// Find the index of a node
		findNodeIndex : function(node) {
			for (var i = 0, c = node.parentNode.firstChild; c; i++, c = c.nextSibling) {
				if (c == node) {
					return i;
				}
			}
		},
		scheduleCursorCheck : function(continuous) {
			if (continuous) {
				if (!this.cursorCheckIntervalID) {
					var closure = this.closures['checkCursorPositionInterval'];
					if (!closure) {
						var self = this;
						var closure = function() {
							self.checkCursorPosition();
						}
						this.closures['checkCursorPositionInterval'] = closure;
					}
					this.cursorCheckIntervalID = setInterval(closure, 100);
				}
			} else {
				if (!this.cursorCheckTimeoutID) {
					var closure = this.closures['checkCursorPositionTimeout'];
					if (!closure) {
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
		stopCursorCheck : function() {
			if (this.cursorCheckTimeoutID) {
				clearTimeout(this.cursorCheckTimeoutID);
				this.cursorCheckIntervalID = 0;
			}
			if (this.cursorCheckIntervalID) {
				clearInterval(this.cursorCheckIntervalID);
				this.cursorCheckIntervalID = 0;
			}
		},
		checkCursorPosition : function() {
				
			if (this.focusedEdit && !this.windowLostFocus) {
				var new_pos = this.getCursorPosition(this.focusedEdit);
				var old_pos = this.previousCursorPosition;
				if (!this.compareCursorPosition(new_pos, old_pos)) {
					if (old_pos) {
						NFLCIME.dispatchEvent({
									type : 'CursorMoved',
									target : this.focusedEdit
								});
						this.disposeCursorPosition(old_pos);
					}
					this.previousCursorPosition = new_pos;
				} else {
					this.disposeCursorPosition(new_pos);
				}
			}
		},
		getCursorPosition : function(edit) {
			try {
				var obj = {};
				switch (this.browser) {
					case 'ie' :
						var doc = edit.ownerDocument;
						var range = doc.selection.createRange();
						if (range && range.duplicate) {
							obj.data = range.duplicate();
							obj.type = 'ie range';
						} else {
							obj.type = 'null';
						}
						break;
					case 'firefox' :
					case 'safari' :
						if (edit.tagName == 'TEXTAREA'
								|| edit.tagName == 'INPUT') {
							obj.data = {
								edit : edit,
								selectionStart : edit.selectionStart,
								selectionEnd : edit.selectionEnd
							};
							obj.type = 'dom selection indices';
						} else {
							var doc = edit.ownerDocument;
							var win = doc.defaultView;
							var selection = win.getSelection();
							if (selection.rangeCount > 0) {
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
			} catch (e) {
				return null;
			}
		},
		compareCursorPosition : function(a, b) {
			if (!a || !b) {
				return false;
			}
			if (a.type != b.type) {
				return false;
			}
			switch (a.type) {
				case 'ie range' :
					return a.data.isEqual(b.data);
				case 'dom selection indices' :
					return (a.data.edit == b.data.edit
							&& a.data.selectionStart == b.data.selectionStart && a.data.selectionEnd == b.data.selectionEnd);
				case 'dom range' :
					// need the try block in case a and b are in different block
					try {
						return ((a.data.compareBoundaryPoints(Range.END_TO_END,
								b.data) == 0) && (a.data.compareBoundaryPoints(
								Range.START_TO_START, b.data) == 0));
					} catch (e) {
						return false;
					}
			}
		},
		disposeCursorPosition : function(p) {
			if (p) {
				switch (p.type) {
					case 'dom range' :
						p.data.detach();
				}
			}
		},
		initialize : function(env) {
			this.browser = env.browser;
			this.closures = {};
			NFLCIME.addEventListener('ModuleActivate', this);
			NFLCIME.addEventListener('ModuleDeactivate', this);
		},
		// --- Private variables
		active : false,
		browser : null,
		closures : null,
		focusedEdit : null,
		previousFocusedEdit : null,
		windowLostFocus : false,
		previousCursorPosition : null,
		cursorCheckIntervalID : 0,
		cursorCheckTimeoutID : 0
	}
});