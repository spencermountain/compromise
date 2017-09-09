'use strict';
const Text = require('../../text');
const fns = require('./methods');
const shouldConvert = require('./shouldConvert');
//the Adjectives() subset class

const methods = {
  data: function() {
    return this.list.map(ts => {
      const str = ts.out('normal');
      let obj = {
        normal: str,
        text: this.out('text'),
        comparative: 'more ' + str,
        superlative: 'most ' + str,
        adverbForm: null,
        nounForm: null
        // verbForm: null
      };
      if (shouldConvert(str) === true) {
        obj.comparative = fns.toComparative(str) || obj.comparative;
        obj.superlative = fns.toSuperlative(str) || obj.superlative;
        obj.adverbForm = fns.toAdverb(str);
        obj.nounForm = fns.toNoun(str);
        // obj.verbForm = fns.toVerb(str);
      }
      return obj;
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
