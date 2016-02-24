var NFLCIME;
var module;
// get the NFLCIME object
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
function loadStyleSheets() {
	var interface_css = 'ui.iframe.css';
	var module_css = 'ui.kb.css';
	if(NFLCIME) {
		var evt = { type:'UIModuleGetStyleSheet', moduleId:'ui.kb', styleSheetType:'frame' };
		evt.url = interface_css;
		NFLCIME.dispatchEvent(evt);
		interface_css = evt.url;
		var evt = { type:'UIModuleGetStyleSheet', moduleId:'ui.kb', styleSheetType:'contents' };
		evt.url = module_css;
		NFLCIME.dispatchEvent(evt);
		module_css = evt.url;
	}
	element('interface-css').href = interface_css;
	element('module-css').href = module_css;
}
loadStyleSheets();
function element(id) {
	return document.getElementById(id);
}
function attachDOMHandler(element, eventName, handler) {
	switch(module.browser) {
		case 'ie':
			element.attachEvent('on' + eventName, 
				function(evt) {
					evt.target = evt.srcElement;
					var result = handler.call(self, evt);
					evt.returnValue = result;
				}
			);
			break;
		case 'firefox':
		case 'safari':
			element.addEventListener(eventName, handler, 
				function(evt) {
					var result = handler.call(self, evt);
					if(result != undefined && result == false) {
						evt.preventDefault();
					}
				}
			);
			break;
	}
}

