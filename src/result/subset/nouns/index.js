'use strict';
const Text = require('../../index');
const Noun = require('./noun');

//the () subset class
const methods = {
  isPlural: function() {
    return this.list.map((ts) => ts.isPlural());
  },
  hasPlural: function() {
    return this.list.map((ts) => ts.hasPlural());
  },
  toPlural: function() {
    this.list.forEach((ts) => ts.toPlural());
    return this;
  },
  toSingular: function() {
    this.list.forEach((ts) => ts.toSingular());
    return this;
  },
  data: function() {
    return this.list.map((ts) => ts.data());
  }
};

const find = function(r, n) {
  r = r.clauses();
  r = r.match('#Noun+');
  r = r.not('#Pronoun');
  r = r.not('(#Month|#WeekDay)'); //allow Durations, Holidays
  if (typeof n === 'number') {
    r = r.get(n);
  }
  r.list = r.list.map((ts) => {
    return new Noun(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
  });
  return r;
};

module.exports = Text.makeSubset(methods, find);
