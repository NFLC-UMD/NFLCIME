# Getting Started with the API

The NFLCIME API enables you to easily add foreign language keyboards to your web applications.

## Loading the API

The API ships with three versions:

- A development version (nflcime.js)
- A merged, testing version (nflcime-packed)
- A compressed and minified production version (nflcime-packed.min.js)

### Loading the Development Version

The development verion enpoint is nflcime. This script will, in turn, autoload additional javascript subcomponents from the /NFLCIME/src folder. 

There are two typical use-cases:

- Attaching a virtual keyboard to an HTML Textarea
- Attaching a virtual keyboard to a WYSIWYG (TinyMCE4) Editor

You can load the dev version for rich-text editors by inserting a &lt;script&gt; tag as illustrated by the following snippet:

	<script type="text/javascript" src="NFLCIME/nflcime.js">  
 	 Modules: [  
 	  { id:'pers.cookie', activate:true}, 
  	  {id: 'cursor', activate: true},   
  	  {id: 'rt', activate: true}   
 	 ]   
	</script>   

Note that inside the &lt;script&gt; block is a "Modules" array that indicates which API subcomponents are going to be used.

In addition to loading the nflcime script, you should also load the toolkit's stylesheet:

	<link rel="stylesheet" type="text/css" href="NFLCIME/fontcss/langs.css" />

The following snippet illustrates how to load the library to attach to simple html textareas:

	<script type="text/javascript" src="NFLCIME/nflcime.js">
	  Modules:[
	    { id:'pers.cookie', activate:true},
	    { id:'ui.iframe', activate:true},
	    { id:'lang', activate:true}
	  ]
	</script>

The following sub-modules are available:


Module       | Description 
------------ | ------------- 
			 |
pers.cookie  | Personalization module. Stores last position of keyboard and other settings in a cookie.
rt           | Invoke when you need to support a rich-text editor.
lang         | Language class. Required when working with html text fields and textareas.
ui.iframe	 | Draggable iframe that's used to render on-screen keyboard


### Loading Compressed/Minified Versions

If you are loading the testing/production version of NFLCIME, add the compressed:true property to your Modules. Adding compressed:true signals the toolkit to not dynamically load API subcomponents.

For example:

	<script type="text/javascript" src="NFLCIME/nflcime.js">
	  Modules:[
	    { id:'pers.cookie', activate:true, compressed: true},
	    { id:'ui.iframe', activate:true, compressed: true},
	    { id:'lang', activate:true, compressed: true}
	  ]
	</script>


## Setting Target Languages on HTML TextAreas

You can set an HTML textarea to one of the supported languages by adding the following attributes to the &lt;textarea&rt; tag:

- lang : specify the 3-character ISO language code, e.g. 'deu' for German
- NFLCIME : Set to "on"

Example:

	<label for="mygermantextarea">German Content</label>
	<textarea id="mygermantextarea" lang="deu" class="lang-deu" NFLCIME="on" />
	
Right-to-Left languages should apply a CSS class or STYLE attribute that sets direction:rtl as illustrated by the following example:

	<label for="myarabictextarea">Arabic Content</label>
	<textarea id="myarabictextarea" lang="arb" class="lang-arb" style="direction:rtl" NFLCIME="on" />
	
### Putting It All Together 

The following snippet illustrates loading NFLC IME and attaching a keyboard to a textarea:

	<html>
	<head>

	<link rel="stylesheet" type="text/css" href="../NFLCIME/fontcss/langs.css" />

	<script language="javascript" src="../NFLCIME/nflcime-packed.min.js">

		Modules:[
		 { id:'pers.cookie', activate:true },
		 { id:'ui.iframe', activate:true, compressed: true},
		 { id:'lang', activate:true , compressed: true}
		]
	</script>

	<style>

		TEXTAREA {
			width: 400px;
			height: 200px;
		}

	</style>
	</head>
	<body>
	<h2>Simple Deployment</h2>


	<h3>Arabic, Libyan</h3>
	<textarea lang="ayl" class="lang-ayl" NFLCIME="on" style="direction: rtl"></textarea>


## Using the TinyMCE4 WYSIWYG Plugin
IME has a special plugin for the TinyMCE4 WYSIWYG editor.

Currently the plugin is located in the /examples/TinyMCE4ExtJS4Sample/packages/TinyMCE/resources/tinymce/plugins/bloom folder.

![tinymce4 screenshot](../resources/docs/tinymcewithime.png)


The following code, when placed in the html &lt;head&gt; performs the following functions:

