# Contributing to the Project

Want to contribute to the project? Here's how to do it!

## Core File Locations

The "core" consists of the following files:



File                       | Description 
---------------------------| ------------- 
nflcime/nflcime.js         | The endpoint of the system
nflcime/src/cursor.js      | Character insertion functions and text selection handling
nflcime/src/cvt.js         | Convert text process for data pasted into a rich-text editor
nflcime/src/kb.js          | Keyboard listeners
nflcime/src/lang.js        | Detects change to language and dispatches the appropriate events
nflcime/src/lanuages.json  | A configuration file that describes all supported languages/keyboards
nflcime/src/pers.cookie.json | A class to maintain the state of the UI elements in a cookie
nflcime/src/rt.js          | Event handlers for working with rich-text editors
nflcime/src/rt.scrube.js   | Scrubs text pasted into a rich-text editor
nflcime/src/ui.iframe.js   | A utility class for rendering the keyboard gui in a draggable iframe
 


## Compressing and Minifing the Core

We are using grunt (http://gruntjs.com/) to compress and minify the core.
After you've installed grunt, open a command prompt to the project root that contains the file "gruntfile.js." Then issue the following command:

	grunt
	
Grunt will automatically parse and execute the instructions contained in gruntfile.js, resulting in the creation of the following files:

- nflcime/nflcime-packed.js : A compressed "testing" version
- nflcime/nflcime-packed.min.js : A compressed and minified production version

## Regenerating the Documentation

The documentation was created using jsduck version 5.x (https://github.com/senchalabs/jsduck)

After you have installed jsduck 5.x (requires gem), you can regenerate the documentation by opening a command prompt to the project root that contains the file "jsduck.json." Then issue the following command:

	jsduck
	
JSDuck will scan through the following config files and apply the specified directives to re-generate the documentation system:

- jsduck.json : Stipulates which core files to add to the documentation
- jsduck-examples.json: Specifies the location of runnable examples
- guides.json: Specifies the location of files used in the "guides" section of the docs