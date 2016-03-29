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
	var module_css = 'ui.lang.css';
	if(NFLCIME) {
		var evt = { type:'UIModuleGetStyleSheet', moduleId:'ui.lang', styleSheetType:'frame' };
		evt.url = interface_css;
		NFLCIME.dispatchEvent(evt);
		interface_css = evt.url;
		var evt = { type:'UIModuleGetStyleSheet', moduleId:'ui.lang', styleSheetType:'contents' };
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
function setOption(name, value) {
	if(NFLCIME) {
		NFLCIME.dispatchEvent( { type:'OptionSet', name:name, value:value } );
	}
}
function getOption(name, value) {
	if(NFLCIME) {
		var evt = { type:'OptionGet', name:name, value:null }
		NFLCIME.dispatchEvent(evt);
		return evt.value;
	}
}
var defaultModulePosition = { x:200, y:200 };
function onClick(evt) {
	var target = evt.target;
	switch(target.className) {
		case 'arrow':
		case 'toggle':
			// expand/collapse the section containing the button
			for(var p = target.parentNode; p; p = p.parentNode) {
				if(p.className == 'section-collapsed') {
					p.className = 'section-expanded';
					break;
				} else if(p.className == 'section-expanded') {
					p.className = 'section-collapsed';
					break;
				}
			}
			break;
		case 'image':
		case 'label':
			// click the element for which this is the label (doing this instead of using <label for="..."> so focus won't be shifted)
			var id = target.getAttribute('for');
			if(id) {
				var p = element(id);
				p.click();
			}
			break;
		case 'selector':
			// set the selected module
			setOption(target.name, target.id);
			break;
		case 'option':
			// set the option
			setOption(target.id, target.checked);
			break;
		case 'link':
			debugger;
			var url = target.id + '.html';
			NFLCIME.dispatchEvent( { type:'UIModuleLoad', moduleId:target.id, url:url, options: { hAlign:'left', vAlign:'top', x:defaultModulePosition.x, y:defaultModulePosition.y } } );
			defaultModulePosition.x += 30;
			defaultModulePosition.y += 30;
			break;
	}
}
function onOptionSet(evt) {
	var target = element(evt.name);
	if(target && target.className == 'option') {
		target.checked = evt.value;
	}
	var target = element(evt.value);
	if(target && target.className == 'selector') {
		target.checked = true;
	}
}
function initialize() {
	// get the minimum width and height from the body tag
	var minWidth = document.body.getAttribute('minWidth');
	var minHeight = document.body.getAttribute('minHeight');
	var options = {};
	if(minWidth) options.minWidth = parseInt(minWidth);
	if(minHeight) options.minHeight = parseInt(minHeight);
	module.applyLayout(options);
	attachDOMHandler(element('frame-drag-bar'), 'mousedown', function(evt) { if(evt.target.className != 'corner-button') module.startMoving(evt) });
	attachDOMHandler(element('frame-top-left'), 'mousedown', function(evt) { module.startResizing(['top'], evt) });
	attachDOMHandler(element('frame-top'), 'mousedown', function(evt) { module.startResizing(['top'], evt) });
	attachDOMHandler(element('frame-top-right'), 'mousedown', function(evt) { module.startResizing(['top'], evt) });
	attachDOMHandler(element('frame-bottom-left'), 'mousedown', function(evt) { module.startResizing(['bottom'], evt) });
	attachDOMHandler(element('frame-bottom'), 'mousedown', function(evt) { module.startResizing(['bottom'], evt) });
	attachDOMHandler(element('frame-bottom-right'), 'mousedown', function(evt) { module.startResizing(['bottom'], evt) });
	attachDOMHandler(element('collapse-button'), 'mousedown', function(evt) { module.toggleCollapse(); });
	attachDOMHandler(element('frame-drag-bar'), 'dblclick', function(evt) { if(evt.target.className != 'corner-button') module.toggleCollapse() });
	attachDOMHandler(document.body, 'click', onClick);
	// set checkboxes and radio buttons
	var inputs = document.getElementsByTagName('INPUT');
	for(var i = 0; i < inputs.length; i++) {
		var target = inputs[i];
		switch(target.className) {
			case 'option':
				var value = getOption(target.id);
				if(value != undefined) {
					target.checked = value;
				} else {
					// no value is set; set the option according to its default state
					setOption(target.id, target.checked);
				}
				break;
			case 'selector':
				var value = getOption(target.name);
				if(value == target.id) {
					target.checked = true;
				} else if(value == undefined) {
					// no value is set; select the item if the radio button is checked by default
					if(target.checked) {
						setOption(target.name, target.id);
					}
				}
				break;
		}
	}
	NFLCIME.addEventListener('OptionSet', this);
}
function shutdown() {
	NFLCIME.removeEventListener('OptionSet', this);
}