module.exports = function(grunt) {

  grunt.initConfig({

    watch: {
      files: ["./nlp/**"],
      tasks: ["run"],
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
        sourceMap: true,
        compact: true
      },
      dist: {
        files: {
          "./builds/nlp_compromise.es5.js": "./builds/nlp_compromise.es6.js",
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
    },

    eslint: {
      options: {
        configFile: "./eslint.json",
        useEslintrc: false
      },
      target: ["./src"]
    },

    filesize: {
      base: {
        files: [{
          src: ["./builds/nlp_compromise.es5.min.js"]
        }],
        options: {
          ouput: [{
            stdout: true
          }]
        }
      }
    },

  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-eslint");
  grunt.loadNpmTasks("grunt-babel");
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-run");
  grunt.loadNpmTasks("grunt-filesize");

  grunt.registerTask("default", ["run"]);
  grunt.registerTask("lint", ["eslint"]);
  grunt.registerTask("build", ["eslint", "browserify", "babel", "uglify", "filesize"]);
};
