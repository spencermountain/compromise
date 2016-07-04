module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('./package.json'),

    watch: {
      files: ['./src/*.js', './src/**', './test/unit_tests/**'],
      tasks: ['run:index']
    },

    run: {
      index: {
        exec: 'node ./src/index.js'
      },
      build: {
        exec: './node_modules/.bin/browserify ./src/index.js --standalone nlp_compromise -t [ babelify --presets [ es2015 ] ] -o ./builds/nlp_compromise.js '
      },
      test: {
        exec: './node_modules/tape/bin/tape ./test/unit_test/**/*_test.js | ./node_modules/tap-spec/bin/cmd.js'
      },
      build_windows: {
        exec: 'node_modules\\.bin\\browserify.cmd src/index.js --standalone nlp_compromise -t [ babelify --presets [ es2015 ] ] -o builds/nlp_compromise.js '
      },
      demo: {
        exec: './node_modules/.bin/http-server demo'
      },
      demo_windows: {
        exec: 'node_modules\\.bin\\http-server.cmd demo'
      }
    },

    uglify: {
      'do': {
        src: ['./builds/nlp_compromise.js'],
        dest: './builds/nlp_compromise.min.js'
      },
      'options': {
        preserveComments: false,
        mangle: true,
        banner: ' /*nlp_compromise <%= pkg.version %>  MIT*/\n\n',
        compress: {
          drop_console: true,
          dead_code: true,
          properties: true,
          unused: true,
          warnings: true
        }
      }
    },

    filesize: {
      base: {
        files: [{
          src: ['./builds/nlp_compromise.min.js']
        }],
        options: {
          ouput: [{
            stdout: true
          }]
        }
      }
    },

    eslint: {
      target: ['./src/**'],
      configFile: './.eslintrc'
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-filesize');
  grunt.loadNpmTasks('grunt-eslint');

  grunt.registerTask('default', ['run:index']);
  grunt.registerTask('test', ['run:test']);
  grunt.registerTask('lint', ['eslint']);
  grunt.registerTask('demo', ['build', 'run:demo']);
  grunt.registerTask('build', ['run:test', 'eslint', 'run:build', 'uglify', 'filesize']);
};
