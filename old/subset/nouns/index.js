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
  toSingular: function(verbose) {
    this.list.forEach(ts => ts.toSingular(verbose));
    return this;
  },
  toPossessive: function(verbose) {
    this.list.forEach(ts => ts.toPossessive(verbose));
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

const find = function(r, n) {
  r = r.clauses();
  r = r.match('#Noun+ (of|by)? the? #Noun+?');
  //nouns that we don't want in these results, for weird reasons
  r = r.not('#Pronoun');
  r = r.not('(there|these)');
  r = r.not('(#Month|#WeekDay)'); //allow Durations, Holidays
  // //allow possessives like "spencer's", but not generic ones like,
  r = r.not('(my|our|your|their|her|his)');
  r = r.not('(of|for|by|the)$');
  if (typeof n === 'number') {
    r = r.get(n);
  }
  r.list = r.list.map(ts => {
    return new Noun(ts.terms, ts.world, ts.refText, ts.refTerms);
  });
  return r;
};

module.exports = Text.makeSubset(methods, find);
