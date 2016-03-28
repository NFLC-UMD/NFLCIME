/**
 * Extending the TinyMCETextArea for the NFLCIME (plugin_bloom) stuff and the properties/methods needed for
 *  the XmlDocStore and shared/ux/form/field/Base.js
 */
Ext.define('Ext.ux.form.TinyRTEditor', {
	extend : 'Ext.ux.form.TinyMCETextArea',
	alias : ['widget.tinyeditor'],

	cssUrls : "../NFLCIME/fontcss/langs.css",

	hideToolbar : true,
	iceUserName: 'Anonymous',
	iceUserId: 'anon',

	initComponent : function() {
		var me = this;

		if (me.plugin_bloom) {
			// me.plugin_directionality = true;
			if (!me.bloom.default_language) {
				me.bloom.default_language = me.defaultLanguage;
			}
			if (me.languages) {
				me.bloom.languages = me.languages;
				if (me.bloom.languages.indexOf(me.bloom.default_language) == -1) {
					me.bloom.languages += "," + me.bloom.default_language;
				}
			} else {
				me.bloom.languages = false;
			}

			me.plugin_paste = true;

			// tie-in NFLC

			me.on('editorready',  function() {
				// console.log('editor ready:' + new Date());
					 // NFLCIME.reinitialize();
					 me.fireEvent('focus',me);
			},me,{buffer: 1000});


		}

		Ext.apply(me, {
					
					deleteTag: 'delete',
                    insertTag: 'insert',
					tinyMCEConfig : {
						entity_encoding : 'numeric',
						paste_word_valid_elements: '@[id],p,br',
						paste_as_text: false,
						paste_preprocess: function(plugin,args) {	
							if (args.target.bloomLanguage) {
								var s = args.content;
								s = s.replace(/(<p>)/g,'<p class="lang-' + args.target.bloomLanguage + '" lang="' + args.target.bloomLanguage + '">');
								args.content = s;
							}
						}

						 //,
						// paste_webkit_styles: ''
					}
				});

		// me.on('focus', function(cmp, ed) {
		// console.log('tinyeditor focus', cmp.languages.split(','));
		// cmp.setBloomLanguages(cmp.languages.split(','));
		// });

		me.callParent(arguments);
	},

	/**
	 * Methods and Properties required for the NFLCIME, "bloom" plugin
	 * (this.plugin_bloom)
	 * 
	 */
	plugin_bloom : false,
	/* default language, otherwise defaults to first item in languages array */
	defaultLanguage : "eng",
	/* csv list of languages */
	languages : "",
	// private
	bloom : {
		languages : "",
		default_language : false,
		services : "kb,cvt,rt",
		css : './css/styles.css',
		Modules : [{
					id : 'pers.cookie',
					activate : true
				}, {
					id : 'ui.iframe',
					activate : true
				}, {
					id : 'editor.tinymce',
					activate : true
				}, {
					id : 'rt.scrube',
					activate : true
				}, {
					id : 'lang',
					activate : true
				}],
		UIModules : [{
					id : 'ui.trace',
					url : 'xtra.ui.trace.html',
					options : {
						hAlign : 'right',
						vAlign : 'top',
						width : 400,
						height : 500
					}
				}]
	},

	/**
	 * This is not yet working.  Need to be able to set field default after the appropriate store data has loaded.
	 * see: CIT/app/controller/SourceMaterialDetail.js > onTinyEditorReady
	 * @param {} lang
	 */
	setDefaultLanguage : function(lang) {
		
		if (this.plugin_bloom && typeof lang === 'string' && lang.length === 3) {
			this.defaultLanguage = lang;
			var ed = tinymce.get(this.textarea.getInputId());
			if (ed) {
				if (this.textarea.getValue() == "") {
					// set default paragraph
					
					ed.fire('defaultlanguagechange', {
						language: lang,
						editor: ed
					});

				}

			}
		}
	},

	setBloomLanguages : function(langs) {

		if (this.plugin_bloom && langs.length > 0) {
			
			if (typeof langs === 'object')
				this.languages = langs.join(',');
			else
				this.languages = langs;

			var ed = tinymce.get(this.textarea.getInputId());
			
			// uncomment and use to test various languages:
			//langs = langs + ",zho";

			if (ed) {

				ed.fire('setBloomLanguages', {
					langs: langs,
					editor: ed
				});
			}
		} 
	},

	afterRender : function() {
		var me = this;

		me.callParent(arguments);

		if (me.plugin_bloom) {
			me.textarea.getEl().dom.setAttribute('NFLCIME', "kb,cvt,rt")
		}
	},

	/**
	 * Methods & Properties for use with the XmlDocStore (an Ext.TreeStore
	 * extension) for editing XML documents
	 */
	xpath : '',

	getXPath : function(arguments) {
		return this.textarea.getXPath(arguments);
	},

	setNodeValue : function() {
		return this.textarea.setNodeValue(arguments);
	}
});