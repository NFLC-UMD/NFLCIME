/**
 * editor_plugin_src.js
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * Contributing: http://tinymce.moxiecode.com/contributing
 */
(function() {
	tinymce.create('tinymce.plugins.BloomPlugin', {
		/**
		 * Initializes the plugin, this will be executed after the plugin has been created.
		 * This call is done before the editor instance has finished it's initialization so use the onInit event
		 * of the editor instance to intercept that event.
		 *
		 * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
		 * @param {string} url Absolute URL to where the plugin is located.
		 */
		init : function(ed, url) {
			 var bloom_init_params = ed.getParam('bloom'),
			 css_loc = bloom_init_params.css,
			 init_modules = bloom_init_params.Modules;
			 ed.onLanguageSelected = new tinymce.util.Dispatcher(this);
			 ed.onLanguageChange = new tinymce.util.Dispatcher(this);
			
			if(NFLCIME){
				tinymce.each(init_modules, function(m){
					NFLCIME.dispatchEvent({type:'ModuleLoad', moduleId:m.id, activate:m.activate, compressed:m.compressed});
				});
			}else{
				NFLCIME = (window.NFCLIME || {});
				tinymce.extend(NFLCIME,{init_modules : bloom_init_params});
			};

			ed.onPostRender.add(function(mgr) {
				ed.dom.loadCSS(css_loc.indexOf('://') > 0 ? css_loc : (url + '/' + css_loc));
			});
			
			ed.onLanguageChange.add(function(lang) {
				this.list.select(lang.lang+','+lang.dir);
			});
		},

		/**
		 * Creates control instances based in the incomming name. This method is normally not
		 * needed since the addButton method of the tinymce.Editor class is a more easy way of adding buttons
		 * but you sometimes need to create more complex controls like listboxes, split buttons etc then this
		 * method can be used to create those.
		 *
		 * @param {String} n Name of the control to create.
		 * @param {tinymce.ControlManager} cm Control manager to use inorder to create new control.
		 * @return {tinymce.ui.Control} New control instance or null if no control was created.
		 */
		createControl : function(n, cm) {
			if(n == 'languageselect'){
				var ed = cm.editor,
				c = this.list = cm.createListBox('languageselect', {title : 'English', onselect : function(v,eda) {
					var cur=c.items[c.selectedIndex], editor=this.scope;
					if ((cur && v !== cur) || !cur) {
						lang = v.split(','),(lang.length>0)?lang=lang[0]:'';
						
						console.log('selected', lang);
						
						editor.onLanguageSelected.dispatch({language: lang, editor: editor});
						return
					};
				}});
				
				tinyMCE.each(ed.getParam('bloom').languages.split(';'), function(language) {
					language = language.split('=')
					if(language.length>1){
						c.add(language[0].substr(0,1).toUpperCase() + language[0].slice(1), language[1]);
					};
				});
	
				
				return c;
			};
				
			
			return null;
	
		},

		/**
		 * Returns information about the plugin as a name/value array.
		 * The current keys are longname, author, authorurl, infourl and version.
		 *
		 * @return {Object} Name/value array containing information about the plugin.
		 */
		getInfo : function() {
			return {
				longname : 'Bloom Language plugin',
				author : 'Bloom',
				version : "1.0"
			};
		}
	});

	// Register plugin
	tinymce.PluginManager.add('bloom', tinymce.plugins.BloomPlugin);
})();