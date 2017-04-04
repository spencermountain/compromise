'use strict';
const Text = require('../../index');
const Verb = require('./verb');

//the () subset class
const methods = {
  data: function() {
    return this.list.map((ts) => {
      return ts.data();
    });
  },
  conjugation: function(verbose) {
    return this.list.map((ts) => {
      return ts.conjugation(verbose);
    });
  },
  conjugate: function(verbose) {
    return this.list.map((ts) => {
      return ts.conjugate(verbose);
    });
  },

  /** plural/singular **/
  isPlural: function() {
    this.list = this.list.filter((ts) => {
      return ts.isPlural();
    });
    return this;
  },
  isSingular: function() {
    this.list = this.list.filter((ts) => {
      return !ts.isPlural();
    });
    return this;
  },

  /** negation **/
  isNegative: function() {
    this.list = this.list.filter((ts) => {
      return ts.isNegative();
    });
    return this;
  },
  isPositive: function() {
    this.list = this.list.filter((ts) => {
      return !ts.isNegative();
    });
    return this;
  },
  toNegative: function() {
    this.list = this.list.map((ts) => {
      return ts.toNegative();
    });
    return this;
  },
  toPositive: function() {
    this.list.forEach((ts) => {
      ts.toPositive();
    });
    return this;
  },

  /** tense **/
  toPastTense: function() {
    this.list.forEach((ts) => {
      ts.toPastTense();
    });
    return this;
  },
  toPresentTense: function() {
    this.list.forEach((ts) => {
      ts.toPresentTense();
    });
    return this;
  },
  toFutureTense: function() {
    this.list.forEach((ts) => {
      ts.toFutureTense();
    });
    return this;
  },
  toInfinitive: function() {
    this.list.forEach((ts) => {
      ts.toInfinitive();
    });
    return this;
  },
  asAdjective: function() {
    return this.list.map((ts) => ts.asAdjective());
  }
};

const find = function(r, n) {
  r = r.match('(#Adverb|#Auxiliary|#Verb|#Negative|#Particle)+').if('#Verb'); //this should be (much) smarter
  r = r.splitAfter('#Comma');
  if (typeof n === 'number') {
    r = r.get(n);
  }
  r.list = r.list.map((ts) => {
    return new Verb(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
  });
  return new Text(r.list, this.lexicon, this.parent);
};

module.exports = Text.makeSubset(methods, find);
