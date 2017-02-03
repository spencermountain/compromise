'use strict';
const Text = require('../../index');
const Noun = require('./noun');

class Nouns extends Text {
  isPlural() {
    return this.list.map((ts) => ts.isPlural());
  }
  hasPlural() {
    return this.list.map((ts) => ts.hasPlural());
  }
  toSingular() {
    this.list.forEach((ts) => ts.toSingular());
    return this;
  }
  toPlural() {
    this.list.forEach((ts) => ts.toPlural());
    return this;
  }
  data() {
    return this.list.map((ts) => ts.data());
  }
  static find(r, n) {
    r = r.clauses();
    r = r.match('#Noun+');
    r = r.not('#Pronoun');
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
module.exports = Nouns;
