//build script for the client-side file
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),

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
      all: './client_side/nlp.js',
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
    },

    "browserify":{
      client: {
        src: './index.js',
        dest: './client_side/nlp.js',
        options:{
          "standalone":true
        }
      }
    }

  });
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks("grunt-jscs");
  grunt.registerTask('lint', ['jshint', "jscs"]);
  grunt.registerTask('default', ['browserify', 'uglify']);
};