function onKeyboardPressed(evt) {
	var key = evt.keyCode;
	if(key != 0x09) {
		stopPulsatingKeys();
		highlightKey(key);
	}
}
function onKeyboardReleased(evt) {
	var key = evt.keyCode;
	if(key != 0x09) {
		unhighlightKey(key);
		// pulsate keys a second later
		pulsatePossibleKeys(1000);
	}
}
function onKeyboardStatesChanged(evt) {
	stopPulsatingKeys();
	showKeyboardStates();
	showDeadKeys();
	pulsatePossibleKeys(200);
}
function onFocusChanged(evt) {
	pulsatePossibleKeys(1000);
}
function onCursorMoved(evt) {
	pulsatePossibleKeys(1000);
}
function onMouseDown(evt) {
	var key = getKeyCode(evt.target);
	if(key) {
		var states = getKeyboardStates();
		switch(key) {
			case 0x10: // shift
				states.shiftKey = !states.shiftKey;
				break;
			case 0x11: // ctrl
				states.ctrlKey = !states.ctrlKey;
				break;
			case 0x12: // alt
				states.altKey = !states.altKey;
				break;
			case 0x14: // caps
				states.capsLock = !states.capsLock;
				break;
			default:
				pressKey(key);
				return;
		}
		NFLCIME.dispatchEvent( { type:'KeyboardSetStates', states:states } );
	}
}
function onMouseUp(evt) {
	var key = getKeyCode(evt.target);
	releaseKey(key);
}
function onDoubleClick(evt) {
	onMouseDown(evt);
	onMouseUp(evt);
}
function onCloseKeyboard(evt) {
	NFLCIME.dispatchEvent( { type:'OptionSet', name:'use-keyboard', value:false } );
}
function onModuleDeactivate(evt) {
	if(evt.module == module) {
		// make sure all the keys are clear
		stopPulsatingKeys();
		unhighlightKeys();
	}
}
function getKeyMask(key) {
	var id;
	if(typeof(key) == 'number') {
		var hex = key.toString(16);
		if(hex.length == 1) {
			hex = '0' + hex;
		}
		id = 'key-0x' + hex;
	} else {
		id = 'key-' + key;
	}
	return document.getElementById(id);
}
function getKeyCode(mask) {
	var match;
	if(match = /^key-0x([0-9a-f]+)/i.exec(mask.id)) {
		var key = match[1];
		return parseInt(key, 16);
	} else if(match = /^key-(\w+)/i.exec(mask.id)) {
		var key = match[1];
		switch(key) {
			case 'lshift':
			case 'rshift': return 0x10;
			case 'lctrl':
			case 'rctrl': return 0x11;
			case 'lalt':
			case 'ralt': return 0x12;
			case 'caps': return 0x14;
		}
	}
}
var highlightedKeys = [];
function highlightKey(key) {
	var mask = this.getKeyMask(key);
	if(mask) {
		if(mask.className.indexOf('pressed') == -1) {
			mask.className += ' pressed';
			highlightedKeys.push(key);
		}
	}
}
function unhighlightKey(key) {
	var mask = this.getKeyMask(key);
	if(mask) {
		mask.className = mask.className.replace(/\s+pressed/, '');
		for(var i = highlightedKeys.length - 1; i >= 0; i--) {
			if(highlightedKeys[i] == key) {
				highlightedKeys.splice(i, 1);
			}
		}
	}
}
function unhighlightKeys() {
	for(var i = highlightedKeys.length - 1; i >= 0; i--) {
		unhighlightKey(highlightedKeys[i]);
	}
}
var deadKeys;
function showDeadKeys() {
	if(deadKeys) {
		for(var i = 0; i < deadKeys.length; i++) {
			var mask = getKeyMask(deadKeys[i]);
			mask.className = mask.className.replace(/\s+deadkey/, '');
		}
	}
	var keycodes = [];
	NFLCIME.dispatchEvent( { type:'KeyboardGetDeadKeys', keyCodes:keycodes } );
	if(keycodes.length) {
		var list = [];
		for(var i = 0; i < keycodes.length; i++) {
			var hex = keycodes[i].toString(16);
			while(hex.length < 2) hex = '0' + hex;
			list[i] = '0x' + hex;
		}
		for(var i = 0; i < list.length; i++) {
			var mask = getKeyMask(list[i]);
			mask.className += ' deadkey';
		}
		deadKeys = list;
	}
}
var pulsateRule;
var pulsatingKeys = [];
var pulsateIntervalID;
var pulsateOpacity;
var pulsateDir;
var pulsateDelayTicks;
function pulsatePossibleKeys(delay) {
	var possible_keycodes = [];
	var possible_characters = [];
	NFLCIME.dispatchEvent( { type:'KeyboardGetPossibleKeys', keyCodes:possible_keycodes, characters:possible_characters } );
	stopPulsatingKeys();
	if(possible_keycodes.length) {
		var list = [];
		for(var i = 0; i < possible_keycodes.length; i++) {
			var hex = possible_keycodes[i].toString(16);
			while(hex.length < 2) hex = '0' + hex;
			list[i] = '0x' + hex;
		}
		if(!pulsateRule) {
			for(var i = 0; i < document.styleSheets.length; i++) {
				var sheet = document.styleSheets[i];
				var rules = (sheet.rules) ? sheet.rules : sheet.cssRules;
				if(rules) {
					for(var j = 0; j < rules.length; j++) {
						var rule = rules[j];
						if(rule.selectorText == '.key-mask.pulsate' || rule.selectorText == '.pulsate') {
							pulsateRule = rule;
						}
					}
				}
			}
		}
		if(pulsateRule) {
			pulsateOpacity = 0;
			for(var i = 0; i < list.length; i++) {
				var mask = getKeyMask(list[i]);
				mask.className += ' pulsate';
				mask.title = possible_characters[i];
			}
			pulsateRule.style.filter = 'alpha(opacity = 0)';
			pulsateRule.style.opacity = '0';
			pulsateDir = +5;
			pulsatingKeys.push.apply(pulsatingKeys, list);
			pulsateDelayTicks = Math.round(delay / 100);
			pulsateIntervalId = setInterval(pulsateKeys, 100);
		}
	}
}
function pulsateKeys() {
	var maximum_opacity = 20;
	if(pulsateDelayTicks == 0) {
		pulsateOpacity += pulsateDir;
		pulsateOpacity = Math.max(0, pulsateOpacity);
		pulsateOpacity = Math.min(maximum_opacity, pulsateOpacity);
		pulsateRule.style.filter = 'alpha(opacity = ' + pulsateOpacity + ')';
		pulsateRule.style.opacity = pulsateOpacity / 100;
		if(pulsateOpacity == maximum_opacity) {
			pulsateDir = -5;
		} else if(pulsateOpacity == 0) {
			pulsateDir = +5;
			pulsateDelayTicks = 10;
		}
	} else {
		pulsateDelayTicks--;
	}
}
function stopPulsatingKeys() {
	if(pulsatingKeys.length > 0) {
		for(var i = 0; i < pulsatingKeys.length; i++) {
			var mask = getKeyMask(pulsatingKeys[i]);
			mask.className = mask.className.replace(/\s+pulsate/, '');
			mask.title = '';
		}
		clearInterval(pulsateIntervalId);
		pulsateIntervalId = 0;
		pulsatingKeys = [];
	}
}
function showKeyboardStates() {
	// NOTE: this function CANNOT alter the content of the DOM tree; otherwise the undo stack will be lost whenever it's called
	var states = getKeyboardStates();
	var plane = (states.plane) ? states.plane.toLowerCase() : 'normal';
	var possible_planes = [ 'normal', 'alt', 'altcapslock', 'altcapslockctrl', 'altcapslockctrlshift', 'altcapslockshift',
				'altctrl', 'altctrlshift', 'altshift', 'capslock', 'capslockctrl', 'capslockctrlshift',
				'capslockshift', 'ctrl', 'ctrlshift', 'shift'];
	for(var i = 0; i < possible_planes.length; i++) {
		var div = document.getElementById('plane-' + possible_planes[i]);
		if(div) {
			div.style.display = (possible_planes[i] == plane) ? 'inline' : 'none';
		}
	}
	// highlight the pressed keys
	if(states.altKey) {
		highlightKey('ralt');
		highlightKey('lalt');
	} else {
		unhighlightKey('ralt');
		unhighlightKey('lalt');
	}
	if(states.ctrlKey) {
		highlightKey('rctrl');
		highlightKey('lctrl');
	} else {
		unhighlightKey('rctrl');
		unhighlightKey('lctrl');
	}
	if(states.shiftKey) {
		highlightKey('rshift');
		highlightKey('lshift');
	} else {
		unhighlightKey('rshift');
		unhighlightKey('lshift');
	}
	if(states.capsLock) {
		highlightKey('caps');
	} else {
		unhighlightKey('caps');
	}
}
function getKeyboardStates() {
	var evt = { type:'KeyboardGetStates', states:{}, plane:'' };
	NFLCIME.dispatchEvent(evt);
	return evt.states;
}
function getFocusedEdit() {
	var evt = { type:'CursorGetFocusedEdit', target:null };
	NFLCIME.dispatchEvent(evt);
	if(evt.target) {
		return evt.target;
	}
	var evt = { type:'CursorRestoreFocusedEdit', target:null };
	NFLCIME.dispatchEvent(evt);
	if(evt.target) {
		return evt.target;
	}
}
// Send a key event
function sendEvent(eventName, keyCode, altKey, ctrlKey, shiftKey) {
	var edit = getFocusedEdit();
	if(edit) {
		switch(module.browser) {
			case 'ie':
				var doc = edit.ownerDocument;
				var evt = doc.createEventObject();
				evt.keyCode = keyCode;
				evt.altKey = altKey;
				evt.ctrlKey = ctrlKey;
				evt.shiftKey = shiftKey;
				evt.fake = true;
				edit.fireEvent('on' + eventName, evt);
				break;
			case 'firefox':
				var doc = edit.ownerDocument;
				var win = doc.defaultView;
				var evt = doc.createEvent('KeyEvents');
				evt.initKeyEvent(eventName, true, true, win, ctrlKey, altKey, shiftKey, false, keyCode, 0);
				edit.dispatchEvent(evt);
				break;
			case 'safari':
				var doc = edit.ownerDocument;
				var evt = doc.createEvent('HTMLEvents');
				evt.initEvent(eventName, true, true);
				evt.keyCode = keyCode;
				evt.altKey = altKey;
				evt.ctrlKey = ctrlKey;
				evt.shiftKey = shiftKey;
				evt.fake = true;
				edit.dispatchEvent(evt);
				break;
		}
	}
}
var keyCodePressed;
var keyboardStateAtKeyPress;
var repeatDelayTimeoutId;
var repeatDelay = 500;
var repeatIntervalId;
var repeatPerSecond = 10;
// Send keydown and set key-repetition timeout
function pressKey(key) {
	if(keyCodePressed) {
		releaseKey();
	}
	var states = getKeyboardStates();
	keyCodePressed = key;
	repeatKey();
	repeatDelayTimeoutId = setTimeout(startRepeating, repeatDelay);
}
// Send keyup and clear key-repetition timeout and interval
function releaseKey() {
	if(keyCodePressed) {
		var states = getKeyboardStates();
		sendEvent('keyup', keyCodePressed, states.altKey, states.ctrlKey, states.shiftKey);
		keyCodePressed = 0;
		if(repeatDelayTimeoutId) {
			clearTimeout(repeatDelayTimeoutId);
			repeatDelayTimeoutId = null;
		}
		if(this.repeatIntervalId) {
			clearInterval(repeatIntervalId);
			repeatIntervalId = null;
		}
	}
}
// Send a keydown event again
function repeatKey() {
	var states = getKeyboardStates();
	sendEvent('keydown', keyCodePressed, states.altKey, states.ctrlKey, states.shiftKey);
	sendEvent('keypress', keyCodePressed, states.altKey, states.ctrlKey, states.shiftKey);
}
	// Set interval for repeating key that was pressed
