Potential Improvements for NFLCIME
---------------------------------------

In order to make it easier to change the ui or add new langs, move the ui 
files into 2 php files.  Then when running from the web we can use an Apache
rewrite rule to map from the html files to php src files.  When running 
standalone, these files can be generated to the root level.

Additionally, the keyboard javascript mappings are mostly json.  So, if we remove the Javascript code and keep the mappings in .json files, then they can be consumed by php as well and used to generate both the keyboard javascript files and the html files.

Additionally, the langs.js file has the js obj with all language configurations.  If this was also kept in a separate .json file, it could be consumed by php as well and used by the bloom system to keep their language properties in sync.