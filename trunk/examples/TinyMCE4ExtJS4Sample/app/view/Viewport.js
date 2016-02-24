Ext.define('TinyMCE4Sample.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.layout.container.Fit',
        'TinyMCE4Sample.view.Main'
    ],

    layout: {
        type: 'fit'
    },

    items: [{
        xtype: 'app-main'
    }]
});
