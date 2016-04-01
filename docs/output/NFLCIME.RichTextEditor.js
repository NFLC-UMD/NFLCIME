Ext.data.JsonP.NFLCIME_RichTextEditor({"tagname":"class","name":"NFLCIME.RichTextEditor","autodetected":{},"files":[{"filename":"rt.js","href":"rt.html#NFLCIME-RichTextEditor"}],"docauthor":[{"tagname":"docauthor","name":"Christopher Rhodes","email":"clrhodes@gmail.com"}],"members":[{"name":"active","tagname":"property","owner":"NFLCIME.RichTextEditor","id":"property-active","meta":{"private":true}},{"name":"browser","tagname":"property","owner":"NFLCIME.RichTextEditor","id":"property-browser","meta":{"private":true}},{"name":"htmlColors","tagname":"property","owner":"NFLCIME.RichTextEditor","id":"property-htmlColors","meta":{}},{"name":"isPasting","tagname":"property","owner":"NFLCIME.RichTextEditor","id":"property-isPasting","meta":{"private":true}},{"name":"legacyPointSizesHash","tagname":"property","owner":"NFLCIME.RichTextEditor","id":"property-legacyPointSizesHash","meta":{"private":true}},{"name":"pasteDestination","tagname":"property","owner":"NFLCIME.RichTextEditor","id":"property-pasteDestination","meta":{"private":true}},{"name":"pasteTrueTarget","tagname":"property","owner":"NFLCIME.RichTextEditor","id":"property-pasteTrueTarget","meta":{"private":true}},{"name":"selectionBeforePaste","tagname":"property","owner":"NFLCIME.RichTextEditor","id":"property-selectionBeforePaste","meta":{"private":true}},{"name":"initialize","tagname":"method","owner":"NFLCIME.RichTextEditor","id":"method-initialize","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-NFLCIME.RichTextEditor","component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/rt.html#NFLCIME-RichTextEditor' target='_blank'>rt.js</a></div></pre><div class='doc-contents'>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-active' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NFLCIME.RichTextEditor'>NFLCIME.RichTextEditor</span><br/><a href='source/rt.html#NFLCIME-RichTextEditor-property-active' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NFLCIME.RichTextEditor-property-active' class='name expandable'>active</a> : Boolean<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Sets the module to be active/inactive ...</div><div class='long'><p>Sets the module to be active/inactive</p>\n<p>Defaults to: <code>false</code></p></div></div></div><div id='property-browser' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NFLCIME.RichTextEditor'>NFLCIME.RichTextEditor</span><br/><a href='source/rt.html#NFLCIME-RichTextEditor-property-browser' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NFLCIME.RichTextEditor-property-browser' class='name expandable'>browser</a> : String<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Sets to the browser detected (ie/firefox/safari) ...</div><div class='long'><p>Sets to the browser detected (ie/firefox/safari)</p>\n<p>Defaults to: <code>&#39;&#39;</code></p></div></div></div><div id='property-htmlColors' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NFLCIME.RichTextEditor'>NFLCIME.RichTextEditor</span><br/><a href='source/rt.html#NFLCIME-RichTextEditor-property-htmlColors' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NFLCIME.RichTextEditor-property-htmlColors' class='name expandable'>htmlColors</a> : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>Available font colors for the editor when NOT used with TinyMCE. ...</div><div class='long'><p>Available font colors for the editor when NOT used with TinyMCE.</p>\n<p>Defaults to: <code>{aliceblue: &#39;#f0f8ff&#39;, antiquewhite: &#39;#faebd7&#39;, aqua: &#39;#00ffff&#39;, aquamarine: &#39;#7fffd4&#39;, azure: &#39;#f0ffff&#39;, beige: &#39;#f5f5dc&#39;, bisque: &#39;#ffe4c4&#39;, black: &#39;#000000&#39;, blanchedalmond: &#39;#ffebcd&#39;, blue: &#39;#0000ff&#39;, blueviolet: &#39;#8a2be2&#39;, brown: &#39;#a52a2a&#39;, burlywood: &#39;#deb887&#39;, cadetblue: &#39;#5f9ea0&#39;, chartreuse: &#39;#7fff00&#39;, chocolate: &#39;#d2691e&#39;, coral: &#39;#ff7f50&#39;, cornflowerblue: &#39;#6495ed&#39;, cornsilk: &#39;#fff8dc&#39;, crimson: &#39;#dc143c&#39;, cyan: &#39;#00ffff&#39;, darkblue: &#39;#00008b&#39;, darkcyan: &#39;#008b8b&#39;, darkgoldenrod: &#39;#b8860b&#39;, darkgray: &#39;#a9a9a9&#39;, darkgrey: &#39;#a9a9a9&#39;, darkgreen: &#39;#006400&#39;, darkkhaki: &#39;#bdb76b&#39;, darkmagenta: &#39;#8b008b&#39;, darkolivegreen: &#39;#556b2f&#39;, darkorange: &#39;#ff8c00&#39;, darkorchid: &#39;#9932cc&#39;, darkred: &#39;#8b0000&#39;, darksalmon: &#39;#e9967a&#39;, darkseagreen: &#39;#8fbc8f&#39;, darkslateblue: &#39;#483d8b&#39;, darkslategray: &#39;#2f4f4f&#39;, darkslategrey: &#39;#2f4f4f&#39;, darkturquoise: &#39;#00ced1&#39;, darkviolet: &#39;#9400d3&#39;, deeppink: &#39;#ff1493&#39;, deepskyblue: &#39;#00bfff&#39;, dimgray: &#39;#696969&#39;, dimgrey: &#39;#696969&#39;, dodgerblue: &#39;#1e90ff&#39;, firebrick: &#39;#b22222&#39;, floralwhite: &#39;#fffaf0&#39;, forestgreen: &#39;#228b22&#39;, fuchsia: &#39;#ff00ff&#39;, gainsboro: &#39;#dcdcdc&#39;, ghostwhite: &#39;#f8f8ff&#39;, gold: &#39;#ffd700&#39;, goldenrod: &#39;#daa520&#39;, gray: &#39;#808080&#39;, grey: &#39;#808080&#39;, green: &#39;#008000&#39;, greenyellow: &#39;#adff2f&#39;, honeydew: &#39;#f0fff0&#39;, hotpink: &#39;#ff69b4&#39;, indianred: &#39;#cd5c5c&#39;, indigo: &#39;#4b0082&#39;, ivory: &#39;#fffff0&#39;, khaki: &#39;#f0e68c&#39;, lavender: &#39;#e6e6fa&#39;, lavenderblush: &#39;#fff0f5&#39;, lawngreen: &#39;#7cfc00&#39;, lemonchiffon: &#39;#fffacd&#39;, lightblue: &#39;#add8e6&#39;, lightcoral: &#39;#f08080&#39;, lightcyan: &#39;#e0ffff&#39;, lightgoldenrodyellow: &#39;#fafad2&#39;, lightgray: &#39;#d3d3d3&#39;, lightgrey: &#39;#d3d3d3&#39;, lightgreen: &#39;#90ee90&#39;, lightpink: &#39;#ffb6c1&#39;, lightsalmon: &#39;#ffa07a&#39;, lightseagreen: &#39;#20b2aa&#39;, lightskyblue: &#39;#87cefa&#39;, lightslategray: &#39;#778899&#39;, lightslategrey: &#39;#778899&#39;, lightsteelblue: &#39;#b0c4de&#39;, lightyellow: &#39;#ffffe0&#39;, lime: &#39;#00ff00&#39;, limegreen: &#39;#32cd32&#39;, linen: &#39;#faf0e6&#39;, magenta: &#39;#ff00ff&#39;, maroon: &#39;#800000&#39;, mediumaquamarine: &#39;#66cdaa&#39;, mediumblue: &#39;#0000cd&#39;, mediumorchid: &#39;#ba55d3&#39;, mediumpurple: &#39;#9370d8&#39;, mediumseagreen: &#39;#3cb371&#39;, mediumslateblue: &#39;#7b68ee&#39;, mediumspringgreen: &#39;#00fa9a&#39;, mediumturquoise: &#39;#48d1cc&#39;, mediumvioletred: &#39;#c71585&#39;, midnightblue: &#39;#191970&#39;, mintcream: &#39;#f5fffa&#39;, mistyrose: &#39;#ffe4e1&#39;, moccasin: &#39;#ffe4b5&#39;, navajowhite: &#39;#ffdead&#39;, navy: &#39;#000080&#39;, oldlace: &#39;#fdf5e6&#39;, olive: &#39;#808000&#39;, olivedrab: &#39;#6b8e23&#39;, orange: &#39;#ffa500&#39;, orangered: &#39;#ff4500&#39;, orchid: &#39;#da70d6&#39;, palegoldenrod: &#39;#eee8aa&#39;, palegreen: &#39;#98fb98&#39;, paleturquoise: &#39;#afeeee&#39;, palevioletred: &#39;#d87093&#39;, papayawhip: &#39;#ffefd5&#39;, peachpuff: &#39;#ffdab9&#39;, peru: &#39;#cd853f&#39;, pink: &#39;#ffc0cb&#39;, plum: &#39;#dda0dd&#39;, powderblue: &#39;#b0e0e6&#39;, purple: &#39;#800080&#39;, red: &#39;#ff0000&#39;, rosybrown: &#39;#bc8f8f&#39;, royalblue: &#39;#4169e1&#39;, saddlebrown: &#39;#8b4513&#39;, salmon: &#39;#fa8072&#39;, sandybrown: &#39;#f4a460&#39;, seagreen: &#39;#2e8b57&#39;, seashell: &#39;#fff5ee&#39;, sienna: &#39;#a0522d&#39;, silver: &#39;#c0c0c0&#39;, skyblue: &#39;#87ceeb&#39;, slateblue: &#39;#6a5acd&#39;, slategray: &#39;#708090&#39;, slategrey: &#39;#708090&#39;, snow: &#39;#fffafa&#39;, springgreen: &#39;#00ff7f&#39;, steelblue: &#39;#4682b4&#39;, tan: &#39;#d2b48c&#39;, teal: &#39;#008080&#39;, thistle: &#39;#d8bfd8&#39;, tomato: &#39;#ff6347&#39;, turquoise: &#39;#40e0d0&#39;, violet: &#39;#ee82ee&#39;, wheat: &#39;#f5deb3&#39;, white: &#39;#ffffff&#39;, whitesmoke: &#39;#f5f5f5&#39;, yellow: &#39;#ffff00&#39;, yellowgreen: &#39;#9acd32&#39;}</code></p></div></div></div><div id='property-isPasting' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NFLCIME.RichTextEditor'>NFLCIME.RichTextEditor</span><br/><a href='source/rt.html#NFLCIME-RichTextEditor-property-isPasting' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NFLCIME.RichTextEditor-property-isPasting' class='name expandable'>isPasting</a> : Boolean<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Sets the pasting mode of the editor when NOT used with TinyMCE. ...</div><div class='long'><p>Sets the pasting mode of the editor when NOT used with TinyMCE.</p>\n<p>Defaults to: <code>false</code></p></div></div></div><div id='property-legacyPointSizesHash' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NFLCIME.RichTextEditor'>NFLCIME.RichTextEditor</span><br/><a href='source/rt.html#NFLCIME-RichTextEditor-property-legacyPointSizesHash' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NFLCIME.RichTextEditor-property-legacyPointSizesHash' class='name expandable'>legacyPointSizesHash</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Sets the available font sizes for the editor when NOT used with TinyMCE. ...</div><div class='long'><p>Sets the available font sizes for the editor when NOT used with TinyMCE.</p>\n<p>Defaults to: <code>{}</code></p></div></div></div><div id='property-pasteDestination' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NFLCIME.RichTextEditor'>NFLCIME.RichTextEditor</span><br/><a href='source/rt.html#NFLCIME-RichTextEditor-property-pasteDestination' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NFLCIME.RichTextEditor-property-pasteDestination' class='name expandable'>pasteDestination</a> : HTMLElement<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Used to track DOM node created for pasting via browser detection when NOT\nused with TinyMCE. ...</div><div class='long'><p>Used to track DOM node created for pasting via browser detection when NOT\nused with TinyMCE. May be the same or different from RichTextEditor.pasteTrueTarget.</p>\n</div></div></div><div id='property-pasteTrueTarget' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NFLCIME.RichTextEditor'>NFLCIME.RichTextEditor</span><br/><a href='source/rt.html#NFLCIME-RichTextEditor-property-pasteTrueTarget' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NFLCIME.RichTextEditor-property-pasteTrueTarget' class='name expandable'>pasteTrueTarget</a> : HTMLElement<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'><p>Used to track the active textarea DOM node for the editor when NOT\nused with TinyMCE.</p>\n</div><div class='long'><p>Used to track the active textarea DOM node for the editor when NOT\nused with TinyMCE.</p>\n</div></div></div><div id='property-selectionBeforePaste' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NFLCIME.RichTextEditor'>NFLCIME.RichTextEditor</span><br/><a href='source/rt.html#NFLCIME-RichTextEditor-property-selectionBeforePaste' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NFLCIME.RichTextEditor-property-selectionBeforePaste' class='name expandable'>selectionBeforePaste</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'><p>Used to track the start and end selection text when NOT used with\nTinyMCE.</p>\n</div><div class='long'><p>Used to track the start and end selection text when NOT used with\nTinyMCE.</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-initialize' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NFLCIME.RichTextEditor'>NFLCIME.RichTextEditor</span><br/><a href='source/rt.html#NFLCIME-RichTextEditor-method-initialize' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NFLCIME.RichTextEditor-method-initialize' class='name expandable'>initialize</a>( <span class='pre'>env</span> ) : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>Initialize the module. ...</div><div class='long'><p>Initialize the module.\n Sets the <a href=\"#!/api/NFLCIME.RichTextEditor-property-browser\" rel=\"NFLCIME.RichTextEditor-property-browser\" class=\"docClass\">browser</a> property and initializes closures and sets <a href=\"#!/api/NFLCIME.RichTextEditor-property-active\" rel=\"NFLCIME.RichTextEditor-property-active\" class=\"docClass\">active</a> to false</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>env</span> : Object<div class='sub-desc'><p>The browser environment</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});