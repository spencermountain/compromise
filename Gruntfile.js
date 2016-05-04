module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('./package.json'),

    watch: {
      files: ['./src/*.js', './src/**'],
      tasks: ['run:index']
    },

    run: {
      index: {
        exec: 'node ./src/index.js'
      // exec: 'node /home/spencer/mountain/nlp/nlp_compromise/src/term/noun/value/parse/to_number.js'
      },
      build: {
        exec: 'browserify ./src/index.js --standalone nlp_compromise -t [ babelify --presets [ es2015 ] ] -o ./builds/nlp_compromise.js '
      },
      coverage: {
        exec: ''
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
          // require: 'babel/register',
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
          coverageFolder: './test/coverage'
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
  grunt.registerTask('build', ['mochaTest', 'eslint', 'run:build', 'uglify', 'filesize']);
};
