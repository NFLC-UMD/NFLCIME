Ext.data.JsonP.addlanguage({"guide":"<h1 id='addlanguage-section-adding-and-modifying-keyboards-and-languages'>Adding and Modifying Keyboards and Languages</h1>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ol>\n<li><a href='#!/guide/addlanguage-section-creating-and-editing-key-mappings'>Creating and Editing Key Mappings</a></li>\n<li><a href='#!/guide/addlanguage-section-creating-and-editing-a-keyboard-ui'>Creating and Editing a Keyboard UI</a></li>\n<li><a href='#!/guide/addlanguage-section-registering-new-keyboards-%2F-languages'>Registering New Keyboards / Languages</a></li>\n</ol>\n</div>\n\n<p>This guide discusses how to map foreign language characters to a query keyboard as well as register that new keyboard/language with the NFLC IME API.</p>\n\n<h2 id='addlanguage-section-creating-and-editing-key-mappings'>Creating and Editing Key Mappings</h2>\n\n<p>Key mappings are stored in the nflcime/packages/kb folder as javascript files. You can modify these key mappings by browsing to nflcime/utils/keyboardmapper.html.</p>\n\n<p>To edit a key mapping, simply input the name of the file from the nflcime/packages/kb folder that you want to edit and press the [load] button. The mappings will automatically appear on the virtual keyboard as illustrated by the following screenshot:</p>\n\n<p><p><img src=\"guides/addlanguage/keyboardeditor.png\" alt=\"Editing Keyboard Mappings\" width=\"889\" height=\"652\"></p></p>\n\n<p>To assign a character to a key, complete the following steps:</p>\n\n<ol>\n<li>Click on the key on the virtual keyboard on the left side of the screen that you want to assign.</li>\n<li>Select a character set from the select box on the right.</li>\n<li>Click on the character that you want to assign from the rows of buttons in the bottom right of the interface.</li>\n</ol>\n\n\n<p>As you make selections, the javascript file will automatically adjust to reflect your changes. When you're done making changes, simply copy the contents of the JavaScript block to your clipboard and paste over the keyboard file definition that you're updating.</p>\n\n<p>To create a brand new keyboard, simply input the name of a keyboard mapping class that does not yet exist and press the [load] button.</p>\n\n<h2 id='addlanguage-section-creating-and-editing-a-keyboard-ui'>Creating and Editing a Keyboard UI</h2>\n\n<p>After you've created or modified a key mapping, you will need to generate its corresponding visual interface. Use the tool at nflcime/utils/keyboarduibuilder/keybarduibuilder.html to generate the html markup required by the API.</p>\n\n<p><p><img src=\"guides/addlanguage/keyboardeditor2.png\" alt=\"Editing Keyboard UI\" width=\"971\" height=\"583\"></p></p>\n\n<p>As illustrated in the screenshot above, the application will import your key mappings and lay them out onto a virtual keyboard. You can use the arrow buttons to center the foreign language characters in on each virtual \"key.\" When you're done, copy the html generated in the app and paste it into a file in the nflcime/packages/ui/kb folder. Also, take a screenshot of the keyboard and save it out into the nflcime/packages/ui/kb/img folder.</p>\n\n<h2 id='addlanguage-section-registering-new-keyboards-%2F-languages'>Registering New Keyboards / Languages</h2>\n\n<p>You must register all Keyboards/Languages in the file nflcime/src/languages.json. The example below registers the Belarussian keyboard.</p>\n\n<pre><code>{\n  \"id\": \"belarussian\",\n  \"twoLetterISO\": \"be\",\n  \"threeLetterISO\": \"bel\",\n  \"characterSet\": \"\\u0400-\\u044f\\u0406\\u0456\\u045e\",\n  \"script\": \"cyrillic\",\n  \"direction\": \"ltr\",\n  \"kbd\": true\n}\n</code></pre>\n","title":"Adding/Modifying a Language Keyboard"});