module.exports = function(grunt) {

  grunt.initConfig({

    watch: {
      files: ['./src/*.ts'],
      tasks: ['run:build', 'run:run'],
    },

    run: {
      build: {
        exec: " tsc ./src/index.ts --module commonjs --outDir ./build"
      },
      run: {
        exec: 'node ./build/index.js',
      }
    }

  })

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-run');
  grunt.registerTask('default', ['run:build', 'run:run', 'watch']);
};
