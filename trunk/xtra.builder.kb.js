function element(id) {
	return document.getElementById(id);
}
function displayRange(range) {
	var container = element('unicode-box');
	var tags = [];
	var match;
	if(match = /(\w+)-(\w+)/.exec(range)) {
		var start = parseInt(match[1], 16);
		var end = parseInt(match[2], 16);
		for(var c = start; c <= end; c++) {
			var unicode = c.toString(16); while(unicode.length < 4) unicode = '0' + unicode; unicode = 'U+' + unicode;
			var entity = '&#' + c + ';';
			tags.push('<div class="unicode" title="' + unicode + '" unselectable="on">' + entity + '</div>');
		}
	}
	container.innerHTML = tags.join('');
}
function onload() {
	var select = element('unicode-range-select');
	displayRange(select.value);
	var checkboxes = element('plane-selection').getElementsByTagName('INPUT');
	for(var i = 0; i < checkboxes.length; i++) {
		var checkbox = checkboxes[i];
		showPlane(checkbox.id.substr(11), checkbox.checked);
	}
}
var keyboardPlanes = ['normal', 'shift', 'altctrl', 'altctrlshift', 'capslock', 'capslockshift'];
var propertyNames = ['mapNormal', 'mapShift', 'mapAltCtrl', 'mapAltCtrlShift', 'mapCapslock', 'mapCapslockShift'];
var kb = {
	normal:{},
	shift:{},
	altctrl:{},
	altctrlshift:{},
	capslock:{},
	capslockshift:{},
	combinations:{}
};
function getKeyEntry(div) {
	var match = /^(\w+)-key-(\w+)/.exec(div.id);
	var plane = match[1];
	var key = match[2];
	var entry = kb[plane][key];
	return entry;
}
function setKeyEntry(div, entry) {
	var match = /^(\w+)-key-(\w+)/.exec(div.id);
	var plane = match[1];
	var key = match[2];
	kb[plane][key] = entry;
}
function syncKeyDiv(div) {
	var entry = getKeyEntry(div);
	var characters;
	if(typeof(entry) == 'object') {
		characters = entry.context;
		div.style.backgroundImage = "url('img/xtra.builder.ui.kb.gradient.orange.png')";
	} else {
		characters = entry;
		div.style.backgroundImage = '';
	}
	if(!characters) {
		characters = '';
	}
	var assigned = (characters) ? true : false;
	var selected = (div == selection);
	if(assigned) {
		if(!/^key-assigned/.test(div.className)) {
			div.className = div.className.replace(/^key/, 'key-assigned');
		}
	} else {
		if(/^key-assigned/.test(div.className)) {
			div.className = div.className.replace(/^key-assigned/, 'key');
		}
	}
	if(selected) {
		if(!/^key(-\w+)?-selected/.test(div.className)) {
			div.className = div.className.replace(/^key(-\w+)?/, 'key$1-selected');
		}
	} else {
		if(/^key(-\w+)?-selected/.test(div.className)) {
			div.className = div.className.replace(/^key(-\w+)?-selected/, 'key$1');
		}
	}
	div.textContent = characters;
	var title = '';
	for(var i = 0; i < characters.length; i++) {
		var hex = characters.charCodeAt(i).toString(16);
		while(hex.length < 4) hex = '0' + hex;
		if(title) title += ' ';
		title += 'U-' + hex.toUpperCase();
	}
	div.title = title;
}
var selection;
function showPlane(plane, show) {
	element('kb-plane-' + plane).style.display = (show) ? '' : 'none';
	element('show-plane-' + plane).checked = show;
}
function hasCombination(entry) {
	if(typeof(entry) == 'object') {
		return true;
	}
	var from;
	for(from in kb.combinations) {
		if(from.indexOf(entry) == 0) {
			return true;
		}
	}
	return false;
}
function selectKey(div) {
	var prev = selection;
	if(selection != div) {
		selection = div;
	} else {
		selection = null;
	}
	if(prev) {
		syncKeyDiv(prev);
	}
	if(selection) {
		syncKeyDiv(selection);
		document.activeElement.blur();
		var entry = getKeyEntry(selection);
		showMultikeyCombinations(hasCombination(entry));
	}
}
function addCharacter(c) {
	if(c.length == 1) {
		if(selection) {
			var entry = getKeyEntry(selection);
			if(typeof(entry) == 'object') {
				entry.context += c;
			} else {
				setKeyEntry(selection, (entry) ? entry + c : c);
			}
			syncKeyDiv(selection);
			buildJavascript();
		}
	}
}
function removeCharacter(fromBeginning) {
	if(selection) {
		var entry = getKeyEntry(selection);
		var deleted = false;
		if(typeof(entry) == 'object') {
			if(entry.context) {
				if(fromBeginning) {
					entry.context += entry.context.substr(1);
				} else {
					entry.context = entry.context.substr(0, entry.context.length - 1);
				}
				deleted = true;
			}
		} else if(entry) {
			if(fromBeginning) {
				entry += entry.substr(1);
			} else {
				entry = entry.substr(0, entry.length - 1);
			}
			setKeyEntry(selection, entry);
			deleted = true;
		}
		if(deleted) {
			syncKeyDiv(selection);
			buildJavascript();
		}
	}
	return deleted;
}
function clearDeadKey() {
	if(selection) {
		var entry = getKeyEntry(selection);
		if(typeof(entry) == 'object') {
			setKeyEntry(selection, entry.context);
			syncKeyDiv(selection);
			showMultikeyCombinations(false);
			buildJavascript();
		}
		selection.style.backgroundImage = "";
	} else {
		alert('Selection a key first');
	}
}
function addDeadKey() {
	if(selection) {
		var entry = getKeyEntry(selection);
		if(typeof(entry) != 'object') {
			setKeyEntry(selection, { insert:'', context:(entry) ? entry : '' })
			syncKeyDiv(selection);
			showMultikeyCombinations(true);
			buildJavascript();
		}
	} else {
		alert('Selection a key first');
	}
}
function reverseDeadKeys() {
	var new_combinations = {};
	var character_fixed = {};
	var from;
	for(from in kb.combinations) {
		var to = kb.combinations[from];
		if(from.length == 2) {
			from = from.charAt(1) + from.charAt(0);
			new_combinations[from] = to;
			var c = from.charAt(0);
			if(!character_fixed[c]) {
				// look through all the planes for the key
				for(var i = 0; i < keyboardPlanes.length; i++) {
					var plane = keyboardPlanes[i];
					var map = kb[plane];
					var key;
					for(key in map) {
						if(map[key] == c) {
							// turn it into a dead key
							map[key] = { context:c, insert:'' };
							var div = element(plane + '-key-' + key);
							syncKeyDiv(div);
						}
					}
				}
				character_fixed[c] = true;
			}
		}
	}
	kb.combinations = new_combinations;
	selectKey(null);
	buildJavascript();
}
function removeUnreachableCombinations() {
	var character_checked = {};
	var character_found = {};
	for(from in kb.combinations) {
		var c = from.charAt(0);
		if(!character_checked[c]) {
			// look through all the planes for the key
			for(var i = 0; i < keyboardPlanes.length; i++) {
				var plane = keyboardPlanes[i];
				var map = kb[plane];
				var key;
				for(key in map) {
					var entry = map[key];
					if((typeof(entry) == 'object' && entry.context == c) || entry == c) {
						character_found[c] = true;
						i = keyboardPlanes.length;
						break;
					}
				}
			}
			character_checked[c] = true;
		}
		if(!character_found[c]) {
			kb.combinations[from] = undefined;
		}
	}
	buildJavascript();
}
function showMultikeyCombinations(show) {
	var container = element('multikey-combinations');
	if(show) {
		container.style.display = '';
		if(selection) {
			var entry = getKeyEntry(selection);
			var prefix = (typeof(entry) == 'object') ? entry.context : entry;
			element('multikey-from').value = prefix;
			element('multikey-to').value = '';
			var list = element('multikey-list');
			while(list.firstChild) list.removeChild(list.firstChild);
			var from;
			var items = [];
			for(from in kb.combinations) {
				if(from.indexOf(prefix) == 0) {
					var to = kb.combinations[from];
					if(to) {
						var option = document.createElement('option');
						option.value = from;
						var label = '';
						for(var i = 0; i < from.length; i++) {
							if(i > 0) {
								label += ' + ';
							}
							label += from.charAt(i);
							var hex = from.charCodeAt(i).toString(16).toUpperCase();
							while(hex.length < 4) hex = '0' + hex;
							label += ' (' + hex + ')';
						}
						label += ' \u2192 ';
						for(var i = 0; i < to.length; i++) {
							if(i > 0) {
								label += ' + ';
							}
							label += to.charAt(i);
							var hex = to.charCodeAt(i).toString(16).toUpperCase();
							while(hex.length < 4) hex = '0' + hex;
							label += ' (' + hex + ')';
						}
						option.text = label;
						items.push(option);
					}
				}
			}
			items.sort(function(a, b) { return (a.value.toUpperCase() < b.value.toUpperCase()) ? -1 : 1; });
			for(var i = 0; i < items.length; i++) {
				list.appendChild(items[i]);
			}
			list.scrollTop = list.scrollHeight;
		}
	} else {
		container.style.display = 'none';
	}
}
function selectMultikeyCombination() {
	var from = element('multikey-list').value;
	var to = kb.combinations[from];
	element('multikey-from').value = from;
	element('multikey-to').value = to;
}
function addMultikeyCombination() {
	var from = element('multikey-from').value;
	var to = element('multikey-to').value;
	kb.combinations[from] = to;
	showMultikeyCombinations(true);
	buildJavascript();
	element('multikey-from').focus();
}
function removeMultikeyCombination() {
	var from = element('multikey-from').value;
	kb.combinations[from] = undefined;
	showMultikeyCombinations(true);
	buildJavascript();
}
function enterUnicode(c) {
	var e = document.activeElement;
	if(e == document.body) {
		if(selection) {
			addCharacter(c);
		}
	} else if(e.tagName == 'TEXTAREA' || (e.tagName == 'INPUT' && e.type == 'text')) {
		var start = e.selectionStart;
		var end = e.selectionEnd;
		e.value = e.value.substr(0, start) + c + e.value.substr(end);
		e.setSelectionRange(start + 1, start + 1);
	}
}
var keyCodeRows = [];
keyCodeRows[0] = [ '0xc0', '0x31', '0x32', '0x33', '0x34', '0x35', '0x36', '0x37', '0x38', '0x39', '0x30', '0xbd', '0xbb' ];
keyCodeRows[1] = [ '0x51', '0x57', '0x45', '0x52', '0x54', '0x59', '0x55', '0x49', '0x4f', '0x50', '0xdb', '0xdd', '0xdc' ];
keyCodeRows[2] = [ '0x41', '0x53', '0x44', '0x46', '0x47', '0x48', '0x4a', '0x4b', '0x4c', '0xba', '0xde', '0x0d' ];
keyCodeRows[3] = [ '0x5a', '0x58', '0x43', '0x56', '0x42', '0x4e', '0x4d', '0xbc', '0xbe', '0xbf' ];
keyCodeRows[4] = [ '0x20' ];
var listening = false;
var loading_module_id;
function onModuleRegister(evt) {
	var module = evt.module;
	if(module.id == loading_module_id) {
		for(var i = 0; i < keyboardPlanes.length; i++) {
			var plane = keyboardPlanes[i];
			var prop = propertyNames[i];
			kb[plane] = {};
			if(module[prop]) {
				showPlane(plane, true);
				for(var j = 0; j < keyCodeRows.length; j++) {
					var row = keyCodeRows[j];
					for(var k = 0; k < row.length; k++) {
						var key = row[k];
						if(key != '0x0d' && key != '0x20') {
							var div = element(plane + '-key-' + key);
							var keyCode = parseInt(key.substr(2), 16);
							kb[plane][key] = module[prop][keyCode];
							syncKeyDiv(div);
						}
					}
				}
			} else {
				showPlane(plane, false);
			}
		}
		kb.combinations = (module.multikeyCombinations) ? module.multikeyCombinations : {};
		buildJavascript();
	}
}
function loadKeyboard() {
	if(!listening) {
		NFLCIME.addEventListener('ModuleRegister', this);
		listening = true;
	}
	loading_module_id = element('keyboard-id').value.replace(/\s+$/, '').replace(/^\s+/, '');
	element('javascript').value = '';
	NFLCIME.dispatchEvent( { type:'ModuleLoad', moduleId:loading_module_id } );
}
var moveToNextKeyTimeoutId = 0;
function moveToNextKey() {
	// move to the next unassigned key
	if(selection) {
		for(var e = selection.nextSibling; e; e = e.nextSibling) {
			if(/^key /.test(e.className) && !/^key-assigned/.test(e.className)) {
				selectKey(e);
				break;
			}
		}
	}
	moveToNextKeyTimeoutId = 0;
}
document.onkeypress = function(evt) {
	if(document.activeElement == document.body) {
		if(evt.charCode > 0x20 && selection) {
			addCharacter(String.fromCharCode(evt.charCode));
			// a small delay in case multiple key-codes are sent
			if(!moveToNextKeyTimeoutId) {
				moveToNextKeyTimeoutId = setTimeout(moveToNextKey, 10);
			}
		}
	}
}
document.onkeydown = function(evt) {
	if(document.activeElement == document.body) {
		if(evt.keyCode == 0x08) {
			if(!removeCharacter(false)) {
				// move to the previous key
				for(var e = selection.previousSibling; e; e = e.previousSibling) {
					if(/^key-assigned/.test(e.className)) {
						selectKey(e);
						removeCharacter(false);
						break;
					}
				}
			}
			evt.preventDefault();
		} else if (evt.keyCode == 0x2e) {
			removeCharacter(true);
			evt.preventDefault();
		} else if (evt.keyCode == 0x27) {
			if(selection) {
				for(var e = selection.nextSibling; e; e = e.nextSibling) {
					if(/^key /.test(e.className)) {
						selectKey(e);
						break;
					}
				}
			}
		} else if (evt.keyCode == 0x25) {
			if(selection) {
				for(var e = selection.previousSibling; e; e = e.previousSibling) {
					if(/^key /.test(e.className)) {
						selectKey(e);
						break;
					}
				}
			}
		}
	}
}
var commentRows = [];
commentRows[0] = [ '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=' ];
commentRows[1] = [ 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\' ];
commentRows[2] = [ 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', '[return]' ];
commentRows[3] = [ 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/' ];
commentRows[4] = [ '[space]' ];
function escapeJSString(s) {
	var r = "'";
	if(s) {
		for(var m = 0; m < s.length; m++) {
			var code = s.charCodeAt(m);
			if(code > 0x20 && code < 0x7F) {
				if(code == 0x27 || code == 0x5c) {
					r += '\\';
				}
				r += String.fromCharCode(code);
			} else {
				var hex = code.toString(16);
				while(hex.length < 4) hex = '0' + hex;
				r += '\\u' + hex;
			}
		}
	}
	r += "'";
	return r;
}
function buildJavascript() {
	element('javascript').value = '';
	var id = element('keyboard-id').value;
	var lines = [];
	lines.push("NFLCIME.dispatchEvent( { type:'ModuleAdd', module:");
	lines.push("{");
	lines.push("	id:'" + id + "',");
	lines.push("	type:'keyboard layout',");
	lines.push("	inheritance:['kb'],");
	lines.push("");
	var add_ctrlshift_bridge = false;
	for(var i = 0; i < keyboardPlanes.length; i++) {
		var plane = keyboardPlanes[i];
		var map = kb[plane];
		var count = 0;
		var key;
		for(key in map) {
			if(map[key]) count++;
		}
		if(count > 0) {
			var prop_name = propertyNames[i];
			lines.push("\t" + prop_name + ":{");
			for(var j = 0; j < keyCodeRows.length; j++) {
				var keyCodeRow = keyCodeRows[j];
				var commentRow = commentRows[j];
				for(var k = 0; k < keyCodeRow.length; k++) {
					var keyCode = keyCodeRow[k];
					var comment = commentRow[k];
					var entry = map[keyCode];
					switch(keyCode) {
						case '0x20': entry = '\u0020'; break;
						case '0x0d': entry = '\u000d'; break;
					}
					var str;
					if(typeof(entry) == 'object') {
						str = '{ context:' + escapeJSString(entry.context) + ', insert:' + escapeJSString(entry.insert) + ' }';
					} else {
						str = escapeJSString(entry);
					}
					lines.push("\t\t" + keyCode + ":" + str + ", // " + comment);
				}
				lines.push("");
			}
			lines.pop();
			lines[lines.length - 1] = lines[lines.length - 1].replace(', //', ' //');
			lines.push("\t},");
			lines.push("");
			if(plane == 'altctrlshift') {
				add_ctrlshift_bridge = true;
			}
		}
	}
	var multikey_combinations = [];
	var from;
	for(from in kb.combinations) {
		var to = kb.combinations[from];
		if(to) {
			multikey_combinations.push(escapeJSString(from) + ':' + escapeJSString(to));
		}
	}
	multikey_combinations.sort(function(a, b) { return (a.toUpperCase() < b.toUpperCase()) ? -1 : 1; });
	if(multikey_combinations.length > 0) {
			lines.push("\tmultikeyCombinations:{");
			for(var i = 0; i < multikey_combinations.length; i++) {
				lines.push("\t\t" + multikey_combinations[i] + ",");
			}
			lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, '');
			lines.push("\t},");
			lines.push("");
	}
	if(add_ctrlshift_bridge) {
			lines.push("\tinitialize:function() {");
			lines.push("\t\t// make alt-ctrl-shift available through ctrl-shift as well (hard to reach otherwise on keyboard without Alt-Gr key)");
			lines.push("\t\tthis.mapCtrlShift = this.mapAltCtrlShift;");
			lines.push("\t},");
			lines.push("");
	}
	lines.pop();
	lines[lines.length - 1] = lines[lines.length - 1].replace('},', '}');
	lines.push("}");
	lines.push("} );");
	element('javascript').value = lines.join('\n');
}
