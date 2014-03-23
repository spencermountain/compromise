module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),
    concat: {
      options: {
        banner: '/*! <%= pkg.name %> \n by @spencermountain\n <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        footer: ""
      },
      dist: {
        src: ['./build/header.js',
          './lib/tokenization/sentence.js',
          './lib/tokenization/ngram.js',
          './lib/localization/britishize.js',
          './lib/inflection/inflect.js',
          './lib/hyphenization/syllable.js',
          './lib/conjugation/adj_to_noun.js',
          './lib/spotting/date_parser.js',
          './lib/tagging/tagger.js',
          './lib/spotting/spotter.js',
          './test.js',
          './build/footer.js'
        ],
        dest: './client_side/nlp.js'
      }
    },
    uglify: {
      do :{
        src: ['./client_side/nlp.js'],
        dest: './client_side/nlp.min.js'
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat', 'uglify']);

};