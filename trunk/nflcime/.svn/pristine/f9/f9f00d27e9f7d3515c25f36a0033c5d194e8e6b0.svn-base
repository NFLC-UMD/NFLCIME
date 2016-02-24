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
	var module_css = 'xtra.ui.trace.css';
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
			element.attachEvent('on' + eventName, handler);
			break;
		case 'firefox':
		case 'safari':
			element.addEventListener(eventName, handler, false);
			break;
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
	module.hide();
	attachDOMHandler(element('frame-drag-bar'), 'mousedown', function(evt) { module.startMoving(evt) });
	attachDOMHandler(element('frame-top-left'), 'mousedown', function(evt) { module.startResizing(['top', 'left'], evt) });
	attachDOMHandler(element('frame-top'), 'mousedown', function(evt) { module.startResizing(['top'], evt) });
	attachDOMHandler(element('frame-top-right'), 'mousedown', function(evt) { module.startResizing(['top', 'right'], evt) });
	attachDOMHandler(element('frame-left'), 'mousedown', function(evt) { module.startResizing(['left'], evt) });
	attachDOMHandler(element('frame-right'), 'mousedown', function(evt) { module.startResizing(['right'], evt) });
	attachDOMHandler(element('frame-bottom-left'), 'mousedown', function(evt) { module.startResizing(['bottom', 'left'], evt) });
	attachDOMHandler(element('frame-bottom'), 'mousedown', function(evt) { module.startResizing(['bottom'], evt) });
	attachDOMHandler(element('frame-bottom-right'), 'mousedown', function(evt) { module.startResizing(['bottom', 'right'], evt) });
	attachDOMHandler(element('close-button'), 'mousedown', function(evt) { if(module) module.startAnimation('fade-out') });
	var box = element('tracebox');
	box.value = '';
}
parent.trace = function(text) {
	var box = element('tracebox');
	box.value += text + '\n';
	box.scrollTop = box.scrollHeight;
	show();
}