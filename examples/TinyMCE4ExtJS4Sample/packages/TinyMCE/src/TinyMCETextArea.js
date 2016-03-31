/*jshint bitwise:true, curly:true, eqeqeq:true, forin:true, noarg:true, noempty:true, nonew:true, undef:true, browser:true */
/*global Ext, tinymce, tinyMCE */

/*-------------------------------------------------------------------
 Ext.ux.form.TinyMCETextArea

 ExtJS form field - a text area with integrated TinyMCE WYSIWYG Editor

 Version: 4.1
 Release date: 04.03.2014
 ExtJS Version: 4.2.1+
 TinyMCE Version: 4.0.18
 License: LGPL v2.1 or later, Sencha License

 Author: Oleg Schildt
 E-Mail: Oleg.Schildt@gmail.com

 Copyright (c) 2013 Oleg Schildt

 Enhanced by Steve Drucker to support in-line editing mode, 
 add config properties for plugins and features. Also supports 
 plugin for Sencha Architect.
 E-Mail: sdrucker@figleaf.com

 Following issues are covered:

 - Initialization in an initially visible and in an initially invisible tab.
 - Correct place occupation by the initialization in any ExtJS layout.
 - Correct resizing by the resizing of the underlying text area.
 - Activation and deactivation of the WYSIWYG editor.
 - Enabling and disabling of the WYSIWYG editor control.
 - ReadOnly state support.
 - Changing of WYSIWYG settings and CSS file for the editable contents on the fly.
 - Pre-formatting of the HTML text in visible and invisible modus.
 - Focusing of the WYSIWYG editor control.
 - Marking invalid.
 - Tracking dirty state.
 - Storing and restoring cursor position by inserting of a place holder over a popup window.

Addition of inline mode and support for Univ. of MD Bloom Multilingual Toolset
By Steve Drucker
 -------------------------------------------------------------------*/

function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

