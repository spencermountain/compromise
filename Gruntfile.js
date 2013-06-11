module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
           banner: '/*! <%= pkg.name %> \n by @spencermountain\n <%= grunt.template.today("yyyy-mm-dd") %> */\n',
           footer:""
         },
      dist: {
        src: ['./lib/sentence.js',  './lib/singularize.js', './lib/data/*.js','./lib/blacklist.js',  './lib/recognizer.js', './lib/tokenizer.js', './lib/chunker.js', './lib/date_extractor.js', './lib/tagger.js'],
        dest: './nlp.js'
      }
    },
    uglify:{
      do:{
       src: ['./nlp.js'],
       dest: './client_side/nlp.min.js'
     }
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat','uglify']);

};

