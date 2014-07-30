// get the NFLCIME object
var NFLCIME;
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
if(NFLCIME) {
	NFLCIME.dispatchEvent( { type:'WindowListen', target:window } );
}
if(window.addEventListener) {
	window.addEventListener('unload', function() { NFLCIME.dispatchEvent( { type:'WindowIgnore', target:window } ) }, false);
} else if(window.attachEvent) {
	window.attachEvent('onbeforeunload', function() { NFLCIME.dispatchEvent( { type:'WindowIgnore', target:window } ) } );
}