function startRepeating() {
	repeatDelayTimeoutId = null;
	repeatIntervalId = setInterval(repeatKey, 1000 / repeatPerSecond);
	// do it now
	this.repeatKey();
}
function initialize(env) {
	attachDOMHandler(element('frame-drag-bar'), 'mousedown', function(evt) { if(evt.target.className != 'corner-button') module.startMoving(evt) });
	attachDOMHandler(element('mask-container'), 'mousedown', onMouseDown);
	attachDOMHandler(element('mask-container'), 'mouseup', onMouseUp);
	attachDOMHandler(element('mask-container'), 'mouseout', onMouseUp);
	attachDOMHandler(element('close-button'), 'mousedown', onCloseKeyboard);
	attachDOMHandler(element('collapse-button'), 'mousedown', function(evt) { module.toggleCollapse() });
	attachDOMHandler(element('frame-drag-bar'), 'dblclick', function(evt) { if(evt.target.className != 'corner-button') module.toggleCollapse() });
	if(module.browser == 'ie') {
		attachDOMHandler(element('mask-container'), 'dblclick', onDoubleClick);
	}
	showKeyboardStates();
	showDeadKeys();
	NFLCIME.addEventListener('KeyboardPressed', this);
	NFLCIME.addEventListener('KeyboardReleased', this);
	NFLCIME.addEventListener('KeyboardStatesChanged', this);
	NFLCIME.addEventListener('FocusChanged', this);
	NFLCIME.addEventListener('CursorMoved', this);
	NFLCIME.addEventListener('ModuleDeactivate', this);
}
function shutdown() {
	NFLCIME.removeEventListener('KeyboardPressed', this);
	NFLCIME.removeEventListener('KeyboardReleased', this);
	NFLCIME.removeEventListener('KeyboardStatesChanged', this);
	NFLCIME.removeEventListener('FocusChanged', this);
	NFLCIME.removeEventListener('CursorMoved', this);
	NFLCIME.removeEventListener('ModuleDeactivate', this);
}
function setOpacity(value) {
	// hide the key masks if the opacity of the page is less than 100 since IE doesn't handle overlapping filters properly
	element('mask-container').style.display = (value == 100) ? '' : 'none';
	return value;
}