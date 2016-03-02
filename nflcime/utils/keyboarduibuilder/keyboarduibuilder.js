function element(id) {
	return document.getElementById(id);
}
var keyboardImageHeight = 141, keyboardImageWidth = 418;
var keyboardPlanes = ['normal', 'shift', 'altctrl', 'altctrlshift', 'capslock', 'capslockshift'];
var propertyNames = ['mapNormal', 'mapShift', 'mapAltCtrl', 'mapAltCtrlShift', 'mapCapslock', 'mapCapslockShift'];
var keyboardStates = {
	'normal': { capsLock: false, shiftKey: false, altKey: false, ctrlKey: false },
	'shift': { capsLock: false, shiftKey: true, altKey: false, ctrlKey: false },
	'altctrl': { capsLock: false, shiftKey: false, altKey: true, ctrlKey: true },
	'altctrlshift': { capsLock: false, shiftKey: true, altKey: true, ctrlKey: true },
	'capslock': { capsLock: true, shiftKey: false, altKey: false, ctrlKey: false },
	'capslockshift': { capsLock: true, shiftKey: true, altKey: false, ctrlKey: false },
}
var keyCodeRows = [];
keyCodeRows[0] = [ '0xc0', '0x31', '0x32', '0x33', '0x34', '0x35', '0x36', '0x37', '0x38', '0x39', '0x30', '0xbd', '0xbb' ];
keyCodeRows[1] = [ '0x51', '0x57', '0x45', '0x52', '0x54', '0x59', '0x55', '0x49', '0x4f', '0x50', '0xdb', '0xdd', '0xdc' ];
keyCodeRows[2] = [ '0x41', '0x53', '0x44', '0x46', '0x47', '0x48', '0x4a', '0x4b', '0x4c', '0xba', '0xde', '0x0d' ];
keyCodeRows[3] = [ '0x5a', '0x58', '0x43', '0x56', '0x42', '0x4e', '0x4d', '0xbc', '0xbe', '0xbf' ];
keyCodeRows[4] = [ '0x20' ];
var keyDivs = [];
var planesAvailable = [];
var hiddenEdit;
function onCursorGetFocusedEdit(evt) {
	if(!hiddenEdit) {
		hiddenEdit = element('hidden-edit');
	}
	evt.target = hiddenEdit;
}
function onModuleRegister(evt) {
	var module = evt.module;
	if(module.id == loading_module_id) {
		var edit = element('hidden-edit');
		keyDivs = [];
		planesAvailable = [];
		for(var i = 0; i < keyboardPlanes.length; i++) {
			var plane = keyboardPlanes[i];
			var prop = propertyNames[i];
			var container = element('kb-plane-' + plane);
			if(module[prop]) {
				planesAvailable.push(plane);
				container.style.display = '';
				var states = keyboardStates[plane];
				for(var j = 0; j < keyCodeRows.length; j++) {
					var row = keyCodeRows[j];
					for(var k = 0; k < row.length; k++) {
						var key = row[k];
						if(key != '0x0d' && key != '0x20') {
							var div = element(plane + '-key-' + key);
							div.firstChild.style.left = '';
							div.firstChild.style.top = '';
							var keyCode = parseInt(key.substr(2), 16);
							edit.value = '';
							module.onKeyboardSetStates( { states:states } );
							module.onKeyDown( { target:edit, keyCode:keyCode,  } );
							module.onKeyPress( { target:edit, keyCode:keyCode, charCode:0 } );
							module.onKeyUp( { target:edit, keyCode:keyCode } );
							var character = edit.value;
							module.onKeyDown( { target:edit, keyCode:0x20 } );
							module.onKeyPress( { target:edit, keyCode:0x20, charCode:0 } );
							module.onKeyUp( { target:edit, keyCode:0x20 } );
							if(character.length == 0) {
								var deadkey = edit.value;
								if(deadkey) {
									character = deadkey;
								}
							}
							keyDivs.push(div);
							div.firstChild.textContent = character;
							// clear the kb context
							var character = edit.value;
							module.onKeyDown( { target:edit, keyCode:0x20 } );
							module.onKeyPress( { target:edit, keyCode:0x20, charCode:0 } );
							module.onKeyUp( { target:edit, keyCode:0x20 } );
						}
					}
				}
			}
		}
		var filename = 'ui.' + module.id + '.png';
		var img_width = keyboardImageWidth, img_height = keyboardImageHeight * planesAvailable.length;
		element('message').textContent = "\u2190 Take a screen-cap of this window and save the keyboard image as " + filename + " (" + img_width + '\u00d7' + img_height + ").";
		var match = /\w+\.\w+\.(\w+)\.(\w+)/.exec(module.id);
		var language = match[1];
		var layout = match[2];
		language = language.charAt(0).toUpperCase() + language.substr(1);
		layout = layout.charAt(0).toUpperCase() + layout.substr(1);
		element('keyboard-title').value = language + ' (' + layout + ')';
		buildHTML();
	}
}
var listening = false;
var loading_module_id;
function loadKeyboard() {
	if(!listening) {
		NFLCIME.addEventListener('ModuleRegister', this);
		NFLCIME.addEventListener('CursorGetFocusedEdit', this, true);
		listening = true;
	}
	for(var i = 0; i < keyboardPlanes.length; i++) {
		var plane = keyboardPlanes[i];
		var prop = propertyNames[i];
		var container = element('kb-plane-' + plane);
		container.style.display = 'none';
	}
	loading_module_id = element('keyboard-id').value.replace(/\s+$/, '').replace(/^\s+/, '');
	NFLCIME.dispatchEvent( { type:'ModuleLoad', moduleId:loading_module_id } );
}
var selection;
function selectKey(div) {
	var label = '';
	if(selection) {
		selection.className = selection.className.replace(/^key-selected/, 'key');
	}
	if(selection != div) {
		selection = div;
		selection.className = selection.className.replace(/^key/, 'key-selected');
		var text = div.textContent;
		for(var i = 0; i < text.length; i++) {
			var c = text.charCodeAt(i);
			if(c > 0x20 && c < 0x7f) {
				label += String.fromCharCode(c);
			} else {
				var hex = c.toString(16);
				while(hex.length < 4) hex = '0' + hex;
				label += '\\u' + hex;
			}
		}
	} else {
		selection = null;
	}
	element('key-label').value = label;
}
function applyStyle() {
	var style = element('key-style').value;
	var container = element('kb-container');
	container.setAttribute('style', style);
}
function move(dir) {
	var move_all = element('move-all').checked;
	if(selection || move_all) {
		var list = (move_all) ? keyDivs : [selection];
		for(var i = 0; i < list.length; i++) {
			var div = list[i];
			var prop, delta;
			switch(dir) {
				case 'left': prop = 'left'; delta = -1; break;
				case 'right': prop = 'left'; delta = +1; break;
				case 'up': prop = 'top'; delta = -1; break;
				case 'down': prop = 'top'; delta = +1; break;
			}
			var value = parseInt(div.firstChild.style[prop]);
			if(isNaN(value)) {
				var style = getComputedStyle(div.firstChild, '');
				value = parseInt(style[prop]);
				if(isNaN(value)) {
					value = 0;
				}
			}
			value += delta;
			div.firstChild.style[prop] = value + 'px';
		}
	} else {
		alert('Select a key first');
	}
}
function restorePosition() {
	var move_all = element('move-all').checked;
	if(selection || move_all) {
		var list = (move_all) ? keyDivs : [selection];
		for(var i = 0; i < list.length; i++) {
			var div = list[i];
			div.firstChild.style.left = '';
			div.firstChild.style.top = '';
		}
	}
}
function setLabel() {
	if(selection) {
		var label = element('key-label').value;
		selection.firstChild.textContent = eval('"' + label + '"');
	} else {
		alert('Select a key first');
	}
}
function buildHTML() {
	var title = element('keyboard-title').value;
	var id = element('keyboard-id').value;
	var lines = [];
	lines.push('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">');
	lines.push('<html>');
	lines.push('<head>');
	lines.push('<title>' + title + '</title>');
	lines.push('<link id="interface-css" rel="stylesheet" type="text/css" />');
	lines.push('<link id="module-css" rel="stylesheet" type="text/css" />');
	lines.push('<script language="javascript" src="ui.kb.js"></script>');
	lines.push('</head>');
	lines.push('<body unselectable="on">');
	lines.push('<table id="frame" cellspacing="0" cellpadding="0" unselectable="on">');
	lines.push('	<tr unselectable="on">');
	lines.push('		<td unselectable="on"><div id="frame-top-left" unselectable="on"></div></td>');
	lines.push('		<td unselectable="on"><div id="frame-top" unselectable="on"></div></td>');
	lines.push('		<td unselectable="on"><div id="frame-top-right" unselectable="on"></div></td>');
	lines.push('	</tr>');
	lines.push('');
	lines.push('	<tr>');
	lines.push('		<td rowspan="2" unselectable="on"><div id="frame-left" unselectable="on"></div></td>');
	lines.push('		<td unselectable="on">');
	lines.push('			<div id="frame-drag-bar" unselectable="on">');
	lines.push('				<!-- title bar -->');
	lines.push('				<div id="title-bar" unselectable="on">');
	lines.push('					<div id="corner-button-left" unselectable="on"><div id="collapse-button" class="corner-button" unselectable="on"></div></div>');
	lines.push('					<div id="corner-button-right" unselectable="on"><div id="close-button" class="corner-button" unselectable="on"></div></div>');
	lines.push('					<div id="title" unselectable="on">' + title + '</div>');
	lines.push('				</div>');
	lines.push('			</div>');
	lines.push('		</td>');
	lines.push('		<td rowspan="2" unselectable="on"><div id="frame-right" unselectable="on"></div></td>');
	lines.push('	</tr>');
	lines.push('');
	lines.push('	<tr unselectable="on">');
	lines.push('		<td unselectable="on">');
	lines.push('			<!-- content area -->');
	lines.push('			<div class="kb-container">');
	lines.push('				<!--- this empty div maintains the layout --->');
	lines.push('				<div class="kb-img" unselectable="on"></div>');
	lines.push('				<div class="kb-plane" id="plane-empty" unselectable="on">');
	lines.push('					<img class="kb-img" src="img/ui.kb.blank.png" unselectable="on"/>');
	lines.push('				</div>');
	var top = - keyboardImageHeight * (planesAvailable.length - 1);
	for(var i = planesAvailable.length - 1; i >= 0; i--) {
		var plane = planesAvailable[i];
			if(plane == 'altctrlshift') {
				// alt-ctrl-shift is also reachable via ctrl-shift
				var alt_plane = 'ctrlshift';
				lines.push('				<div class="kb-plane" id="plane-' + alt_plane + '" unselectable="on">');
				lines.push('					<div class="kb-img-container" unselectable="on">');
				lines.push('						<img class="kb-img-combined" style="top: ' + top + 'px" src="img/ui.' + id + '.png" unselectable="on"/>');
				lines.push('					</div>');
				lines.push('				</div>');
			}
		lines.push('				<div class="kb-plane" id="plane-' + plane + '" unselectable="on">');
		lines.push('					<div class="kb-img-container" unselectable="on">');
		lines.push('						<img class="kb-img-combined" style="top: ' + top + 'px" src="img/ui.' + id + '.png" unselectable="on"/>');
		lines.push('					</div>');
		lines.push('				</div>');
		top += keyboardImageHeight;
	}
	lines.push('				<div class="kb-plane" id="mask-container" unselectable="on">');
	lines.push('					<div class="key-mask" id="key-0xc0" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x31" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x32" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x33" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x34" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x35" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x36" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x37" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x38" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x39" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x30" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0xbd" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0xbb" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x08" unselectable="on"></div>');
	lines.push('');
	lines.push('					<div class="key-mask" id="key-0x09" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x51" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x57" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x45" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x52" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x54" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x59" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x55" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x49" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x4f" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x50" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0xdb" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0xdd" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0xdc" unselectable="on"></div>');
	lines.push('');
	lines.push('					<div class="key-mask" id="key-caps" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x41" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x53" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x44" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x46" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x47" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x48" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x4a" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x4b" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x4c" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0xba" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0xde" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x0d" unselectable="on"></div>');
	lines.push('');
	lines.push('					<div class="key-mask" id="key-lshift" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x5a" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x58" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x43" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x56" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x42" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x4e" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x4d" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0xbc" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0xbe" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0xbf" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-rshift" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-lctrl" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-lalt" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-0x20" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-ralt" unselectable="on"></div>');
	lines.push('					<div class="key-mask" id="key-rctrl" unselectable="on"></div>');
	lines.push('				</div>');
	lines.push('				<div class="kb-disable" id="disable-cover"></div>');
	lines.push('			</div>');
	lines.push('		</td>');
	lines.push('	</tr>');
	lines.push('');
	lines.push('	<tr>');
	lines.push('		<td unselectable="on"><div id="frame-bottom-left" unselectable="on"></div></td>');
	lines.push('		<td unselectable="on"><div id="frame-bottom" unselectable="on"></div></td>');
	lines.push('		<td unselectable="on"><div id="frame-bottom-right" unselectable="on"></div></td>');
	lines.push('	</tr>');
	lines.push('</table>');
	lines.push('</body>');
	lines.push('</html>');
	element('html').value = lines.join('\n');
}