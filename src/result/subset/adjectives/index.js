'use strict';
const Text = require('../../index');
const Adjective = require('./adjective');

class Adjectives extends Text {
  data() {
    return this.list.map((ts) => {
      return ts.data();
    });
  }
  static find(r, n) {
    r = r.match('#Adjective');
    if (typeof n === 'number') {
      r = r.get(n);
    }
    r.list = r.list.map((ts) => {
      return new Adjective(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
    });
    return r;
  }
}

module.exports = Adjectives;
