'use strict';
const buildResult = require('./result/build');
const pkg = require('../package.json');
const log = require('./log');

//the main thing
const nlp = function (str, lexicon, tagSet) {
  return buildResult(str, lexicon, tagSet);
};

//this is handy
nlp.version = pkg.version;

//so handy at times
nlp.lexicon = function() {
  return require('./data/lexicon');
};

//also this is much handy
nlp.verbose = function(str) {
  log.enable(str);
};

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
