'use strict';
const Text = require('../../index');
const Noun = require('./noun');

class Nouns extends Text {
  toSingular() {}
  toPlural() {}
  data() {
    return this.list.map((ts) => ts.data());
  }
  static find(r) {
    r = r.splitAfter('#Comma');
    r = r.match('#Noun+');
    r = r.not('#Pronoun');
    r.list = r.list.map((ts) => {
      return new Noun(ts.terms, ts.lexicon, ts.parent, ts.parentTerms);
    });
    // r = r.not('#Date');
    return r;
  }
}
Nouns.prototype.toPlural = require('./toPlural');
Nouns.prototype.toSingular = require('./toSingular');

module.exports = Nouns;
