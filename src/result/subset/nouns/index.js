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
    r = r.clauses();
    r = r.match('#Noun+');
    // r = r.not('#Pronoun');
    // let dates=
    // if (r.match('#Date').found) {
    //   r = r.not('#Date');
    // }
    r.list = r.list.map((ts) => {
      return new Noun(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
    });
    // console.log(r.list);
    return r;
  }
}
Nouns.prototype.toPlural = require('./toPlural');
Nouns.prototype.toSingular = require('./toSingular');

module.exports = Nouns;
