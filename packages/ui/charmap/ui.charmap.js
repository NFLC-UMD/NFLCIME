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
	var module_css = 'ui.charmap.css';
	if(NFLCIME) {
		var evt = { type:'UIModuleGetStyleSheet', moduleId:'ui.charmap', styleSheetType:'frame' };
		evt.url = interface_css;
		NFLCIME.dispatchEvent(evt);
		interface_css = evt.url;
		var evt = { type:'UIModuleGetStyleSheet', moduleId:'ui.charmap', styleSheetType:'contents' };
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

var unicodeRanges = [{s:0x20,e:0x377},{s:0x37a,e:0x37e},{s:0x384,e:0x38a},{s:0x38c,e:0x38c},{s:0x38e,e:0x3a1},{s:0x3a3,e:0x525},{s:0x531,e:0x556},{s:0x559,e:0x55f},{s:0x561,e:0x587},{s:0x589,e:0x58a},{s:0x591,e:0x5c7},{s:0x5d0,e:0x5ea},{s:0x5f0,e:0x5f4},{s:0x600,e:0x603},{s:0x606,e:0x61b},{s:0x61e,e:0x61f},{s:0x621,e:0x65e},{s:0x660,e:0x70d},{s:0x70f,e:0x74a},{s:0x74d,e:0x7b1},{s:0x7c0,e:0x7fa},{s:0x800,e:0x82d},{s:0x830,e:0x83e},{s:0x900,e:0x939},{s:0x93c,e:0x94e},{s:0x950,e:0x955},{s:0x958,e:0x972},{s:0x979,e:0x97f},{s:0x981,e:0x983},{s:0x985,e:0x98c},{s:0x98f,e:0x990},{s:0x993,e:0x9a8},{s:0x9aa,e:0x9b0},{s:0x9b2,e:0x9b2},{s:0x9b6,e:0x9b9},{s:0x9bc,e:0x9c4},{s:0x9c7,e:0x9c8},{s:0x9cb,e:0x9ce},{s:0x9d7,e:0x9d7},{s:0x9dc,e:0x9dd},{s:0x9df,e:0x9e3},{s:0x9e6,e:0x9fb},{s:0xa01,e:0xa03},{s:0xa05,e:0xa0a},{s:0xa0f,e:0xa10},{s:0xa13,e:0xa28},{s:0xa2a,e:0xa30},{s:0xa32,e:0xa33},{s:0xa35,e:0xa36},{s:0xa38,e:0xa39},{s:0xa3c,e:0xa3c},{s:0xa3e,e:0xa42},{s:0xa47,e:0xa48},{s:0xa4b,e:0xa4d},{s:0xa51,e:0xa51},{s:0xa59,e:0xa5c},{s:0xa5e,e:0xa5e},{s:0xa66,e:0xa75},{s:0xa81,e:0xa83},{s:0xa85,e:0xa8d},{s:0xa8f,e:0xa91},{s:0xa93,e:0xaa8},{s:0xaaa,e:0xab0},{s:0xab2,e:0xab3},{s:0xab5,e:0xab9},{s:0xabc,e:0xac5},{s:0xac7,e:0xac9},{s:0xacb,e:0xacd},{s:0xad0,e:0xad0},{s:0xae0,e:0xae3},{s:0xae6,e:0xaef},{s:0xaf1,e:0xaf1},{s:0xb01,e:0xb03},{s:0xb05,e:0xb0c},{s:0xb0f,e:0xb10},{s:0xb13,e:0xb28},{s:0xb2a,e:0xb30},{s:0xb32,e:0xb33},{s:0xb35,e:0xb39},{s:0xb3c,e:0xb44},{s:0xb47,e:0xb48},{s:0xb4b,e:0xb4d},{s:0xb56,e:0xb57},{s:0xb5c,e:0xb5d},{s:0xb5f,e:0xb63},{s:0xb66,e:0xb71},{s:0xb82,e:0xb83},{s:0xb85,e:0xb8a},{s:0xb8e,e:0xb90},{s:0xb92,e:0xb95},{s:0xb99,e:0xb9a},{s:0xb9c,e:0xb9c},{s:0xb9e,e:0xb9f},{s:0xba3,e:0xba4},{s:0xba8,e:0xbaa},{s:0xbae,e:0xbb9},{s:0xbbe,e:0xbc2},{s:0xbc6,e:0xbc8},{s:0xbca,e:0xbcd},{s:0xbd0,e:0xbd0},{s:0xbd7,e:0xbd7},{s:0xbe6,e:0xbfa},{s:0xc01,e:0xc03},{s:0xc05,e:0xc0c},{s:0xc0e,e:0xc10},{s:0xc12,e:0xc28},{s:0xc2a,e:0xc33},{s:0xc35,e:0xc39},{s:0xc3d,e:0xc44},{s:0xc46,e:0xc48},{s:0xc4a,e:0xc4d},{s:0xc55,e:0xc56},{s:0xc58,e:0xc59},{s:0xc60,e:0xc63},{s:0xc66,e:0xc6f},{s:0xc78,e:0xc7f},{s:0xc82,e:0xc83},{s:0xc85,e:0xc8c},{s:0xc8e,e:0xc90},{s:0xc92,e:0xca8},{s:0xcaa,e:0xcb3},{s:0xcb5,e:0xcb9},{s:0xcbc,e:0xcc4},{s:0xcc6,e:0xcc8},{s:0xcca,e:0xccd},{s:0xcd5,e:0xcd6},{s:0xcde,e:0xcde},{s:0xce0,e:0xce3},{s:0xce6,e:0xcef},{s:0xcf1,e:0xcf2},{s:0xd02,e:0xd03},{s:0xd05,e:0xd0c},{s:0xd0e,e:0xd10},{s:0xd12,e:0xd28},{s:0xd2a,e:0xd39},{s:0xd3d,e:0xd44},{s:0xd46,e:0xd48},{s:0xd4a,e:0xd4d},{s:0xd57,e:0xd57},{s:0xd60,e:0xd63},{s:0xd66,e:0xd75},{s:0xd79,e:0xd7f},{s:0xd82,e:0xd83},{s:0xd85,e:0xd96},{s:0xd9a,e:0xdb1},{s:0xdb3,e:0xdbb},{s:0xdbd,e:0xdbd},{s:0xdc0,e:0xdc6},{s:0xdca,e:0xdca},{s:0xdcf,e:0xdd4},{s:0xdd6,e:0xdd6},{s:0xdd8,e:0xddf},{s:0xdf2,e:0xdf4},{s:0xe01,e:0xe3a},{s:0xe3f,e:0xe5b},{s:0xe81,e:0xe82},{s:0xe84,e:0xe84},{s:0xe87,e:0xe88},{s:0xe8a,e:0xe8a},{s:0xe8d,e:0xe8d},{s:0xe94,e:0xe97},{s:0xe99,e:0xe9f},{s:0xea1,e:0xea3},{s:0xea5,e:0xea5},{s:0xea7,e:0xea7},{s:0xeaa,e:0xeab},{s:0xead,e:0xeb9},{s:0xebb,e:0xebd},{s:0xec0,e:0xec4},{s:0xec6,e:0xec6},{s:0xec8,e:0xecd},{s:0xed0,e:0xed9},{s:0xedc,e:0xedd},{s:0xf00,e:0xf47},{s:0xf49,e:0xf6c},{s:0xf71,e:0xf8b},{s:0xf90,e:0xf97},{s:0xf99,e:0xfbc},{s:0xfbe,e:0xfcc},{s:0xfce,e:0xfd8},{s:0x1000,e:0x10c5},{s:0x10d0,e:0x10fc},{s:0x1100,e:0x1248},{s:0x124a,e:0x124d},{s:0x1250,e:0x1256},{s:0x1258,e:0x1258},{s:0x125a,e:0x125d},{s:0x1260,e:0x1288},{s:0x128a,e:0x128d},{s:0x1290,e:0x12b0},{s:0x12b2,e:0x12b5},{s:0x12b8,e:0x12be},{s:0x12c0,e:0x12c0},{s:0x12c2,e:0x12c5},{s:0x12c8,e:0x12d6},{s:0x12d8,e:0x1310},{s:0x1312,e:0x1315},{s:0x1318,e:0x135a},{s:0x135f,e:0x137c},{s:0x1380,e:0x1399},{s:0x13a0,e:0x13f4},{s:0x1400,e:0x169c},{s:0x16a0,e:0x16f0},{s:0x1700,e:0x170c},{s:0x170e,e:0x1714},{s:0x1720,e:0x1736},{s:0x1740,e:0x1753},{s:0x1760,e:0x176c},{s:0x176e,e:0x1770},{s:0x1772,e:0x1773},{s:0x1780,e:0x17dd},{s:0x17e0,e:0x17e9},{s:0x17f0,e:0x17f9},{s:0x1800,e:0x180e},{s:0x1810,e:0x1819},{s:0x1820,e:0x1877},{s:0x1880,e:0x18aa},{s:0x18b0,e:0x18f5},{s:0x1900,e:0x191c},{s:0x1920,e:0x192b},{s:0x1930,e:0x193b},{s:0x1940,e:0x1940},{s:0x1944,e:0x196d},{s:0x1970,e:0x1974},{s:0x1980,e:0x19ab},{s:0x19b0,e:0x19c9},{s:0x19d0,e:0x19da},{s:0x19de,e:0x1a1b},{s:0x1a1e,e:0x1a5e},{s:0x1a60,e:0x1a7c},{s:0x1a7f,e:0x1a89},{s:0x1a90,e:0x1a99},{s:0x1aa0,e:0x1aad},{s:0x1b00,e:0x1b4b},{s:0x1b50,e:0x1b7c},{s:0x1b80,e:0x1baa},{s:0x1bae,e:0x1bb9},{s:0x1c00,e:0x1c37},{s:0x1c3b,e:0x1c49},{s:0x1c4d,e:0x1c7f},{s:0x1cd0,e:0x1cf2},{s:0x1d00,e:0x1de6},{s:0x1dfd,e:0x1f15},{s:0x1f18,e:0x1f1d},{s:0x1f20,e:0x1f45},{s:0x1f48,e:0x1f4d},{s:0x1f50,e:0x1f57},{s:0x1f59,e:0x1f59},{s:0x1f5b,e:0x1f5b},{s:0x1f5d,e:0x1f5d},{s:0x1f5f,e:0x1f7d},{s:0x1f80,e:0x1fb4},{s:0x1fb6,e:0x1fc4},{s:0x1fc6,e:0x1fd3},{s:0x1fd6,e:0x1fdb},{s:0x1fdd,e:0x1fef},{s:0x1ff2,e:0x1ff4},{s:0x1ff6,e:0x1ffe},{s:0x2000,e:0x2064},{s:0x206a,e:0x2071},{s:0x2074,e:0x208e},{s:0x2090,e:0x2094},{s:0x20a0,e:0x20b8},{s:0x20d0,e:0x20f0},{s:0x2100,e:0x2189},{s:0x2190,e:0x23e8},{s:0x2400,e:0x2426},{s:0x2440,e:0x244a},{s:0x2460,e:0x26cd},{s:0x26cf,e:0x26e1},{s:0x26e3,e:0x26e3},{s:0x26e8,e:0x26ff},{s:0x2701,e:0x2704},{s:0x2706,e:0x2709},{s:0x270c,e:0x2727},{s:0x2729,e:0x274b},{s:0x274d,e:0x274d},{s:0x274f,e:0x2752},{s:0x2756,e:0x275e},{s:0x2761,e:0x2794},{s:0x2798,e:0x27af},{s:0x27b1,e:0x27be},{s:0x27c0,e:0x27ca},{s:0x27cc,e:0x27cc},{s:0x27d0,e:0x2b4c},{s:0x2b50,e:0x2b59},{s:0x2c00,e:0x2c2e},{s:0x2c30,e:0x2c5e},{s:0x2c60,e:0x2cf1},{s:0x2cf9,e:0x2d25},{s:0x2d30,e:0x2d65},{s:0x2d6f,e:0x2d6f},{s:0x2d80,e:0x2d96},{s:0x2da0,e:0x2da6},{s:0x2da8,e:0x2dae},{s:0x2db0,e:0x2db6},{s:0x2db8,e:0x2dbe},{s:0x2dc0,e:0x2dc6},{s:0x2dc8,e:0x2dce},{s:0x2dd0,e:0x2dd6},{s:0x2dd8,e:0x2dde},{s:0x2de0,e:0x2e31},{s:0x2e80,e:0x2e99},{s:0x2e9b,e:0x2ef3},{s:0x2f00,e:0x2fd5},{s:0x2ff0,e:0x2ffb},{s:0x3000,e:0x303f},{s:0x3041,e:0x3096},{s:0x3099,e:0x30ff},{s:0x3105,e:0x312d},{s:0x3131,e:0x318e},{s:0x3190,e:0x31b7},{s:0x31c0,e:0x31e3},{s:0x31f0,e:0x321e},{s:0x3220,e:0x32fe},{s:0x3300,e:0x4db5},{s:0x4dc0,e:0x9fcb},{s:0xa000,e:0xa48c},{s:0xa490,e:0xa4c6},{s:0xa4d0,e:0xa62b},{s:0xa640,e:0xa65f},{s:0xa662,e:0xa673},{s:0xa67c,e:0xa697},{s:0xa6a0,e:0xa6f7},{s:0xa700,e:0xa78c},{s:0xa7fb,e:0xa82b},{s:0xa830,e:0xa839},{s:0xa840,e:0xa877},{s:0xa880,e:0xa8c4},{s:0xa8ce,e:0xa8d9},{s:0xa8e0,e:0xa8fb},{s:0xa900,e:0xa953},{s:0xa95f,e:0xa97c},{s:0xa980,e:0xa9cd},{s:0xa9cf,e:0xa9d9},{s:0xa9de,e:0xa9df},{s:0xaa00,e:0xaa36},{s:0xaa40,e:0xaa4d},{s:0xaa50,e:0xaa59},{s:0xaa5c,e:0xaa7b},{s:0xaa80,e:0xaac2},{s:0xaadb,e:0xaadf},{s:0xabc0,e:0xabed},{s:0xabf0,e:0xabf9},{s:0xac00,e:0xd7a3},{s:0xd7b0,e:0xd7c6},{s:0xd7cb,e:0xd7fb},{s:0xf900,e:0xfa2d},{s:0xfa30,e:0xfa6d},{s:0xfa70,e:0xfad9},{s:0xfb00,e:0xfb06},{s:0xfb13,e:0xfb17},{s:0xfb1d,e:0xfb36},{s:0xfb38,e:0xfb3c},{s:0xfb3e,e:0xfb3e},{s:0xfb40,e:0xfb41},{s:0xfb43,e:0xfb44},{s:0xfb46,e:0xfbb1},{s:0xfbd3,e:0xfd3f},{s:0xfd50,e:0xfd8f},{s:0xfd92,e:0xfdc7},{s:0xfdf0,e:0xfdfd},{s:0xfe00,e:0xfe19},{s:0xfe20,e:0xfe26},{s:0xfe30,e:0xfe52},{s:0xfe54,e:0xfe66},{s:0xfe68,e:0xfe6b},{s:0xfe70,e:0xfe74},{s:0xfe76,e:0xfefc},{s:0xfeff,e:0xfeff},{s:0xff01,e:0xffbe},{s:0xffc2,e:0xffc7},{s:0xffca,e:0xffcf},{s:0xffd2,e:0xffd7},{s:0xffda,e:0xffdc},{s:0xffe0,e:0xffe6},{s:0xffe8,e:0xffee}];
var unicodeCountAtRange;
function getUnicodeCount() {
	// count the unicode at a given range
	if(!unicodeCountAtRange) {
		unicodeCountAtRange = [];
		var count = 0;
		for(var i = 0, l = unicodeRanges.length; i < l; i++) {
			unicodeCountAtRange[i] = count;
			var r = unicodeRanges[i];
			count += r.e - r.s + 1;
		}
		unicodeCountAtRange[i] = count;
	}
	return unicodeCountAtRange[unicodeCountAtRange.length - 1];
}
function findUnicodeRange(index) {
	var count = getUnicodeCount();
	if(index < count) {
		var s = 0, e = unicodeCountAtRange.length;
		while(s + 1 != e) {
			var j = s + Math.floor((e - s) / 2);
			var count = unicodeCountAtRange[j];
			if(count > index) {
				e = j;
			} else {
				s = j;
			}
		}
		return s;
	}
}
function findClosestUnicodeIndex(unicode) {
	var last = unicodeRanges[unicodeRanges.length - 1].e;
	if(unicode <= last) {
		var s = 0, e = unicodeRanges.length;
		while(s + 1 != e) {
			var j = s + Math.floor((e - s) / 2);
			var end = unicodeRanges[j].s;
			if(end > unicode) {
				e = j;
			} else {
				s = j;
			}
		}
		var range = unicodeRanges[s];
		getUnicodeCount();
		var count = unicodeCountAtRange[s];
		return (range.s <= unicode) ? count + (unicode - range.s) : count;
	}
}
function getUnicodeAt(index) {
	var range_index = findUnicodeRange(index);
	if(range_index != undefined) {
		var start_index = unicodeCountAtRange[range_index];
		var range = unicodeRanges[range_index];
		return (index - start_index) + range.s;
	}
}
function getUnicodesStartingFrom(index, count) {
	var range_index = findUnicodeRange(index);
	if(range_index != undefined) {
		var unicodes = [];
		var start_index = unicodeCountAtRange[range_index];
		var offset = index - start_index;
		for(var i = range_index; i < unicodeRanges.length && unicodes.length < count; i++) {
			var range = unicodeRanges[i];
			for(var j = range.s + offset; j <= range.e && unicodes.length < count; j++) {
				unicodes.push(j);
			}
			offset = 0;
		}
		return unicodes;
	}
}
var cellWidth = 25;
var cellHeight = 25;
var cols;
var rows;
var visibleRows;
var gridCells;
var gridRowTop;
var gridRowBottom;
function resizeGrid() {
	var container = element('container');
	var new_cols = Math.max(1, Math.floor(container.clientWidth / cellWidth));
	var new_visible_rows = Math.floor(container.clientHeight / cellHeight) + 1;
	if(cols != new_cols || visibleRows != new_visible_rows) {
		cols = new_cols;
		rows = Math.ceil(getUnicodeCount() / cols);
		visibleRows = Math.floor(container.clientHeight / cellHeight) + 1;
		var grid_height = cellHeight * rows;
		var grid_width = cellWidth * cols;
		var grid_container = element('unicode-grid-container');
		var grid = element('unicode-grid');
		grid_container.style.width = grid_width + 'px';
		grid_container.style.height = grid_height + 'px';
		while(grid.rows.length) grid.deleteRow(-1);
		grid.style.width = grid_width + 'px';
		gridCells = [];
		for(var i = 0; i < visibleRows * 2; i++) {
			var row = [];
			var tr = grid.insertRow(-1);
			tr.vAlign = 'center';
			tr.setAttribute('unselectable', 'on');
			for(var j = 0; j < cols; j++) {
				var td = tr.insertCell(-1);
				td.setAttribute('unselectable', 'on');
				row[j] = td;
			}
			gridCells[i] = row;
		}
		gridRowTop = 0;
		gridRowBottom = 0;
		showVisible();
	}
}
function showVisible() {
	var container = element('container');
	var top = container.scrollTop;
	var bottom = top + container.clientHeight;
	var top_row = Math.floor(top / cellHeight);
	var bottom_row = Math.ceil(bottom / cellHeight);
	if(!(gridRowTop <= top_row && bottom_row <= gridRowBottom)) {
		gridRowTop = Math.max(0, top_row);
		gridRowBottom = Math.min(rows, gridRowTop +  gridCells.length);
		gridRowTop = gridRowBottom - gridCells.length;
		var unicodes = getUnicodesStartingFrom(gridRowTop * cols, gridCells.length * cols);
		var index = 0;
		for(var i = 0; i < gridCells.length; i++) {
			var row = gridCells[i];
			for(var j = 0; j < row.length; j++) {
				var cell = row[j];
				var unicode = unicodes[index];
				if(!unicode) unicode = 0x20;
				if(cell.innerText != undefined) {
					cell.innerText = String.fromCharCode(unicode);
				} else {
					cell.textContent = String.fromCharCode(unicode);
				}
				var hex = unicode.toString(16).toUpperCase();
				while(hex.length < 4) hex = '0' + hex;
				cell.title = 'U+' + hex;
				index++;
			}
		}
		var grid = element('unicode-grid');
		grid.style.top = (gridRowTop * cellHeight) + 'px';
	}
}
var syncSelectTimeoutId;
function syncSelect(defer) {
	syncSelectTimeoutId = 0;
	var select = element('unicode-range-select');
	var container = element('container');
	var top = container.scrollTop;
	var top_row = Math.floor(top / cellHeight);
	var unicode = getUnicodeAt(top_row * cols + cols);
	for(var i = 0, options = select.options, l = options.length; i < l; i++) {
		var option = options[i];
		var range = option.value.split('-');
		var start = parseInt(range[0], 16), end = parseInt(range[1], 16);
		if(unicode >= start && unicode < end) {
			option.selected = true;
			break;
		}
	}
}
function scrollToUnicode(unicode) {
	var index = findClosestUnicodeIndex(unicode);
	var top_row = Math.floor(index / cols);
	var top = top_row * cellHeight;
	var container = element('container');
	container.scrollTop = top;
}
function onUnicodeRangeChange(evt) {
	var target = evt.target;
	var select = element('unicode-range-select');
	var value = target.value;
	var range = value.split('-');
	var start = parseInt(range[0], 16), end = parseInt(range[1], 16);
	scrollToUnicode(start);
}
function onUnicodeMouseDown(evt) {
	var target = evt.target;
	if(target.tagName == 'TD') {
		var text = (target.innerText) ? target.innerText : target.textContent;
		var edit = getFocusedEdit();
		if(edit) {
			NFLCIME.dispatchEvent( { type:'CursorInsertText', target:edit, text:text } );
		}
	}
}
function onScroll(evt) {
	showVisible();
	if(!syncSelectTimeoutId) {
		syncSelectTimeoutId = setTimeout(syncSelect, 100);
	}
}
function onResize(evt) {
	resizeGrid();
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
function initialize() {
	// get the minimum width and height from the body tag
	var minWidth = document.body.getAttribute('minWidth');
	var minHeight = document.body.getAttribute('minHeight');
	var options = {};
	if(minWidth) options.minWidth = parseInt(minWidth);
	if(minHeight) options.minHeight = parseInt(minHeight);
	module.applyLayout(options);
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
	attachDOMHandler(element('unicode-range-select'), 'change', onUnicodeRangeChange);
	attachDOMHandler(element('unicode-grid'), 'mousedown', onUnicodeMouseDown);
	attachDOMHandler(element('container'), 'scroll', onScroll);
	attachDOMHandler(window, 'resize', resizeGrid);
	resizeGrid();
	scrollToUnicode(0xA0);
	showVisible();
	syncSelect();
}
function shutdown() {
}