module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('./package.json'),

    watch: {
      files: ['./src/*.js', './src/**', './test/unit_tests/**'],
      tasks: ['run:index']
    // tasks: ['mochaTest']
    },

    run: {
      index: {
        exec: 'node ./src/index.js'
      },
      build: {
        exec: './node_modules/.bin/browserify ./src/index.js --standalone nlp_compromise -t [ babelify --presets [ es2015 ] ] -o ./builds/nlp_compromise.js '
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

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          clearRequireCache: true,
          colors: true,
          growl: false
        },
        src: ['test/unit_tests/*/**.js']
      }
    },

    mocha_istanbul: {
      coverageSpecial: {
        src: 'test/unit_tests/*/*.js',
        options: {
          reportFormats: ['html'],
          quiet: true,
          coverageFolder: './coverage'
        }
      }
    },

    eslint: {
      target: ['./src/**'],
      configFile: './.eslintrc'
    },

    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: false,
        push: false,
        createTag: false
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-filesize');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-istanbul');
  grunt.loadNpmTasks('grunt-bump');

  grunt.registerTask('default', ['run:index']);
  grunt.registerTask('coverage', ['mocha_istanbul']);
  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('lint', ['eslint']);
  grunt.registerTask('demo', ['build', 'run:demo']);
  grunt.registerTask('build', ['mochaTest', 'eslint', 'run:build', 'uglify', 'filesize']);
};
