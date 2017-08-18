'use strict';
const buildText = require('./text/build');
const pkg = require('../package.json');
const log = require('./log');
const pack = require('efrt').pack;
const World = require('./world');
//the main thing
// linguistischen Datenverarbeitung (nlp)
const nlp = function(str, lex) {
  let w = new World();
  if (lex) {
    w.addWords(lex);
  }
  let doc = buildText(str, w);
  doc.tagger();
  return doc;
};

//same as main method, except with no POS-tagging.
nlp.tokenize = function(str) {
  return buildText(str);
};

//this is useful
nlp.version = pkg.version;

//turn-on some debugging
nlp.verbose = function(str) {
  log.enable(str);
};

//compress user-submitted lexicon
nlp.pack = function(obj) {
  return JSON.stringify(pack(obj));
};
//uncompress user-submitted lexicon
nlp.unpack = function(str) {
  let obj = JSON.parse(str);
  obj = efrt.unpack(obj);
  return obj;
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
