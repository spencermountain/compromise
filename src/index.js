'use strict';
const buildText = require('./text/build');
const pkg = require('../package.json');
const log = require('./log');
const unpack = require('compromise-unpack');
const World = require('./world');

let w = new World();
//the main thing
const nlp = function(str, lex) {
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

//uncompress user-submitted lexicon
nlp.plugin = function(plugin) {
  let obj = unpack(plugin);
  w.plugin(obj);
};
//contribute words to the lexicon
nlp.addWords = function(lex) {
  let tmp = unpack({
    words: lex
  });
  w.plugin(tmp);
};
nlp.addTags = function(tags) {
  let tmp = unpack({
    tags: tags
  });
  w.plugin(tmp);
};
nlp.addRules = function(rules) {
  let tmp = unpack({
    rules: rules
  });
  w.plugin(tmp);
};
nlp.addPlurals = function(plurals) {
  let tmp = unpack({
    plurals: plurals
  });
  w.plugin(tmp);
};
nlp.addConjugations = function(conj) {
  let tmp = unpack({
    conjugations: conj
  });
  w.plugin(tmp);
};

//clone the 'world'
nlp.clone = function() {
  w = w.clone();
  return nlp;
};

//this is handy
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
