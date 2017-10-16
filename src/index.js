'use strict';
const buildText = require('./text/build');
const pkg = require('../package.json');
const log = require('./log');
const unpack = require('./world/unpack');
let w = require('./world');


//the main function
const nlp = function(str, lex) {
  if (lex) {
    w.plugin({
      words: lex
    });
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
  w.plugin(plugin);
};
//contribute words to the lexicon
nlp.addWords = function(lex) {
  w.plugin({
    words: lex
  });
};
nlp.addTags = function(tags) {
  w.plugin({
    tags: tags
  });
};
nlp.addRegex = function(regex) {
  w.plugin({
    regex: regex
  });
};
nlp.addPatterns = function(patterns) {
  w.plugin({
    patterns: patterns
  });
};
nlp.addPlurals = function(plurals) {
  w.plugin({
    plurals: plurals
  });
};
nlp.addConjugations = function(conj) {
  w.plugin({
    conjugations: conj
  });
};

//clone the 'world'
nlp.clone = function() {
  w = w.clone();
  return nlp;
};
//this is used, atleast, for testing the packing
nlp.unpack = function(plugin) {
  return unpack(plugin);
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
