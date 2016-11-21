'use strict';
const Result = require('../../index');

class Verbs extends Result {
  constructor(list) {
    super(list);
    // this.check();
    return this;
  }
  find() {
    return this.match('#Verb+');
  }
  parse() {
    return this.find().terms().map((t) => {
      return t.verb.conjugate();
    });
  }
  toPast() {
    let t = this.find().terms()[0];
    this.contractions().expand();
    if (t) {
      t.text = t.verb.pastTense();
    }
    return this.all();
  }
  toPresent() {
    let t = this.find().terms()[0];
    this.contractions().expand();
    if (t) {
      t.text = t.verb.presentTense();
    }
    return this.all();
  }
  toFuture() {
    let t = this.find().terms()[0];
    this.contractions().expand();
    if (t) {
      t.text = t.verb.futureTense();
    }
    return this.all();
  }
}

module.exports = Verbs;
