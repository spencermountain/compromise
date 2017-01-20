'use strict';
const Text = require('../../index');
const Verb = require('./verb');

class Verbs extends Text {
  data() {
    return this.list.map((ts) => {
      return ts.data();
    });
  }
  conjugate(verbose) {
    return this.mapTerms((t) => {
      return t.verb.conjugate(verbose);
    });
  }
  isNegative() {
    return this.filter((ts) => {
      ts.isNegative();
    });
  }
  toNegative() {
    this.list.forEach((ts) => {
      ts.toNegative();
    });
    return this;
  }
  toPositive() {
    this.list.forEach((ts) => {
      ts.toPositive();
    });
    return this;
  }
  toPast() {
    let t = this.list[0].terms[0];
    this.contractions().expand();
    if (t) {
      t.text = t.verb.pastTense();
    }
    return this;
  }
  toPresent() {
    let t = this.list[0].terms[0];
    this.contractions().expand();
    if (t) {
      t.text = t.verb.presentTense();
    }
    return this;
  }
  toFuture() {
    let t = this.list[0].terms[0];
    this.contractions().expand();
    if (t) {
      t.text = t.verb.futureTense();
    }
    return this;
  }
  toAdjective() {
    this.terms().forEach((t) => {
      t.text = t.verb.toAdjective();
    });
    return this;
  }
  static find(r, n) {
    r = r.match('#Verb+');
    if (typeof n === 'number') {
      r = r.get(n);
    }
    r.list = r.list.map((ts) => {
      return new Verb(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
    });
    return r;
  }
}


module.exports = Verbs;
