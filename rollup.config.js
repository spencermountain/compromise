'use strict';

// rollup.config.js
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const eslint = require('rollup-plugin-eslint');
const uglify = require('rollup-plugin-uglify');
const commonjs = require('rollup-plugin-commonjs');
const json = require('rollup-plugin-json');

module.exports = {
  entry: './src/index.js',
  dest: './builds/bundle.js',
  moduleName: 'compromise',
  format: 'iife',
  plugins: [
    resolve({
      jsnext: true,
      main: true
    }),
    commonjs(),
    json(),
    // eslint(),
    uglify(),
  ]
};
