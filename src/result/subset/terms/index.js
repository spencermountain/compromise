'use strict';
const Text = require('../../index');
const Term = require('./term');

class Terms extends Text {
  data() {
    return this.list.map((ts) => {
      return ts.data();
    });
  }

  static find(r, n) {
    r = r.match('.');
    if (typeof n === 'number') {
      r = r.get(n);
    }
    r.list = r.list.map((ts) => {
      return new Term(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
    });
    return r;
  }
}

module.exports = Terms;
