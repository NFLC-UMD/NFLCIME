Ext.define('TinyMCE4Sample.view.Main', {
    extend: 'Ext.container.Container',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border',
        'Ext.form.Panel',
        'Ext.ux.form.TinyRTEditor'
    ],
    
    xtype: 'app-main',

    layout: {
        type: 'border'
    },

    items: [{
        region: 'west',
        xtype: 'panel',
        title: 'west',
        width: 150,
        html: 'This is an example of deploying a TinyMCE 4.x Editor with the NFLCIME and ICE plugins'
    },{
        region: 'center',
        xtype: 'form',
        layout: 'anchor',
        bodyPadding: 10,
        items:[
           {    
            xtype: 'tinyeditor',
            cssUrls : "../../NFLCIME/fontcss/langs.css",
            fieldLabel: 'Description',
            name: 'description',
            labelAlign: 'top',
            itemId: 'description',
            width: 800,
            height: 200,
            iceUserName: 'anonymous',
            languages : "en,arb,amh,sqi",
            plugin_bloom: true,
            plugin_ice: true,
            plugin_icesearchreplace: false,
            browserSpellCheck: true
          }
        ]
    }]
});