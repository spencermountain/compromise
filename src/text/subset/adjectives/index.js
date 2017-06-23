'use strict';
const Text = require('../../index');
const fns = require('./methods');
//the Adjectives() subset class

const methods = {
  data: function() {
    return this.list.map((ts) => {
      const str = ts.out('normal');
      return {
        comparative: fns.toComparative(str),
        superlative: fns.toSuperlative(str),
        adverbForm: fns.toAdverb(str),
        nounForm: fns.toNoun(str),
        verbForm: fns.toVerb(str),
        normal: str,
        text: this.out('text')
      };
    });
  }
};

const find = function(r, n) {
  r = r.match('#Adjective');
  if (typeof n === 'number') {
    r = r.get(n);
  }
  return r;
};

module.exports = Text.makeSubset(methods, find);
