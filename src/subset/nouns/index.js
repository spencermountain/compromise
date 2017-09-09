'use strict';
const Text = require('../../text');
const Noun = require('./noun');

//the () subset class
const methods = {
  isPlural: function() {
    this.list = this.list.filter(ts => ts.isPlural());
    return this;
  },
  hasPlural: function() {
    return this.list.map(ts => ts.hasPlural());
  },
  toPlural: function() {
    this.list.forEach(ts => ts.toPlural());
    return this;
  },
  toSingular: function() {
    this.list.forEach(ts => ts.toSingular());
    return this;
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
  r.list = r.list.map(ts => {
    return new Noun(ts.terms, ts.world, ts.refText, ts.refTerms);
  });
  return r;
};

module.exports = Text.makeSubset(methods, find);
