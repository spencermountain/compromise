'use strict';
const Text = require('../../text');
const Sentence = require('./sentence');
//the Sentences() subset class
const methods = {
  /** conjugate the main/first verb*/
  toPastTense: function() {
    this.list = this.list.map(ts => {
      ts = ts.toPastTense();
      return new Sentence(ts.terms, ts.world, ts.refText, ts.refTerms);
    });
    return this;
  },
  toPresentTense: function() {
    this.list = this.list.map(ts => {
      ts = ts.toPresentTense();
      return new Sentence(ts.terms, ts.world, ts.refText, ts.refTerms);
    });
    return this;
  },
  toFutureTense: function() {
    this.list = this.list.map(ts => {
      ts = ts.toFutureTense();
      return new Sentence(ts.terms, ts.world, ts.refText, ts.refTerms);
    });
    return this;
  },
  toContinuous: function() {
    this.list = this.list.map(ts => {
      ts = ts.toContinuous();
      return new Sentence(ts.terms, ts.world, ts.refText, ts.refTerms);
    });
    return this;
  },
  /** negative/positive */
  toNegative: function() {
    this.list = this.list.map(ts => {
      ts = ts.toNegative();
      return new Sentence(ts.terms, ts.world, ts.refText, ts.refTerms);
    });
    return this;
  },
  toPositive: function() {
    this.list = this.list.map(ts => {
      ts = ts.toPositive();
      return new Sentence(ts.terms, ts.world, ts.refText, ts.refTerms);
    });
    return this;
  },

  /** look for 'was _ by' patterns */
  isPassive: function() {
    this.list = this.list.filter(ts => {
      return ts.isPassive();
    });
    return this;
  },
  //return only questions
  isQuestion: function() {
    // this.list = this.list.filter(ts => {
    //   return ts.isQuestion();
    // });
    return this.questions()
  },
  /** add a word to the start */
  prepend: function(str) {
    this.list = this.list.map(ts => {
      return ts.prepend(str);
    });
    return this;
  },
  /** add a word to the end */
  append: function(str) {
    this.list = this.list.map(ts => {
      return ts.append(str);
    });
    return this;
  },

  /** convert between question/statement/exclamation*/
  toExclamation: function() {
    this.list.forEach(ts => {
      ts.setPunctuation('!');
    });
    return this;
  },
  toQuestion: function() {
    this.list.forEach(ts => {
      ts.setPunctuation('?');
    });
    return this;
  },
  toStatement: function() {
    this.list.forEach(ts => {
      ts.setPunctuation('.');
    });
    return this;
  }
};

const find = function(r, n) {
  r = r.all();
  if (typeof n === 'number') {
    r = r.get(n);
  }
  r.list = r.list.map(ts => {
    return new Sentence(ts.terms, ts.world, ts.refText, ts.refTerms);
  });
  return r;
};

module.exports = Text.makeSubset(methods, find);
