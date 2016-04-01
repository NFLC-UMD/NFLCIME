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

## Creating and Editing a Keyboard UI

After you've created or modified a key mapping, you will need to generate its corresponding visual interface. Use the tool at nflcime/utils/keyboarduibuilder/keybarduibuilder.html to generate the html markup required by the API.

{@img keyboardeditor2.png Editing Keyboard UI}

As illustrated in the screenshot above, the application will import your key mappings and lay them out onto a virtual keyboard. You can use the arrow buttons to center the foreign language characters in on each virtual "key." When you're done, copy the html generated in the app and paste it into a file in the nflcime/packages/ui/kb folder. Also, take a screenshot of the keyboard and save it out into the nflcime/packages/ui/kb/img folder.

## Registering New Keyboards / Languages

You must register all Keyboards/Languages in the file nflcime/src/languages.json. The example below registers the Belarussian keyboard.


    {
	  "id": "belarussian",
	  "twoLetterISO": "be",
	  "threeLetterISO": "bel",
	  "characterSet": "\u0400-\u044f\u0406\u0456\u045e",
	  "script": "cyrillic",
	  "direction": "ltr",
	  "kbd": true
	}