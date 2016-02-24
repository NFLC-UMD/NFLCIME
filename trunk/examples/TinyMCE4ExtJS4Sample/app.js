/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when upgrading.
*/

Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.ux.form.TinyMCETextArea': 'packages/TinyMCE/src/TinyMCETextArea.js',
        'Ext.ux.form.TinyRTEditor' : 'packages/TinyMCE/src/TinyRTEditor.js'
    }
});

Ext.application({
    name: 'TinyMCE4Sample',

    extend: 'TinyMCE4Sample.Application',
    
    autoCreateViewport: true
});