Ext.define('Ext.ux.form.TinyMCETextArea', {

    extend: 'Ext.container.Container',
    // mixins: ['Ext.form.field.Field'],
    alias: ['widget.tinymce_textarea', 'widget.tinymce_field'],

    //-----------------------------------------------------------------

    /*
     Flag for tracking the initialization state
     */

    wysiwygIntialized: false,
    intializationInProgress: false,

    lastHeight: null,
    lastFrameHeight: null,
    defaultLanguage: null,

    /*
     This properties enables starting without WYSIWYG editor.
     The user can activate it later if he wants.
     */
    noWysiwyg: false,

    margin: '0 0 35 0', // size adjustment


    // enables inline (contenteditable) editing
    inline: false,

    /*
        textarea configs
        */

    allowBlank: false,
    value: '',
    fieldLabel: '',
    labelAlign: 'left',
    labelWidth: 100,


    //private 
    textarea: null,
    editableRegion: null,

    qtip: '', // tooltip

    toolbar: [], // toolbar def

    /*
        Config object for the TinyMCE configuration options
        */


    tinyMCEConfig: {},

    plugin_advlist: false,
    plugin_anchor: false,
    plugin_autolink: false,
    plugin_autoresize: false,
    plugin_autosave: false,
    plugin_bbcode: false,
    plugin_charmap: false,
    plugin_code: true,
    plugin_compat3x: false,
    plugin_contextmenu: false,
    plugin_directionality: false,
    plugin_emoticons: false,
    plugin_fullpage: false,
    plugin_fullscreen: false,
    plugin_hr: false,
    plugin_image: false,
    plugin_insertdatetime: false,
    plugin_legacyoutput: false,
    plugin_link: false,
    plugin_lists: false,
    plugin_importcss: false,
    plugin_media: false,
    plugin_nonbreaking: false,
    plugin_noneditable: false,
    plugin_pagebreak: false,
    plugin_paste: true,
    plugin_preview: false,
    plugin_print: false,
    plugin_save: false,
    plugin_searchreplace: false,
    plugin_spellchecker: false,
    plugin_table: false,
    plugin_textcolor: false,
    plugin_visualblocks: true,
    plugin_visualchars: false,
    plugin_wordcount: false,
    plugin_ice: true,
    plugin_icesearchreplace: false,

    hideToolbarsOnBlur: true,
    statusbar: false,
    showFormattingToolbar: true,
    showEditorMenu: false,
    showCustomMenu: false,

    browserSpellCheck: true,

    font_formats: 'Arial Unicode MS,Arial,helvetica,sans-serif;',

    formattingToolbar: "undo redo | bold italic | strikethrough | charmap | code | ",

    validateOnChange: true,

    // ice specific
    iceUserName: 'anonymous',
    iceUserId: 0,

    /*
        customMenu: {
            edit: {
                title: 'Edit',
                items: 'undo redo | cut copy paste | selectall'
            },
            insert: {
                title: 'Insert',
                items: '|'
            },
            view: {
                title: 'View',
                items: 'visualaid'
            },
            format: {
                title: 'Format',
                items: 'bold italic underline strikethrough superscript subscript | formats | removeformat'
            }
        },
        */

    image_list: [],



    //-----------------------------------------------------------------

    //-----------------------------------------------------------------

    onTextAreaChange: function(cmp) {
        // if internal textarea changes, need to update related wysiwyg
        //alert('textarea changed');

        var ed = tinymce.get(cmp.getInputId());
        if (ed) {
            ed.load();
        }
    },



    initComponent: function() {

        var me = this;

        if (!me.name) {
            me.name = me.id;
        }


        var textfieldConfig = {
            xtype: 'textareafield',
            allowBlank: me.allowBlank,
            name: me.name,
            // escOnSerialize: true,
            fieldLabel: me.fieldLabel,
            labelWidth: me.labelWidth,
            labelAlign: me.labelAlign,
            listeners: {
                change: {
                    fn: me.onTextAreaChange,
                    scope: this
                }
            }
        }

        if (!Ext.isEmpty(me.xpath)) {
            textfieldConfig.xpath = me.xpath;
        }

        if (!Ext.isEmpty(me.value)) {
            textfieldConfig.value = me.value;
        }

        if (!me.inline) {

            Ext.apply(me, {
                layout: 'fit',
                items: [textfieldConfig]
            });

        } else {

            Ext.apply(this, {
                layout: 'fit',
                items: [{
                    xtype: 'fieldcontainer',
                    html: me.value,
                    id: me.id + "-er",
                    fieldLabel: me.fieldLabel,
                    labelAlign: me.labelAlign
                }, {
                    xtype: 'textareafield',
                    hidden: true,
                    value: me.value,
                    name: me.name,
                    xpath: me.xpath
                }]
            });

        }


        me.callParent(arguments);

        if (me.inline)
            me.editableRegion = this.down('#' + me.id + "-er");

        me.textarea = this.down('textarea');

        if (!me.plugin_wordcount) {

            if (me.hideToolbar || me.hideToolbarsOnBlur) { // only active if bloom plugin running

                /*
                * might consider putting in a semaphore 
                * in some future version
                * to deal with simultaneous instantiation
                * of IME plugin
                *
                me.on('editorready', function(cmp, ed) {
                    // alert('editorready');
                   
                     me.fireEvent('blur', cmp, ed, {
                         delay: 500
                     });
                   
                   console.log('attaching focus/blur handler', cmp, ed);


                });
                */

                me.on('focus', function(cmp, ed) {
                    // console.log('focus on', cmp);
                    var toolbarEl = Ext.get(cmp.getEl().select('.mce-toolbar-grp').elements[0]);
                    toolbarEl.setVisibilityMode(Ext.Element.DISPLAY);
                    toolbarEl.show(false);

                    var footerEl = Ext.get(cmp.getEl().select('.mce-statusbar'));
                    if (footerEl.elements.length > 0) {
                        footerEl = footerEl.elements[0];
                        footerEl.setVisibilityMode(Ext.Element.DISPLAY);
                        footerEl.show(false);
                    }

                    if (cmp.getHeight() > 0) {
                        cmp.syncEditorHeight(cmp.getHeight());
                    }

                    //not sure if this is needed here

                    cmp.setBloomLanguages(cmp.languages);
                    me.validate();

                });

                me.on('blur', function(cmp, ed) {
                    // console.log('firing blur on', cmp);
                    var toolbarEl = Ext.get(cmp.getEl().select('.mce-toolbar-grp').elements[0]);
                    toolbarEl.setVisibilityMode(Ext.Element.DISPLAY);
                    toolbarEl.hide(false);

                    var footerEl = Ext.get(cmp.getEl().select('.mce-statusbar'));

                    if (footerEl.elements.length > 0) {
                        footerEl = Ext.get(footerEl.elements[0]);
                        footerEl.setVisibilityMode(Ext.Element.DISPLAY);
                        footerEl.hide(false);
                    }
                    if (cmp.getHeight() > 0) {
                        cmp.syncEditorHeight(cmp.getHeight());
                    }

                });

            }
        }

    },

    validate: function() {
        // add a red border if the field doesn't validate
        var isValid = this.textarea.validate();
        var edEl = Ext.get(this.getEl().select('td').elements[1]);

        if (edEl) {
            edEl.removeCls('errorBorder');
            if (!isValid) {
                edEl.addCls('errorBorder');
            }
        }
        return isValid;
    },

    //-----------------------------------------------------------------
    afterRender: function() {
        var me = this;


        me.callParent(arguments);

        if (!Ext.isEmpty(me.qtip)) {
            Ext.create('Ext.tip.ToolTip', {
                target: me.getEl(),
                html: me.qtip
            });
        }

        me.on('blur', function(elm, ev, eOpts) {

            var ctrl = document.getElementById(me.textarea.getInputId());

            if (me.wysiwygIntialized) {
                var ed = tinymce.get(me.textarea.getInputId());

                // In the HTML text modus, the contents should be
                // synchronized upon the blur event.
                if (ed && ed.isHidden()) {
                    if (ctrl) {
                        me.positionBeforeBlur = {
                            start: ctrl.selectionStart,
                            end: ctrl.selectionEnd
                        };
                    }

                    ed.load();
                }
            } else {
                if (ctrl) {
                    me.positionBeforeBlur = {
                        start: ctrl.selectionStart,
                        end: ctrl.selectionEnd
                    };
                }
            }
        }, me);


        me.on('resize', function(elm, width, height, oldWidth, oldHeight, eOpts) {
            if (!me.noWysiwyg && !me.wysiwygIntialized) {
                me.initEditor(height);
            } else {
                me.syncEditorHeight(height);
            }
        }, me);


    },
    //-----------------------------------------------------------------
    syncEditorHeight: function(height) {


        var me = this;

        if (me.inline)
            return;

        me.lastHeight = height;

        if (!me.wysiwygIntialized || !me.rendered) {
            return;
        }

        var ed = tinymce.get(me.textarea.getInputId());

        // if the editor is hidden, we do not syncronize
        // because the size values of the hidden editor
        // are calculated wrong.

        if (!ed || ed.isHidden()) {
            return;
        }

        var edIframe = Ext.get(me.textarea.getInputId() + "_ifr");

        var parent = edIframe.up(".mce-edit-area");
        parent = parent.up(".mce-container-body");

        var newHeight = height;

        var edToolbar = parent.down(".mce-toolbar-grp");
        if (edToolbar)
            newHeight -= edToolbar.getHeight();

        var edMenubar = parent.down(".mce-menubar");
        if (edMenubar)
            newHeight -= edMenubar.getHeight();

        var edStatusbar = parent.down(".mce-statusbar");
        if (edStatusbar)
            newHeight -= edStatusbar.getHeight();

        me.lastFrameHeight = newHeight - 3;

        edIframe.setHeight(newHeight - 3);

        return newHeight - 3;
    },
    //-----------------------------------------------------------------
    initEditor: function(height) {

        var me = this;

        if (me.noWysiwyg || me.intializationInProgress || me.wysiwygIntialized) {
            return;
        }

        me.intializationInProgress = true;

        if (!me.tinyMCEConfig) {
            me.tinyMCEConfig = {};
        } else {
            // We need clone, not reference.
            // The configuration of the wysiwyg might be passed as an object to
            // many editor instances. Through cloning, we prevent
            // side effects on other editors upon internal modifications
            // of the tinyMCEConfig
            var tmp_cfg = me.tinyMCEConfig;
            me.tinyMCEConfig = {};
            Ext.Object.merge(me.tinyMCEConfig, tmp_cfg);
        }

        me.tinyMCEConfig.mode = "exact";
        me.tinyMCEConfig.resize = false;

        // me.tinyMCEConfig.elements = me.textarea.getInputId();

        if (me.inline) {
            me.tinyMCEConfig.selector = "#" + me.editableRegion.getEl().id + "-innerCt";
        } else {
            me.tinyMCEConfig.selector = 'textarea#' + me.textarea.getInputId();
        }

        if (me.lastFrameHeight) {
            me.tinyMCEConfig.height = me.lastFrameHeight;
        } else {
            me.tinyMCEConfig.height = 30;
        }

        if (me.readOnly) {
            me.tinyMCEConfig.readonly = true;
        }

        if (me.isDisabled()) {
            me.tinyMCEConfig.readonly = true;
        }

        // This provides that the editor get focus 
        // by click on the label

        if (me.labelEl) {
            me.labelEl.on('click', function(ev, elm, opts) {
                me.focus(false);
            }, me.labelEl);
        }

        // We have to override the setup method of the TinyMCE.
        // If the user has define own one, we shall not loose it.
        // Store it and call it after our specific actions.
        var user_setup = null;

        if (me.tinyMCEConfig.setup) {
            user_setup = me.tinyMCEConfig.setup;
        }

        // BEGIN: setup
        me.tinyMCEConfig.setup = function(ed) {

            me.ed = ed;


            ed.on('init', function(e) {
                me.wysiwygIntialized = true;
                me.intializationInProgress = false;

                // This piece of code solves the problem of change propagation so that
                // there is no need to call triggerSave

                var setContent = ed.setContent;
                ed.setContent = function() {
                    setContent.apply(ed, arguments);
                    ed.fire('change', {});
                };

                if (height) {
                    // setTimeout is a hack. The problem is that the editor
                    // it not realle ready, when init fires.
                    setTimeout(function() {
                        me.syncEditorHeight(height);
                    }, 200);
                }


            });

            // Catch and propagate the change event 

            ed.on('change', function(e) {
                var oldval = me.textarea.getValue();
                var newval = ed.getContent();

                // this is going to set value of underlying textfield,
                // but the Ext component won't register the change
                // console.log('change',new Date());
                ed.save();

                if (me.inline) {
                    me.textarea.setValue(newval);
                } else {
                    me.textarea.fireEvent('dirtychange', me.textarea, true);
                }

                me.fireEvent('change', me, newval, oldval, {});

                if (me.validateOnChange) {
                    me.validate();
                }
            });

            me.ed = ed;

            // fire focus and blur back to Ext Component
            ed.on('focus', function __focus__(e) {
                //debugger;
                var cmp = e.target.settings.extClass;
                cmp.fireEvent('focus', cmp, e.target);

                // This ensures that the focusing the editor
                // bring the parent window to front
                var w = me.findParentByType('window');
                if (w) w.toFront(true);

                // console.log('editorfocus');
            });

            ed.on('blur', function __blur__(e) {

                var cmp = e.target.settings.extClass;
                cmp.fireEvent('blur', cmp, e.target);
                // console.log('editorblur');
            });

            ed.on('postrender', function(e) {
                var cmp = e.target.settings.extClass;
                // debugger;
                cmp.fireEvent('editorready', cmp, e.target);
            });


           


            ed.on('LoadContent', function(e) {
                
            });

            if (user_setup) {
                user_setup(ed);
            }

        };
        // END: setup


        // added more helper configs by sdd
        var plugins = [];
        for (var i in me) {
            if (i.indexOf('plugin_') == 0) {
                if (me[i])
                    plugins.push(i.substring(7));
            }
        }

        // support directionality rtl/ltr

        if (Ext.Array.contains(plugins, "directionality")) {
            if (me.showFormattingToolbar) {
                me.formattingToolbar += " | ltr rtl ";
            } else {
                me.toolbar.push("ltr");
                me.toolbar.push("rtl");
            }

        }

        // emoticon support
        if (Ext.Array.contains(plugins, "emoticons")) {
            me.toolbar.push("emoticons");
        }

        if (Ext.Array.contains(plugins, "fullpage")) {
            me.toolbar.push("fullpage");
        }

        if (Ext.Array.contains(plugins, "fullscreen")) {
            me.toolbar.push("fullscreen");
        }

        if (Ext.Array.contains(plugins, "insertdatetime")) {
            me.toolbar.push("insertdatetime");
        }

        if (Ext.Array.contains(plugins, "nonbreaking")) {
            me.toolbar.push("nonbreaking");
            Ext.applyIf(me.tinyMCEConfig, {
                nonbreaking_force_tab: true
            });
        }

        if (Ext.Array.contains(plugins, "noneditable")) {
            Ext.applyIf(me.tinyMCEConfig, {
                nonbreaking_leave_contenteditable: true
            });
        }

        if (Ext.Array.contains(plugins, "pagebreak")) {
            Ext.applyIf(me.tinyMCEConfig, {
                pagebreak_separator: "<br style='page-break-after:always'>"
            });
        }

        if (Ext.Array.contains(plugins, "paste")) {
           
            Ext.apply(me.tinyMCEConfig, {
                paste_as_text: true,
                paste_word_valid_elements: "ul,li,p",
                extended_valid_elements : "p[*],span[*],insert[*],delete[*]",
                paste_preprocess: function(plugin, args) {
                  // args.target.bloomLanguage
                  // args.content
                  //  debugger;
                  if (args.target.bloomLanguage) {
                    args.content = args.content.replace(new RegExp(escapeRegExp('<p>'),'g'),'<p class="lang-' + args.target.bloomLanguage + '" lang="' + args.target.bloomLanguage + '">');
                  }
                }
            });
        }

        if (Ext.Array.contains(plugins, "preview")) {
            me.toolbar.push("preview");
        }

        if (Ext.Array.contains(plugins, "print")) {
            me.toolbar.push("print");
        }

        if (Ext.Array.contains(plugins, "save")) {
            me.toolbar.push("save");
        }

        if (Ext.Array.contains(plugins, "searchreplace")) {
            me.toolbar.push("searchreplace");
        }

        if (Ext.Array.contains(plugins, "table")) {
            Ext.applyIf(me.tinyMCEConfig, {
                tools: "inserttable"
            });
        }

        if (Ext.Array.contains(plugins, "textcolor")) {
            me.toolbar.push("forecolor backcolor");
        }

        if (Ext.Array.contains(plugins, "visualchars")) {
            me.toolbar.push("visualchars");
        }

        if (Ext.Array.contains(plugins, "visualblocks")) {
            // me.toolbar.push("visualblocks");
            me.formattingToolbar += " visualblocks ";
        }

        if (Ext.Array.contains(plugins, "wordcount")) {
            me.statusbar = true;
        }

        if (Ext.Array.contains(plugins, "bloom")) {
            me.bloom.defaultLanguage = this.defaultLanguage;
            Ext.applyIf(me.tinyMCEConfig, {
                bloom: me.bloom
            });
            if (me.showFormattingToolbar) {
                me.formattingToolbar += " | bloomlanguagebutton bloomlanguageenablebutton bloomlanguageselectblockbutton bloomcharmapbutton";
            } else {
                me.toolbar.push('bloomlanguagebutton bloomlanguageenablebutton bloomlanguageselectblockbutton bloomcharmapbutton');
            }
        }


        // ice version control plugin

        if (Ext.Array.contains(plugins, "ice")) {

            var iceToolbar = "ice_togglechanges,ice_toggleshowchanges,iceacceptall,icerejectall,iceaccept,icereject";

            if (me.cssUrls) {

                me.cssUrls+=',ice.css';
            } else {
                me.cssUrls=',ice.css';
            }

            Ext.apply(me.tinyMCEConfig, {
                ice: {
                    isTracking: false,
                    user: {
                        name: me.iceUserName,
                        id: me.iceUserId
                    },
                    preserveOnPaste: 'p,a[href],i,em,b,span',
                    deleteTag: 'delete',
                    insertTag: 'insert'
                },
                extended_valid_elements: "p[*],span[*],delete[*],insert[*]"
            });

            if (me.showFormattingToolbar) {
                me.formattingToolbar += " | ice_togglechanges ice_toggleshowchanges iceacceptall icerejectall iceaccept icereject";
            } else {
                me.toolbar.push(' | ice_togglechanges ice_toggleshowchanges iceacceptall icerejectall iceaccept icereject');
            }

            /*
                if (!me.tinyMCEConfig.toolbar1) {
                    me.tinyMCEConfig.toolbar1 = iceToolbar;
                } else if (!me.tinyMCEConfig.toolbar2) {
                    me.tinyMCEConfig.toolbar2 = iceToolbar;
                } else {
                    me.tinyMCEConfig.toolbar3 = iceToolbar;
                }
                */

        }

        /*
                Apply Toolbars
            */

        if (me.showFormattingToolbar) {
            Ext.apply(me.tinyMCEConfig, {
                toolbar1: me.formattingToolbar
            });
        }

        if (me.toolbar.length > 0) {
            if (me.showFormattingToolbar) {
                Ext.applyIf(me.tinyMCEConfig, {
                    toolbar2: me.toolbar.join(' ')
                });
            } else {
                Ext.applyIf(me.tinyMCEConfig, {
                    toolbar1: me.toolbar.join(' ')
                });
            }
        }



        if (me.showEditorMenu) {
            Ext.applyIf(me.tinyMCEConfig, {
                menubar: true
            });
        } else {
            Ext.applyIf(me.tinyMCEConfig, {
                menubar: false
            });
        }

        if (me.showCustomMenu) {
            Ext.applyIf(me.tinyMCEConfig, {
                menubar: true,
                menu: me.editorMenu
            });
        }

        if (me.cssUrls) {
            Ext.applyIf(me.tinyMCEConfig, {
                content_css: me.cssUrls
            });
        }

        // console.log('plugins', plugins);
        Ext.apply(me.tinyMCEConfig, {
            image_list: me.image_list,
            plugins: plugins.join(' '),
            font_formats: me.font_formats,
            statusbar: me.statusbar,
            browser_spellcheck: me.browserSpellCheck,
            inline: me.inline,
            extClass: this
        });


        // console.log(me.tinyMCEConfig);
        tinymce.init(me.tinyMCEConfig);
        console.log(me.tinyMCEConfig);



        me.intializationInProgress = false;
        me.wysiwygIntialized = true;
    },
    //-----------------------------------------------------------------
    getEditor: function() {
        var me = this;
    },
    //-----------------------------------------------------------------
    isEditorHidden: function() {
        var me = this;

        if (!me.wysiwygIntialized) {
            return true;
        }

        var ed = tinymce.get(me.textarea.getInputId());
        if (!ed) {
            return true;
        }

        return ed.isHidden();
    },
    //-----------------------------------------------------------------
    showEditor: function() {
        var me = this;

        me.storedCursorPosition = null;

        if (!me.wysiwygIntialized) {
            me.noWysiwyg = false;
            me.initEditor(me.getHeight());
            return;
        }

        var ed = tinymce.get(me.textarea.getInputId());
        if (!ed) {
            return;
        }

        ed.show();

        ed.nodeChanged();

        if (me.lastHeight) {
            me.syncEditorHeight(me.lastHeight);
        }

        me.focus();
    },
    //-----------------------------------------------------------------
    hideEditor: function() {
        var me = this;

        if (!me.wysiwygIntialized) {
            return;
        }

        var ed = tinymce.get(me.textarea.getInputId());
        if (!ed) {
            return;
        }

        var node = ed.selection.getNode();

        if (!node || node.nodeName === "#document" || node.nodeName === "BODY" || node.nodeName === "body") {
            ed.hide();

            return;
        }

        // otherwise try to position the cursor

        var marker = '<a id="_____sys__11223___"></a>';
        ed.selection.collapse(true);
        ed.execCommand('mceInsertContent', 0, marker);

        ed.hide();

        var ctrl = document.getElementById(me.textarea.getInputId());

        var pos = -1;
        var txt = "";

        if (ctrl) {
            txt = ctrl.value;
            pos = txt.indexOf(marker);
        }

        if (pos !== -1) {
            var re = new RegExp(marker, "g");
            txt = txt.replace(re, "");
            ctrl.value = txt;

            if (ctrl.setSelectionRange) {
                ctrl.focus();
                ctrl.setSelectionRange(pos, pos);
            }
        }
    },
    //-----------------------------------------------------------------
    toggleEditor: function() {
        var me = this;

        if (!me.wysiwygIntialized) {
            me.showEditor();
            return;
        }

        var ed = tinymce.get(me.textarea.getInputId());

        if (ed.isHidden()) {
            me.showEditor();
        } else {
            me.hideEditor();
        }
    },
    //-----------------------------------------------------------------
    removeEditor: function() {
        var me = this;

        if (me.intializationInProgress) {
            return me;
        }

        if (!me.wysiwygIntialized) {
            return me;
        }

        var ed = tinymce.get(me.textarea.getInputId());
        if (ed) {
            ed.save();
            ed.destroy(false);
        }

        me.wysiwygIntialized = false;

        return me;
    }, //removeEditor
    //-----------------------------------------------------------------
    // Sometimes, the editor should be reinitilized on the fly, e.g.
    // if the body css has been changed (in a CMS the user changed
    // the design template of a page opened in the editor).
    // This method removes the editor from the textarea, adds the
    // changed properties to the base config object and initializes
    // the editor again.
    //-----------------------------------------------------------------
    reinitEditor: function(cfg) {
        var me = this;

        if (me.noWysiwyg || me.intializationInProgress) {
            return me;
        }

        if (!me.tinyMCEConfig) {
            me.tinyMCEConfig = {};
        }
        if (!cfg) {
            cfg = {};
        }


        Ext.apply(me.tinyMCEConfig, cfg);

        if (!me.wysiwygIntialized) {
            return me;
        }

        var hidden = true;

        var ed = tinymce.get(me.textarea.getInputId());
        if (ed) {
            hidden = ed.isHidden();
            ed.save();
            ed.destroy(false);
        }

        me.wysiwygIntialized = false;

        if (!hidden) {
            me.initEditor(me.getHeight());
        }

        return me;
    },
    //-----------------------------------------------------------------
    setValue: function(v) {
        var me = this;

        // var res = me.callParent(arguments);


        if (me.inline) {
            me.editableRegion.update(v);
        }

        var res = me.textarea.setValue(v);

        if (me.wysiwygIntialized) {
            // The editor does some preformatting of the HTML text
            // entered by the user.
            // The method setValue sets the value of the textarea.
            // We have to load the text into editor for the
            // preformatting and then to save it back to the textarea.

            var ed = tinymce.get(me.textarea.getInputId());
            if (ed) {
                ed.load();
                ed.save();
            }
        }

        me.validate();

        return res;
    },

    //-----------------------------------------------------------------

    getValue: function() {
        var me = this;
        return me.textarea.getValue();
    },


    //-----------------------------------------------------------------
    focus: function(selectText, delay) {
        var me = this;

        if (me.isDisabled()) {
            return me;
        }

        if (delay) {
            if (isNaN(delay)) {
                delay = 10;
            }

            setTimeout(function() {
                me.focus.call(me, selectText, false);
            }, delay);
            return me;
        }

        if (!me.wysiwygIntialized) {
            return me.callParent(arguments);
        }

        var ed = tinymce.get(me.textarea.getInputId());

        if (ed && !ed.isHidden()) {
            me.callParent(arguments);

            ed.focus();
        } else {
            return me.callParent(arguments);
        }

        return me;
    },
    //-----------------------------------------------------------------
    enable: function(silent) {
        var me = this;
        var result = me.callParent(arguments);

        if (!result) {
            return result;
        }

        if (me.tinyMCEConfig.readonly) {

            me.reinitEditor({
                readonly: false
            });
        }

        return result;
    },
    //-----------------------------------------------------------------
    disable: function(silent) {
        var me = this;
        var result = me.callParent(arguments);

        if (!result) {
            return result;
        }

        if (!me.tinyMCEConfig.readonly) {
            me.reinitEditor({
                readonly: true
            });
        }

        return result;
    },
    //-----------------------------------------------------------------
    setReadOnly: function(readOnly) {
        var me = this;

        var result = me.callParent(arguments);

        if (readOnly !== me.tinyMCEConfig.readonly) {
            me.reinitEditor({
                readonly: readOnly
            });
        }

        return result;
    }, // setReadOnly
    //-----------------------------------------------------------------
    storeCurrentSelection: function() {
        var me = this;

        var wwg_mode = false;

        var ed = tinymce.get(me.textarea.getInputId());

        if (me.wysiwygIntialized) {
            if (ed && !ed.isHidden()) {
                wwg_mode = true;
            }
        }

        var ctrl = document.getElementById(me.textarea.getInputId());

        if (wwg_mode) {
            me.storedCursorPosition = ed.selection.getBookmark('simple');
        } else if (ctrl) {
            me.storedCursorPosition = me.positionBeforeBlur;
        }
    }, // storeCurrentSelection
    //-----------------------------------------------------------------
    restoreCurrentSelection: function() {
        var me = this;

        if (!me.storedCursorPosition) {
            return;
        }

        var wwg_mode = false;

        var ed = tinymce.get(me.textarea.getInputId());

        if (me.wysiwygIntialized) {
            if (ed && !ed.isHidden()) {
                wwg_mode = true;
            }
        }

        var ctrl = document.getElementById(me.textarea.getInputId());

        if (wwg_mode) {
            ed.selection.moveToBookmark(me.storedCursorPosition);
        } else if (ctrl) {
            ctrl.setSelectionRange(me.storedCursorPosition.start, me.storedCursorPosition.end);
        }
    }, // restoreCurrentSelection
    //-----------------------------------------------------------------
    insertText: function(txt) {
        var me = this;

        var wwg_mode = false;

        var ed = tinymce.get(me.textarea.getInputId());

        if (me.wysiwygIntialized) {
            if (ed && !ed.isHidden()) {
                wwg_mode = true;
            }
        }

        var ctrl = document.getElementById(me.textarea.getInputId());

        if (wwg_mode) {
            ed.focus();
            ed.execCommand('mceInsertContent', 0, txt);
        } else if (ctrl) {
            ctrl.focus();

            var start = ctrl.selectionStart + txt.length;

            ctrl.value = ctrl.value.slice(0, ctrl.selectionStart) + txt + ctrl.value.slice(ctrl.selectionEnd);

            ctrl.setSelectionRange(start, start);
        }
    }, // insertText
    //-----------------------------------------------------------------
    beforeDestroy: function() {
        var me = this;

        var ed = tinymce.get(me.textarea.getInputId());

        if (ed) ed.destroy(false);
    },
    //-----------------------------------------------------------------
    renderActiveError: function() {

        var me = this,
            activeError = me.getActiveError(),
            hasError = !!activeError;

        var edIframe = Ext.get(me.textarea.getInputId() + "_ifr");
        if (!edIframe) {
            return me.callParent(arguments);
        }

        var ed = tinymce.get(me.textarea.getInputId());
        if (!ed) {
            return me.callParent(arguments);
        }

        var parent = edIframe.up(".mce-edit-area");
        parent = parent.up(".mce-container-body");

        if (!parent) {
            return me.callParent(arguments);
        }

        parent = parent.up(".mce-tinymce");

        if (!parent) {
            return me.callParent(arguments);
        }

        if (me.rendered && !me.isDestroyed && !me.preventMark) {

            var evHandler = function(args) {
                me.clearInvalid();
            };

            // Add/remove invalid class
            if (hasError) {
                parent.addCls('tinymce-error-field');

                ed.on('keydown', evHandler);
                ed.on('change', evHandler);
            } else {
                parent.removeCls('tinymce-error-field');

                ed.off('keydown', evHandler);
                ed.off('change', evHandler);
            }
        }

        return me.callParent(arguments);
    },


    isDirty: function() {
        return this.textarea.isDirty();
    }

    //-----------------------------------------------------------------
});