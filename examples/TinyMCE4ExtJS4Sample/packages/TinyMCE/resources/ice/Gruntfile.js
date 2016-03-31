module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
         
          'lib/rangy/rangy-core.js',
          'src/polyfills.js',
          'src/ice.js',
          'src/dom.js',
          'src/icePlugin.js',
          'src/icePluginManager.js',
          'src/bookmark.js',
          'src/selection.js',
          'src/plugins/IceAddTitlePlugin/IceAddTitlePlugin.js',
          'src/plugins/IceCopyPastePlugin/IceCopyPastePlugin.js',
          'src/plugins/IceEmdashPlugin/IceEmdashPlugin.js',
          'src/plugins/IceSmartQuotesPlugin/IceSmartQuotesPlugin.js'
        ],
        dest: 'icesupport-packed.js'
      }
    },
    uglify: {
    
      dist: {
        files: {
          'icesupport.min.js': ['icesupport-packed.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['concat', 'uglify']);

};