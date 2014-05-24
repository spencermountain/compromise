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
        src: [
          './build/header.js',
          './src/methods/tokenization/data/multiples.js',
          './src/methods/tokenization/sentence.js',
          './src/methods/tokenization/ngram.js',
          './src/methods/tokenization/tokenize.js',
          './src/methods/transliteration/unicode_normalisation.js',
          './src/methods/syllables/syllable.js',
          './src/methods/localization/britishize.js',

          './src/data/word_rules.js',
          './src/data/unambiguous_suffixes.js',
          './src/data/parts_of_speech.js',

          //values
          './src/parents/value/to_number.js',
          './src/parents/value/coffeejs/date_extractor.js',
          './src/parents/value/index.js',
          //nouns
          './src/parents/noun/indefinite_article/indefinite_article.js',
          './src/parents/noun/conjugate/inflect.js',
          './src/parents/noun/index.js',
          //adverbs
          './src/parents/adverb/conjugate/to_adjective.js',
          './src/parents/adverb/index.js',
          //verbs
          './src/parents/verb/conjugate/verb_rules.js',
          './src/parents/verb/conjugate/verb_irregulars.js',
          './src/parents/verb/conjugate/to_doer.js',
          './src/parents/verb/conjugate/conjugate.js',
          './src/parents/verb/index.js',
          //adjectives
          './src/parents/adjective/conjugate/to_noun.js',
          './src/parents/adjective/conjugate/to_comparative.js',
          './src/parents/adjective/conjugate/to_superlative.js',
          './src/parents/adjective/conjugate/to_adverb.js',
          './src/parents/adjective/index.js',

          './src/parents/parents.js',
          './src/data/lexicon.js',
          './src/sentence.js',
          './src/pos.js',
          './src/spot.js',

          // './tests/test.js',

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