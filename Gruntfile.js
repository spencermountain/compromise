module.exports = function(grunt) {

  grunt.initConfig({

    watch: {
      files: ['./nlp/**'],
      tasks: ['run'],
    },

    run: {
      run: {
        exec: "iojs ./src/index.js",
      },
      test: {
        exec: "mocha ./test/*",
      }
    },

    "browserify": {
      client: {
        src: "./src/index.js",
        dest: "./builds/nlp_compromise.es6.js",
        options: {
          "standalone": true
        }
      }
    },

    "babel": {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          "./builds/nlp_compromise.es5.js": "./builds/nlp_compromise.es6.js"
        }
      }
    },

    uglify: {
      "do": {
        src: ["./builds/nlp_compromise.es5.js"],
        dest: "./builds/nlp_compromise.es5.min.js"
      },
      "options": {
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
    }

  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-babel");
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-run");
  grunt.registerTask("default", ["run"]);
  grunt.registerTask("watch", ["watch"]);
  grunt.registerTask("build", ["browserify", "babel", "uglify"]);
};
