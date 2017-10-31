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
  },
  articles: function() {
    return this.list.map(ts => {
      return {
        text: ts.out('text'),
        normal: ts.out('normal'),
        article: ts.article()
      };
    });

  }
};

//nouns that we don't want in these results, for weird reasons
const stopWords = '(there|these)';

const find = function(r, n) {
  r = r.clauses();
  r = r.match('#Noun+ (of|for|by)? the? #Noun+?');
  r = r.not('#Pronoun');
  r = r.not(stopWords);
  r = r.not('(#Month|#WeekDay)'); //allow Durations, Holidays
  r = r.not('(my|our|their)'); //weird possessives
  if (typeof n === 'number') {
    r = r.get(n);
  }
  r.list = r.list.map(ts => {
    return new Noun(ts.terms, ts.world, ts.refText, ts.refTerms);
  });
  return r;
};

module.exports = Text.makeSubset(methods, find);
