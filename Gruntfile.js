module.exports = function(grunt) {

  grunt.initConfig({

    watch: {
      files: ['./src/**'],
      tasks: ['run:build', 'run:run'],
    },

    run: {
      lint: {
        exec: "tslint ./src"
      },
      build: {
        exec: "tsc ./src/index.ts --module commonjs --target es5 --outDir ./build"
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
