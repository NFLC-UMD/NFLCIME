# Adding and Modifying Keyboards and Languages

This guide discusses how to map foreign language characters to a query keyboard as well as register that new keyboard/language with the NFLC IME API.

## Creating and Editing Key Mappings

Key mappings are stored in the nflcime/packages/kb folder as javascript files. You can modify these key mappings by browsing to nflcime/utils/keyboardmapper.html.

To edit a key mapping, simply input the name of the file from the nflcime/packages/kb folder that you want to edit and press the [load] button. The mappings will automatically appear on the virtual keyboard as illustrated by the following screenshot:

{@img keyboardeditor.png Editing Keyboard Mappings}

To assign a character to a key, complete the following steps:  

1. Click on the key on the virtual keyboard on the left side of the screen that you want to assign. 
2. Select a character set from the select box on the right.
3. Click on the character that you want to assign from the rows of buttons in the bottom right of the interface.

As you make selections, the javascript file will automatically adjust to reflect your changes. When you're done making changes, simply copy the contents of the JavaScript block to your clipboard and paste over the keyboard file definition that you're updating.  

To create a brand new keyboard, simply input the name of a keyboard mapping class that does not yet exist and press the [load] button.


## Registering New Keyboards / Languages

You must register ll Keyboards/Languages in the file nflcime/src/languages.json. The example below registers the Belarussian keyboard.


    {
	  "id": "belarussian",
	  "twoLetterISO": "be",
	  "threeLetterISO": "bel",
	  "characterSet": "\u0400-\u044f\u0406\u0456\u045e",
	  "script": "cyrillic",
	  "direction": "ltr",
	  "kbd": true
	}