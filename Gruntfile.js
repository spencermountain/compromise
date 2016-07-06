
module.exports = function (grunt) {
  //paths to binaries, so no globals are needed
  var browserify = './node_modules/.bin/browserify';
  var tape = './node_modules/tape/bin/tape';
  var tapSpec = './node_modules/tap-spec/bin/cmd.js';
  var fileServer = './node_modules/.bin/http-server';
  var uglify = './node_modules/uglify-js/bin/uglifyjs';

  //paths
  var uncompressed = './builds/nlp_compromise.js';
  var compressed = './builds/nlp_compromise.min.js';

  grunt.initConfig({

    pkg: grunt.file.readJSON('./package.json'),

    watch: {
      files: ['./src/*.js', './src/**', './test/unit_tests/**'],
      tasks: ['run:main']
    },

    run: {
      build: {
        //browserify + babel + derequire > onefile.js
        exec: browserify + ' ./src/index.js --standalone nlp_compromise -t [ babelify --presets [ es2015 ] ] | derequire > ' + uncompressed
      },
      uglify: {
        //file.js -> file.min.js
        exec: uglify + ' ' + uncompressed + ' --mangle --compress --output ' + compressed + ' --preamble "nlp_compromise@<%= pkg.version %>" --source-map ' + compressed + '.map'
      },
      test: {
        exec: tape + ' ./test/unit_test/**/*_test.js | ' + tapSpec
      },


      demo: {
        exec: fileServer + ' demo'
      },
      main: {
        exec: 'node ./src/index.js'
      },
      build_windows: {
        exec: 'node_modules\\.bin\\browserify.cmd src/index.js --standalone nlp_compromise -t [ babelify --presets [ es2015 ] ] -o builds/nlp_compromise.js '
      },
      demo_windows: {
        exec: 'node_modules\\.bin\\http-server.cmd demo'
      }
    },

    filesize: {
      base: {
        files: [{
          src: [compressed]
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
      options: {
        configFile: '.eslintrc',
      },
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-filesize');
  grunt.loadNpmTasks('grunt-eslint');

  grunt.registerTask('default', ['run:main']);
  grunt.registerTask('test', ['run:test']);
  grunt.registerTask('compress', ['run:uglify']);
  grunt.registerTask('lint', ['eslint']);
  grunt.registerTask('demo', ['build', 'run:demo']);
  grunt.registerTask('build', ['run:test', 'eslint', 'run:build', 'run:uglify', 'filesize']);
};
