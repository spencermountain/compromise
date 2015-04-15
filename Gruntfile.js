//build script for the client-side file
module.exports = function(grunt) {

  var files = [
    // './build/header.txt',
    './src/methods/tokenization/sentence.js',
    './src/methods/tokenization/ngram.js',
    './src/methods/tokenization/tokenize.js',
    './src/methods/transliteration/unicode_normalisation.js',
    './src/methods/syllables/syllable.js',
    './src/methods/localization/britishize.js',
    //data
    './src/data/word_rules.js',
    './src/data/unambiguous_suffixes.js',
    './src/data/parts_of_speech.js',
    //values
    './src/parents/value/to_number.js',
    './src/parents/value/date_extractor.js',
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
    './src/section.js',
    './src/pos.js',
    './src/spot.js',
    //pull it all together..
    './index.js'
  ]

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),
    concat: {
      options: {
        banner: '/*! <%= pkg.name %>  <%= pkg.version %>  by @spencermountain <%= grunt.template.today("yyyy-mm-dd") %>  <%= pkg.license%> */\nvar nlp = (function() {\n',
        footer: "\nreturn nlp;\n})()"
      },
      dist: {
        src: files,
        dest: './client_side/nlp.js',
        nonull: true
      }
    },

    uglify: {
      do :{
        src: ['./client_side/nlp.js'],
        dest: './client_side/nlp.min.js'
      },
      options: {
        preserveComments: false,
        mangle: true,
        banner: " /*nlp_comprimise by @spencermountain in 2015*/\n",
        compress: {
          drop_console: true,
          dead_code: true,
          properties: true,
          unused: true,
          warnings: true
        }
      }
    },

    jscs: {
      all: files,
      options: {
        "requireCurlyBraces": true,
        "disallowMixedSpacesAndTabs": true,
        "disallowTrailingWhitespace": true,
        "disallowEmptyBlocks": true,
        "disallowFunctionDeclarations": true,
        "disallowImplicitTypeConversion": ["numeric", "boolean", "binary", "string"],
        "requireAnonymousFunctions": true,
        "requireOperatorBeforeLineBreak": true
        // disallowTrailingComma:true
      }
    },

    jshint: {
      options: {
        globals: {
          module: true,
          require: true,
          exports: true
        },
        boss:true, // double equals
        asi: true, //semicolons
        sub: true, //dot notation
        devel: true //console.log
      },
      afterconcat: ['./client_side/nlp.js']
    }

  });
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks("grunt-jscs");
  grunt.registerTask('default', ['concat', 'jscs', /*'jshint',*/ 'uglify']);
};
