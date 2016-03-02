# TinyMCE4Sample/app

This folder contains the javascript files for the application.

# TinyMCE4Sample/resources

This folder contains static resources (typically an `"images"` folder as well).

# TinyMCE4Sample/overrides

This folder contains override classes. All overrides in this folder will be 
automatically included in application builds if the target class of the override
is loaded.

# TinyMCE4Sample/sass/etc

This folder contains misc. support code for sass builds (global functions, 
mixins, etc.)

# TinyMCE4Sample/sass/src

This folder contains sass files defining css rules corresponding to classes
included in the application's javascript code build.  By default, files in this 
folder are mapped to the application's root namespace, 'TinyMCE4Sample'. The
namespace to which files in this directory are matched is controlled by the
app.sass.namespace property in TinyMCE4Sample/.sencha/app/sencha.cfg. 

# TinyMCE4Sample/sass/var

This folder contains sass files defining sass variables corresponding to classes
included in the application's javascript code build.  By default, files in this 
folder are mapped to the application's root namespace, 'TinyMCE4Sample'. The
namespace to which files in this directory are matched is controlled by the
app.sass.namespace property in TinyMCE4Sample/.sencha/app/sencha.cfg. 
