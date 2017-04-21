'use strict';
const buildResult = require('./result/build');
const pkg = require('../package.json');
const log = require('./log');

//the main thing
const nlp = function (str, lexicon) {
  // this.tagset = tagset;
  let r = buildResult(str, lexicon);
  r.tagger();
  return r;
};

//same as main method, except with no POS-tagging.
nlp.tokenize = function(str) {
  return buildResult(str);
};

//this is useful
nlp.version = pkg.version;

//turn-on some debugging
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
