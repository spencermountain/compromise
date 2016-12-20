'use strict';
const Text = require('../../index');

class Verbs extends Text {
  parse() {
    return this.mapTerms((t) => {
      return t.verb.conjugate();
    });
  }
  conjugate(verbose) {
    return this.mapTerms((t) => {
      return t.verb.conjugate(verbose);
    });
  }
  isNegative() {
    return this.match('#Negative').found;
  }
  toNegative() {
    if (this.isNegative()) {
      return this;
    }
    let t = this.lastTerm().list[0].terms[0];
    if (t.tag.Copula) {
      t.copula.toNegative();
    } else {
      t.verb.toNegative();
    }
    return this;
  }
  toPositive() {
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
  static find(r) {
    return r.match('#Verb+');
  }
}


module.exports = Verbs;
