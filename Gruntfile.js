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
          './src/methods/tokenization/sentence.js',
          './src/methods/tokenization/ngram.js',
          './src/methods/localization/britishize.js',
          './src/methods/hyphenization/syllable.js',
          './src/methods/transliteration/unicode_normalisation.js',

          './src/inflection/inflect.js',
          './src/conjugation/adj_to_noun.js',
          './src/values/date_parser.js',
          './src/pos/pos.js',
          // './src/spotting/spotter.js',
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