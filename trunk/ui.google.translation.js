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
	var module_css = 'ui.google.translation.css';
	if(NFLCIME) {
		var evt = { type:'UIModuleGetStyleSheet', moduleId:'ui.google.translation', styleSheetType:'frame' };
		evt.url = interface_css;
		NFLCIME.dispatchEvent(evt);
		interface_css = evt.url;
		var evt = { type:'UIModuleGetStyleSheet', moduleId:'ui.google.translation', styleSheetType:'module' };
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
//--- Event handlers
function onGoogleAPILoad() {
	google.language.getBranding('google-branding');
	var container = element('container');
	container.className = 'container-ready';
}
function onSourceChange(evt) {
	var target = evt.target;
	setSourceLanguage(target.value);
	var evt = { type:'PersistenceSetValue', id:'ui.google.translation', name:'src', value:target.value };
	NFLCIME.dispatchEvent(evt);
}
function onDestinationChange(evt) {
	var target = evt.target;
	setDestinationLanguage(target.value);
	var evt = { type:'PersistenceSetValue', id:'ui.google.translation', name:'dest', value:target.value };
	NFLCIME.dispatchEvent(evt);
}
function onSwap(evt) {
	var source = element('source-language');
	var dest = element('destination-language');
	var source_lang = source.value;
	var dest_lang = dest.value;
	source.value = dest_lang;
	dest.value = source_lang;
	setSourceLanguage(source.value);
	setDestinationLanguage(dest.value);	
}
function onTranslate(evt) {
	var textbox = element('input-text');
	var translation = element('translation');
	var text = textbox.value;
	translation.value = '';
	google.language.translate(text, sourceLanguage, destinationLanguage, onTranslationComplete);
}
function onTranslationComplete(result) {
	var container = element("translation");
	var span = document.createElement('SPAN');
	span.innerHTML = result.translation;
	container.value = (span.innerText != undefined) ? span.innerText : span.textContent;
}
var sourceLanguage = 'en';
var destinationLanguage = 'pl';
function setSourceLanguage(isoCode) {
	var source = element('source-language');
	var textbox = element('input-text');
	source.value = isoCode;
	if(source.value == isoCode) {
		sourceLanguage = isoCode;
		// set the lang attribute so built-in spell-checker work correctly
		textbox.setAttribute('lang', isoCode);
		if(isoCode) {
			// activate IME functionalities
			textbox.setAttribute('NFLCIME', 'on');
			NFLCIME.dispatchEvent( { type:'LanguageRescan' } );
		} else {
			textbox.setAttribute('NFLCIME', 'off');
		}
	} else {
		return false;
	}
	return true;
}
function setDestinationLanguage(isoCode) {
	var dest = element('destination-language');
	var translation = element('translation');
	dest.value = isoCode;
	if(dest.value == isoCode) {
		destinationLanguage = isoCode;
		translation.setAttribute('lang', isoCode);
	} else {
		return false;
	}
	return true;
}
function initialize() {
	// get the minimum width and height from the body tag
	var minWidth = document.body.getAttribute('minWidth');
	var minHeight = document.body.getAttribute('minHeight');
	var options = {};
	if(minWidth) options.minWidth = parseInt(minWidth);
	if(minHeight) options.minHeight = parseInt(minHeight);
	module.applyLayout(options);
	// set up frame
	attachDOMHandler(element('frame-drag-bar'), 'mousedown', function(evt) { if(evt.target.className != 'corner-button') module.startMoving(evt) });
	attachDOMHandler(element('frame-top-left'), 'mousedown', function(evt) { module.startResizing(['top', 'left'], evt) });
	attachDOMHandler(element('frame-top'), 'mousedown', function(evt) { module.startResizing(['top'], evt) });
	attachDOMHandler(element('frame-top-right'), 'mousedown', function(evt) { module.startResizing(['top', 'right'], evt) });
	attachDOMHandler(element('frame-left'), 'mousedown', function(evt) { module.startResizing(['left'], evt) });
	attachDOMHandler(element('frame-right'), 'mousedown', function(evt) { module.startResizing(['right'], evt) });
	attachDOMHandler(element('frame-bottom-left'), 'mousedown', function(evt) { module.startResizing(['bottom', 'left'], evt) });
	attachDOMHandler(element('frame-bottom'), 'mousedown', function(evt) { module.startResizing(['bottom'], evt) });
	attachDOMHandler(element('frame-bottom-right'), 'mousedown', function(evt) { module.startResizing(['bottom', 'right'], evt) });
	attachDOMHandler(element('close-button'), 'mousedown', function(evt) { module.startAnimation('fade-out') });
	attachDOMHandler(element('collapse-button'), 'mousedown', function(evt) { module.toggleCollapse(); });
	attachDOMHandler(element('frame-drag-bar'), 'dblclick', function(evt) { if(evt.target.className != 'corner-button') module.toggleCollapse() });
	// load google translate module
	if(window.google) {
		google.load('language', '1', { language:'en', callback:onGoogleAPILoad } );
	}
	// attach handlers to page elements
	attachDOMHandler(element('source-language'), 'change', onSourceChange);
	attachDOMHandler(element('destination-language'), 'change', onDestinationChange);
	attachDOMHandler(element('swap'), 'click', onSwap);
	attachDOMHandler(element('translate'), 'click', onTranslate);
	var evt = { type:'PersistenceGetValue', id:'ui.google.translation', name:'dest', value:'' };
	NFLCIME.dispatchEvent(evt);
	if(evt.value) {
		destinationLanguage = evt.value;
	}
	var evt = { type:'PersistenceGetValue', id:'ui.google.translation', name:'src', value:'' };
	NFLCIME.dispatchEvent(evt);
	if(evt.value) {
		sourceLanguage = evt.value;
	}
	// see what the current language is
	var evt = { type:'LanguageGet', code2:'' };
	NFLCIME.dispatchEvent(evt);
	if(evt.code2) {
		destinationLanguage = evt.code2;
	}
	// select the right drop-down items
	setSourceLanguage(sourceLanguage);
	setDestinationLanguage(destinationLanguage);
}