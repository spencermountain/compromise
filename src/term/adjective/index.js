'use strict';
const toAdverb = require('./toAdverb');
const toNoun = require('./toNoun');
const toComparative = require('./toComparative');
const toSuperlative = require('./toSuperlative');

const adjective = {
  adverbForm: function() {
    return toAdverb(this.normal);
  },
  nounForm: function() {
    return toNoun(this.normal);
  },
  comparative: function() {
    return toComparative(this.normal);
  },
  superlative: function() {
    return toSuperlative(this.normal);
  },
  conjugate: function() {
    return {
      adverbForm: this.adjective.adverbForm(),
      nounForm: this.adjective.nounForm(),
      comparative: this.adjective.comparative(),
      superlative: this.adjective.superlative(),
    };
  }
};
module.exports = adjective;
