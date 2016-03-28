module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
          // 'nflcime/src/nflcime_f.js',
          'nflcime/nflcime.js',
         //  'nflcime/src/nflcime_f.js',
          'nflcime/src/pers.cookie.js',
          'nflcime/src/ui.iframe.js',
          'nflcime/src/cursor.js',
          'nflcime/src/kb.js',
          'nflcime/src/rt.js',
          'nflcime/src/rt.scrube.js',
          'nflcime/src/lang.js'
        ],
        dest: 'nflcime/nflcime-packed.js'
      }
    },
    uglify: {
    
      dist: {
        files: {
          'nflcime/nflcime-packed.min.js': ['nflcime/nflcime-packed.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['concat', 'uglify']);

};