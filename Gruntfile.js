module.exports = function(grunt) {
  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          // target.css file: source.less file
          "css/main.css": "less/app.less",
          "css/themes/blackboard.css": "less/themes/blackboard.less",
          "css/themes/whiteboard.css": "less/themes/whiteboard.less",
          "css/themes/gray.css": "less/themes/gray.less",
          "css/themes/dark.css": "less/themes/dark.less"
        }
      }
    },
    watch: {
      layout: {
        files: ['*.html', 'partials/*.html'],
        options: {
          livereload: true
        }
      },
      styles: {
        // Which files to watch (all .less files recursively in the less directory)
        files: ['less/**/*.less',],
        tasks: ['less'],
        options: {
          nospawn: true,
          livereload: true
        }
      }
    }
  });
 
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
};