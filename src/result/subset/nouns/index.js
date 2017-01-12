'use strict';
const Text = require('../../index');
const Noun = require('./noun');

class Nouns extends Text {
  toSingular() {}
  toPlural() {}
  data() {
    return this.list.map((ts) => ts.data());
  }
  static find(r, n) {
    r = r.clauses();
    r = r.match('#Noun+');
    // r = r.not('#Pronoun');
    // if (r.match('#Date').found) {
    //   r = r.not('#Date');
    // }
    if (typeof n === 'number') {
      r = r.get(n);
    }
    r.list = r.list.map((ts) => {
      return new Noun(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
    });
    return r;
  }
}
Nouns.prototype.toPlural = require('./toPlural');
Nouns.prototype.toSingular = require('./toSingular');

module.exports = Nouns;