- Loads the NFLC IME Library
- Loads TinyMCE
- Configures TinyMCE to attach to all textareas on the page
- Loads the "bloom" (NFLCIME) plugin into TinyMCE
- Configures which selectable language keyboards will be available to the user (bloom.languages property)
- Invokes the appropriate NFLCIME modules from TinyMCE

<!-- load the nflcime library with richtext option -->
    <script src="../NFLCIME/nflcime.js">
	    Modules: [
	        {id: 'cursor', compressed: false, activate: true},
	        {id: 'rt', compressed: false, activate: true}
	    ]
	</script>

	<!-- load the tinymce widget -->
    <script src="TinyMCE4ExtJS4Sample/packages/TinyMCE/resources/tinymce/tinymce.js"></script>

	<!-- initialize the tinymce editor(s) -->
	<script>
	    tinymce.init({ 
		 selector:"textarea",
		 menubar: false,
		 plugins: "bloom paste code visualblocks",
		 content_css: "../NFLCIME/fontcss/langs.css,TinyMCE4ExtJS4Sample/packages/TinyMCE/resources/ice/tinymce4_plugin/css/ice.css",
		 bloom: {
		 	css: '../../../../../../../../NFLCIME/fontcss/langs.css',
			defaultLanguage : "eng",
			default_language : "eng",
			languages : "arb,amh,sqi,eng",
			services: "kb,cvt,rt",
			Modules: [
				{id: 'pers.cookie', activate: true},
				{id: 'ui.iframe', activate: true},
				{id: 'editor.tinymce', activate: true},
				{id: 'rt.scrube', activate: true},
				{id: 'lang', activate: true}
			]
		 },
		 toolbar1: "undo redo | bold italic | strikethrough | charmap | code |  visualblocks  | bloomlanguagebutton bloomlanguageenablebutton bloomlanguageselectblockbutton bloomcharmapbutton | ice_togglechanges ice_toggleshowchanges iceacceptall icerejectall iceaccept icereject"
		});
	
	</script>


	
## Available Keyboards

Keyboard definitions are registered in the NFLCIME/src/languages.json file.

Available keyboards include:

Language     | Code   | Language  | Code | Language | Code |
------------ | -------| --------  | ---- | -------- | ---- |
             |        |           |      |          |      |
Albanian     | sqi    | Amharic   | amh  | Arabic   | arb  |
Azeri        | aze    | Bambara   | bam  | Balochi  | bal  |
Belarussian  | bel    | Bengali   | ben  | Brahui   | brh  |
Bulgarian    | bul    | Burmese   | mya  | Chechen  | che  |
Chinese      | zho    | Croatian  | hrv  | Czech    | ces  |
Danish       | dan    | Dari      | prs  | Dinka    | din  |
Dutch        | nld    | Estonian  | est  | Farsi    | fas  |
Finnish      | fin    | French    | fra  | Georgian | kat  |
German       | deu    | Greek     | ell  | Gujarati | guj  |
Haitian      | hat    | Hassaniyya | mey | Hausa   | hau  |
Hebrew       | heb    | Hindi     | hin  | Hindko   | hno  | 
Hungarian    | hun    | Igbo      | ibo  | Iraqi    | acm  |
Italian      | ita    | Kashmiri  | kas  | Kazakh   | kaz  |  
Korean       | kor    | Kurdish   | kur  | Kurmanji | kmr  |
Kyrgyz       | kir    | Latvian   | lav  | Lithuanian | lit |
Lao          | lao    | Macedonian | mkd | maguindanao | mdh |
Maranao      | mrw    | Norwegian | nor  | Pashto   | pus |
Potwari      | phr    | Polish    | pol  | ePunjabi | pan |
wPunjabi     | pnb    | Portugese | por  | Quechua  | que | 
Romanian     | ron    | Russian   | rus  | Sama     | ssb | 
Serbian      | srp    | Sindhi    | snd  | Siraiki  | skr |
Slovene      | slv    | Slovak    | slk  | Sorani   | ckb |
Spanish      | spa    | Sudanese  | apd  | Swahili  | swa |
Swedish      | swe    | Tagalog   | tgl  | Tajik    | tgk |
Thai         | tha    | Tigrinya  | tir  | Turkish  | tur |
Turkmen      | tuk    | Ukranian  | ukr  | Uzbek    | uzb |
Wolof        | wol    | Urdu      | urd  | Vietnamese | vie |
Yakan        | yka    | Yoruba    | yor
 



