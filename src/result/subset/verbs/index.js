'use strict';
const Text = require('../../index');

class Verbs extends Text {
  constructor(list) {
    super(list);
    this.list = this.find().list;
    return this;
  }
  find() {
    return this.match('#Verb+');
  }
  parse() {
    return this.terms().map((t) => {
      return t.verb.conjugate();
    });
  }
  isNegative() {
    return this.match('#Negative').found;
  }
  toNegative() {
    if (this.isNegative()) {
      return this;
    }
    let t = this.lastTerm().terms()[0];
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
    let t = this.terms()[0];
    this.contractions().expand();
    if (t) {
      t.text = t.verb.pastTense();
    }
    return this.all();
  }
  toPresent() {
    let t = this.terms()[0];
    this.contractions().expand();
    if (t) {
      t.text = t.verb.presentTense();
    }
    return this.all();
  }
  toFuture() {
    let t = this.terms()[0];
    this.contractions().expand();
    if (t) {
      t.text = t.verb.futureTense();
    }
    return this.all();
  }
}

module.exports = Verbs;
