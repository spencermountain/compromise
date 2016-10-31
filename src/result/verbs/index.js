'use strict';
const Result = require('../index');

class Verbs extends Result {
  constructor(list) {
    super(list);
    // this.check();
    this.when('#Verb+');
    return this;
  }
  parse() {
    return this.terms.map((t) => {
      return {};
    });
  }
  toPast() {
    let t = this.terms[0];
    if (t) {
      t.text = t.verb.pastTense();
    }
    return this.parent();
  }
  toPresent() {
    let t = this.terms[0];
    if (t) {
      t.text = t.verb.presentTense();
    }
    return this.parent();
  }
  toFuture() {
    let t = this.terms[0];
    if (t) {
      t.text = t.verb.futureTense();
    }
    return this.parent();
  }
}

module.exports = Verbs;
