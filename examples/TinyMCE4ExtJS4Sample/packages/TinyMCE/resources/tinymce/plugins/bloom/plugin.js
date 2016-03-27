/**
 * Bloom Language Keyboard Plugin
 *
 * Modified for TinyMCE 4 compatibility on 04/04/2014 By Steve Drucker
 * sdrucker@figleaf.com
 *
 */

tinymce.PluginManager.add('bloom', function(ed, url) {


	var bloom_plugin = this, //
		bloom_init_params = ed.getParam('bloom'), //
		css_loc = bloom_init_params.css, //
		init_modules = bloom_init_params.Modules;

	// console.log('tinymce.PluginManager.add', ed, url, bloom_init_params);
	/*
	if (bloom_init_params.defaultLanguage) {
		this.defaultLanguage=bloom_init_params.defaultLanguage;
	}
	*/

	bloom_plugin.supportedLanguages = undefined;



	bloom_plugin.attachNflcIme = function() {

		if (NFLCIME) {

			// load nflcime modules

			if (typeof NFLCIMELoaded == "undefined") {
				tinymce.each(init_modules, function(m) {
					NFLCIME.dispatchEvent({
						type: 'ModuleLoad',
						moduleId: m.id,
						activate: m.activate,
						compressed: m.compressed
					});

				});

				NFLCIMELoaded = true;
			}


		} else {

			NFLCIME = (window.NFCLIME || {});
			tinymce.extend(NFLCIME, {
				init_modules: bloom_init_params
			});

		}
	};


	// look for match on language

	bloom_plugin.findLanguageByName = function(lang) {
		lang = lang.toLowerCase();
		for (var i = 0; i < bloom_plugin.supportedLanguages.length; i++) {
			if (bloom_plugin.supportedLanguages[i].id.toLowerCase() == lang) {
				return bloom_plugin.supportedLanguages[i];
			}
		}
	};

	/**
	 * strip off portion of fra-SY (the country code) to capture fra iso code
	 * only.
	 */
	bloom_plugin.findLanguage = function(lang) {

		if (!lang) {
			// console.log('no language specified', lang);
			return;
		}

		if (lang) {
			lang = lang.toLowerCase();
			// lang = lang.toLowerCase().substring(0, 3);
			var countryCode = lang.split('-');
			if (countryCode.length > 1) {
				countryCode = countryCode[countryCode.length - 1];
				lang = lang.substring(0, 3);
			}


			for (var i = 0; i < bloom_plugin.supportedLanguages.length; i++) {
				var item = bloom_plugin.supportedLanguages[i];
				if (item.threeLetterISO == lang || item.id.toLowerCase() == lang) {
					return item;
				}
				if (item.variants) {
					for (var j = 0; j < item.variants.length; j++) {
						if (item.variants[j] == lang) {
							return item;
						}
					}
				}
			}
		}

	};

	bloom_plugin.exists = function(namespace) {
		var tokens = namespace.split('.');
		return tokens.reduce(function(prev, curr) {
			return (typeof prev == "undefined") ? prev : prev[curr];
		}, window);
	};

	bloom_plugin.doLanguagesExist = function() {
		if (bloom_plugin.exists("NFLCIME.registeredModules.lang.languages")) {
			console.log('Languages loaded.');
			bloom_plugin.supportedLanguages = NFLCIME.registeredModules.lang.languages;
			bloom_plugin.afterLanguagesExist();
		} else {
			console.log('Waiting on languages to load.');
			setTimeout(function() {
				bloom_plugin.doLanguagesExist();
			}, 100);
		}
	};

	//
	bloom_plugin.attachNflcIme();
	bloom_plugin.doLanguagesExist();

		var langs = ed.getParam('bloom').languages;


		var defaultLanguage = ed.getParam('bloom').default_language;

		if (langs)
			langs = langs.split(',');

		// if no languages are specified, allow user
		// to select from all supported languages

		if (langs.length === 0) {
			langs = bloom_plugin.supportedLanguages;
		}

		if (!defaultLanguage) {
			defaultLanguage = langs[0];
		}

		// create menu and buttons

		var menuItems = [],
			theLang = {};

		/*
	for (var i = 0; i < langs.length; i++) {

		theLang = bloom_plugin.findLanguage(langs[i]);
		if (theLang) {

			menuItems.push({
				text: theLang.id.charAt(0).toUpperCase() + theLang.id.slice(1),
				language: theLang.threeLetterISO,
				langDirection: theLang.direction
			});

			if (langs[i].toLowerCase() == defaultLanguage.toLowerCase()) {
				ed.bloomLanguage = theLang.threeLetterISO;
			}
		} else {
			console.warn('TinyMCE > bloom plugin > could not find language:',
				langs[i]);
		}

	}
	//	console.log('init ed.bloomLanguage', ed.bloomLanguage);
	//	console.log('init defaultLanguage', defaultLanguage);
	// sort by language names
	menuItems = menuItems.sort(function(a, b) {
		if (a.text > b.text)
			return 1;
		else
			return -1;
	});
    */
		/*
    menuItems.unshift([{
    	text: 'Select Lang',
    	language: 'eng',
    	langDirection: 'ltr'
    }])
	*/

		// store language config with editor
		// ed.bloomLanguages = menuItems;

		// add drop-down list
		ed.addButton('bloomlanguagebutton', {
			type: 'menubutton',
			text: 'Please Select',
			tooltip: 'Select the language / character set',
			icon: false,
			menu: menuItems,
			onselect: function(e) {

				this.text(e.control._text);
				var selectedLang = bloom_plugin.findLanguageByName(e.control._text);
				if (selectedLang) {
					ed.bloomLanguage = selectedLang.threeLetterISO;



					var node = ed.selection.getNode();
					var selectedTag = "other";

					// determine if a block is selected
					if (ed.selection.getContent().substring(0, 5) == "<span") {
						selectedTag = "span";
					} else if (ed.selection.getContent().substring(0, 2) == "<p") {
						selectedTag = "P";
					}

					// did the user select text, or is the cursor
					//
					if (ed.selection.getContent().length == 0) {
						var insertMode = true;
					} else {
						var insertMode = false;
					}

					if (selectedTag != "other") {

						node.setAttribute("lang", ed.bloomLanguage);
						node.setAttribute("class", "lang-" + ed.bloomLanguage);
						ed.fire('languagechange', {
							language: selectedLang.threeLetterISO,
							editor: ed
						});

					} else {

						if (!insertMode) {
							// user has selected text

							switch (node.nodeName) {

								case "P":
									// wrap text in span
									var range = ed.selection.getRng();
									var content = ed.selection.getContent();
									ed.selection.setContent('<span lang="' + ed.bloomLanguage + '" class="lang-' + ed.bloomLanguage + '">' + content + "</span>")
									break;

								case "SPAN":
									// can't do span inside of span
									// so change span parent lang
									node.setAttribute("lang", ed.bloomLanguage);
									node.setAttribute("class", "lang-" + ed.bloomLanguage);
									break;
							}

						} else {
							// user has not selected text

							if (node.nodeName == 'P') {
								// add a span if inside a <p> and nothing selected
								if (node.innerText.length > 1 && node.getAttribute('lang')) {

									var selection = ed.selection.getRng();
									var s = document.createElement("SPAN");
									s.setAttribute("lang", ed.bloomLanguage);
									s.setAttribute("class", "lang-" + ed.bloomLanguage);

									var t = document.createTextNode(" ");
									s.appendChild(t);

									selection.insertNode(s);
									ed.selection.select(t, true);
									ed.selection.setCursorLocation(t, 1);
									ed.focus();
									ed.fire('languagechange', {
										language: selectedLang.threeLetterISO,
										editor: ed
									});
								} else {
									node.setAttribute("lang", ed.bloomLanguage);
									node.setAttribute("class", "lang-" + ed.bloomLanguage);
								}
							} else {

								// cursor is positioned in
								// span with lang attribute already set
								alert("In order to change the language you must first select the entire block by pressing the Select Block button");

								// reset lang selector
								selectedLang = bloom_plugin.findLanguagenode.getAttribute('lang');
								this.text(selectedLang.id.charAt(0).toUpperCase() + selectedLang.id.slice(1));

							}

						}

					}
				}
			},
			onPostRender: function() { // assigns button
				var self = this;
				ed.plugins.bloom.languageSelectorButton = self;
			}
		});

		// add "Go" button
		/**
		 * Clicking on this button appears to dispach the NFLCIME
		 * CursorMoved event, which in turn dispatches the NFLCIME
		 * LanguageChange event, which inturn fires the tinymce
		 * editor "langchange" event.
		 *
		 * This appears to bring up the keyboard, but how.  Where is this
		 * event captured?
		 */

		ed.addButton('bloomlanguageenablebutton', {
			type: 'button',
			// disabled : ed.bloomLanguage ? false : true,
			image: url + '/img/keyboard.png',
			tooltip: 'Enable Language Keyboard',
			onclick: function(e) {


				var lang = bloom_plugin.findLanguage(ed.bloomLanguage);

				if ("kbd" in lang) {
					if (!lang.kbd) {
						alert("The " + lang.id + " language does not have a special keyboard");
					}
				}

				ed.fire('languagechange', {
					language: ed.bloomLanguage,
					editor: ed
				});

			}
		});



		ed.addButton('bloomlanguageselectblockbutton', {
			type: 'button',
			// disabled : ed.bloomLanguage ? false : true,
			image: url + '/img/selection_up.png',
			tooltip: 'Select the current block',
			onclick: function(e) {
				/**
				 * Clicking on this button appears to dispach the NFLCIME
				 * CursorMoved event, which in turn dispatches the NFLCIME
				 * LanguageChange event, which inturn fires the tinymce
				 * editor "langchange" event.
				 *
				 * This appears to bring up the keyboard, but how.  Where is this
				 * event captured?
				 */

				var node = ed.selection.getNode();
				ed.selection.select(node);
			}
		});

		ed.addButton('bloomcharmapbutton', {
			type: 'button',
			// disabled : ed.bloomLanguage ? false : true,
			image: url + '/img/keyboard_key.png',
			disabled: true,
			tooltip: 'Display the Character Map',
			onclick: function(e) {
				/**
				 * Clicking on this button appears to dispach the NFLCIME
				 * CursorMoved event, which in turn dispatches the NFLCIME
				 * LanguageChange event, which inturn fires the tinymce
				 * editor "langchange" event.
				 *
				 * This appears to bring up the keyboard, but how.  Where is this
				 * event captured?
				 */

				var target = "ui.charmap";
				var url = "ui.charmap.html";

				NFLCIME.dispatchEvent({
					type: 'UIModuleLoad',
					moduleId: target,
					url: url,
					options: {
						hAlign: 'left',
						vAlign: 'top',
						x: 200,
						y: 200
					}
				})
			},
			onPostRender: function() { // assigns button
				var self = this;
				ed.plugins.bloom.bloomCharMapButton = self;
			}
		});

		// fire Ext JS events - relocated to ext plugin class
		/*
		ed.on('focus', function __focus__(e) {
					var cmp = e.target.settings.extClass;
					cmp.fireEvent('focus', cmp, e.target);
				});

		ed.on('blur', function __blur__(e) {
					var cmp = e.target.settings.extClass;
					cmp.fireEvent('blur', cmp, e.target);
				});

		*/
		ed.on('postrender', function __postrender__(mgr) {

			// alert('postrender');
			var cssFile = css_loc.indexOf('://') > 0 ? css_loc : (url + '/' + css_loc);
			// console.log(cssFile);
			ed.dom.loadCSS(cssFile);
			var cmp = mgr.target.settings.extClass;
			// cmp.fireEvent('editorready', cmp, mgr.target);

		});

		// set default language
		ed.on('defaultlanguagechange', function __defaultlanguagechange__(e) {
			// debugger;
			var lang = e.language;
			var language = bloom_plugin.findLanguage(lang);
			var defaultHtml = '<p lang="' + lang + '" class="lang-' + lang + '"></p>';
			this.setContent(defaultHtml);
			ed.plugins.bloom.languageSelectorButton.text(language.id.charAt(0).toUpperCase() + language.id.slice(1));

		});



		// this event is fired from NFLCIME/lang.js handler for the 'languagechange'
		// event. and POSSIBLY elswhere??
		ed.on('langchange', function __langchange__(e) {
			//console.log('ed.on langchange')

			var lang = e.lang;
			var ed = e.target;
			var langSelectButton = bloom_plugin.languageSelectorButton;
			var langName = "";

			if (e.lang.length != 3) {
				this.plugins.bloom.bloomCharMapButton.disabled(true);
			} else {
				this.plugins.bloom.bloomCharMapButton.disabled(false);
			}

			var language = bloom_plugin.findLanguage(lang);
			if (language) {
				langSelectButton.text(language.id.charAt(0).toUpperCase() + language.id.slice(1));
				ed.bloomLanguage = lang;
			} else {
				langSelectButton.text('Please Select');
			}
		});

	// handle languages and defaultLanguage arguments
	bloom_plugin.afterLanguagesExist = function() {


		// dynamically reconfigure supported languages


		ed.on('setBloomLanguages', function __setbloomlanguages__(ed) {
			// only set once
			// if (!ed.bloomLanguagesSet) {
			// added type conversion 09/17/2014 sdd

			if (typeof ed == 'object') {
				langs = ed.langs;
				if (typeof langs == 'string') {
					langs = langs.split(',');
				}
			}

			var button = bloom_plugin.languageSelectorButton, //
				menuItems = [], //
				theLang = {}, //
				defaultLang;

			// de-dup languages, stripping off country-code

			var filteredLangObj = {};
			for (var i = 0; i < langs.length; i++) {
				if (typeof langs[i] == 'string') { // sometimes an object gets passed for some reason?
					langs[i] = langs[i].split('-')[0];
					filteredLangObj[langs[i]] = true;
				}
			}
			langs = [];
			for (var i in filteredLangObj) {
				langs.push(i);
			}

			langs.push('eng');

			// add menu items

			var langLabels = {};
			var langLabel = "";

			for (var i = 0; i < langs.length; i++) {

				theLang = bloom_plugin.findLanguage(langs[i]);

				if (theLang) {
					langLabel = theLang.id.charAt(0).toUpperCase() + theLang.id.slice(1);
					// de-dup, again
					if (!langLabels[langLabel]) {
						menuItems.push({
							text: langLabel,
							language: theLang.threeLetterISO,
							langDirection: theLang.direction
						});

						if (langs[i].toLowerCase() == defaultLanguage.toLowerCase()) {
							ed.bloomLanguage = theLang.threeLetterISO;
						}
						langLabels[langLabel] = true;
					}
				} else {
					// console.warn('TinyMCE > bloom plugin > could not find language:',langs[i]);
				}

			}

			/**
			 * Note the default lang must be in the list, so we add it here if it is
			 * not.
			 */
			if (!ed.bloomLanguage && defaultLanguage.length === 3) {
				defaultLang = bloom_plugin.findLanguage(defaultLanguage
					.toLowerCase());

				menuItems.push({
					text: defaultLang.id.charAt(0).toUpperCase() + defaultLang.id.slice(1),
					language: defaultLang.threeLetterISO,
					langDirection: defaultLang.direction,
					tooltip: defaultLang.id.charAt(0).toUpperCase() + defaultLang.id.slice(1)
				});
				ed.bloomLanguage = defaultLang.threeLetterISO;
			}


			if (menuItems.length > 0) {

				menuItems = menuItems.sort(function(a, b) {
					if (a.text > b.text)
						return 1;
					else
						return -1;
				});

				// console.log('resetting editor to these languages: ', menuItems, bloom_plugin.languageSelectorButton);

				button.settings.menu = menuItems;
				button.menu = null;

				// button.text(menuItems[0].text);
				button.text("Please Select");

			} else {

				button.settings.menu = [];
				button.text('');
			}

			// this.fire('languagechange', {
			// language: menuItems[0].language,
			// editor: this
			// });

			ed.bloomLanguagesSet = true;
			// }

		});
	};


});
