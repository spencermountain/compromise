'use strict';
const toAdverb = require('./toAdverb');
const toNoun = require('./toNoun');
const toComparative = require('./toComparative');
const toSuperlative = require('./toSuperlative');

const info = {
  adverbform: (t) => {
    return toAdverb(t.normal);
  },
  nounform: (t) => {
    return toNoun(t.normal);
  },
  comparative: (t) => {
    return toComparative(t.normal);
  },
  superlative: (t) => {
    return toSuperlative(t.normal);
  },
  adjconjugations: (t) => {
    return {
      Adverb: t.info('adverbForm'),
      Noun: t.info('nounForm'),
      Comparative: t.info('comparative'),
      Superlative: t.info('superlative'),
    };
  }
};
module.exports = info;
