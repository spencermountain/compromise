'use strict';
const toAdverb = require('./toAdverb')
const toNoun = require('./toNoun')
const toComparative = require('./toComparative')
const toSuperlative = require('./toSuperlative')

const info = {
  adverbForm: (t) => {
    return toAdverb(t.normal)
  },
  nounForm: (t) => {
    return toNoun(t.normal)
  },
  comparative: (t) => {
    return toComparative(t.normal)
  },
  superlative: (t) => {
    return toSuperlative(t.normal)
  }
}
module.exports = info
