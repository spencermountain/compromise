'use strict';
const Text = require('../../index');
const methods = require('./methods');

class Adjectives extends Text {
  data() {
    return this.list.map((ts) => {
      const str = ts.out('normal');
      return {
        comparative: methods.toComparative(str),
        superlative: methods.toSuperlative(str),
        adverbForm: methods.toAdverb(str),
        nounForm: methods.toNoun(str),
        verbForm: methods.toVerb(str),
        normal: str,
        text: this.out('text')
      };
    });
  }
  static find(r, n) {
    r = r.match('#Adjective');
    if (typeof n === 'number') {
      r = r.get(n);
    }
    return r;
  }
}

module.exports = Adjectives;
