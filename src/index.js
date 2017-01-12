'use strict';
const buildResult = require('./result/build');
const pkg = require('../package.json');

//the main thing
const nlp = function (str, context) {
  return buildResult(str, context);
};
//this is handy
nlp.version = pkg.version;

//and then all-the-exports...
if (typeof self !== 'undefined') {
  self.nlp = nlp; // Web Worker
} else if (typeof window !== 'undefined') {
  window.nlp = nlp; // Browser
} else if (typeof global !== 'undefined') {
  global.nlp = nlp; // NodeJS
}
//don't forget amd!
if (typeof define === 'function' && define.amd) {
  define(nlp);
}
//then for some reason, do this too!
if (typeof module !== 'undefined') {
  module.exports = nlp;
}
