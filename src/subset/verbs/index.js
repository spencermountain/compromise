'use strict';
const Text = require('../../text');
const Verb = require('./verb');

//the () subset class
const methods = {
  conjugation: function(verbose) {
    return this.list.map(ts => {
      return ts.conjugation(verbose);
    });
  },
  conjugate: function(num, verbose) {
    //suppport only conjugating one verb in our result..
    if (num !== null && typeof num === 'number' && this.list[num]) {
      return this.list[num].conjugate(verbose);
    }
    //otherwise, return an array of conjugations
    return this.list.map(ts => {
      return ts.conjugate(verbose);
    });
  },

  /** plural/singular **/
  isPlural: function() {
    this.list = this.list.filter(ts => {
      return ts.isPlural();
    });
    return this;
  },
  isSingular: function() {
    this.list = this.list.filter(ts => {
      return !ts.isPlural();
    });
    return this;
  },

  /** negation **/
  isNegative: function() {
    this.list = this.list.filter(ts => {
      return ts.isNegative();
    });
    return this;
  },
  isPositive: function() {
    this.list = this.list.filter(ts => {
      return !ts.isNegative();
    });
    return this;
  },
  toNegative: function() {
    this.list = this.list.map(ts => {
      return ts.toNegative();
    });
    return this;
  },
  toPositive: function() {
    this.list.forEach(ts => {
      ts.toPositive();
    });
    return this;
  },

  /** tense **/
  toPastTense: function() {
    this.list.forEach(ts => {
      ts.toPastTense();
    });
    return this;
  },
  toPresentTense: function() {
    this.list.forEach(ts => {
      ts.toPresentTense();
    });
    return this;
  },
  toFutureTense: function() {
    this.list.forEach(ts => {
      ts.toFutureTense();
    });
    return this;
  },
  toInfinitive: function() {
    this.list.forEach(ts => {
      ts.toInfinitive();
    });
    return this;
  },
  toGerund: function() {
    this.list.forEach(ts => {
      ts.toGerund();
    });
    return this;
  },
  asAdjective: function() {
    return this.list.map(ts => ts.asAdjective());
  }
};
//aliases
methods.toContinuous = methods.toGerund;

const find = function(r, n) {
  r = r.match('(#Adverb|#Auxiliary|#Verb|#Negative|#Particle)+');
  r = r.splitAfter('#Comma');
  r = r.if('#Verb'); //this should be (much) smarter
  if (typeof n === 'number') {
    r = r.get(n);
  }
  r.list = r.list.map(ts => {
    return new Verb(ts.terms, ts.world, ts.refText, ts.refTerms);
  });
  return new Text(r.list, this.world, this.parent);
};

module.exports = Text.makeSubset(methods, find);
