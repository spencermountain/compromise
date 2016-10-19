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
    return this;
  }
  toPresent() {
    return this;
  }
  toFuture() {
    return this;
  }
}

module.exports = Verbs;
