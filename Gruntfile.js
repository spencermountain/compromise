module.exports = function(grunt) {

  grunt.initConfig({

    watch: {
      files: ['./src/**'],
      tasks: ['run:build', 'run:run'],
    },

    tslint: {
      options: {
        configuration: grunt.file.readJSON("tslint.json")
      },
      src: [
        "src/*.ts",
      ]
    },
    run: {
      build: {
        exec: 'tsc ./src/index.ts --module commonjs --target es5 --outDir ./build'
      },
      run: {
        exec: 'node ./build/index.js',
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-tslint');
  grunt.registerTask('default', ['run:build', 'run:run', 'watch']);
  grunt.registerTask('lint', ['tslint:src']);
   
  
};
