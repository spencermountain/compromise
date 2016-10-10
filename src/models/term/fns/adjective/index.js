'use strict';
const toAdverb = require('./toAdverb');
const toNoun = require('./toNoun');
const toComparative = require('./toComparative');
const toSuperlative = require('./toSuperlative');

const info = {
  adverbform: function(t) {
    return toAdverb(t.normal);
  },
  nounform: function(t) {
    return toNoun(t.normal);
  },
  comparative: function(t) {
    return toComparative(t.normal);
  },
  superlative: function(t) {
    return toSuperlative(t.normal);
  },
  conjugate: function(t) {
    return {
      Adverb: t.info('adverbForm'),
      Noun: t.info('nounForm'),
      Comparative: t.info('comparative'),
      Superlative: t.info('superlative'),
    };
  }
};
module.exports = info;
