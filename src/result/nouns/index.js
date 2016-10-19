'use strict';
const Result = require('../index');
const toPlural = require('./toPlural');
const toSingular = require('./toSingular');

class Nouns extends Result {
  constructor(list) {
    super(list);
    // this.check();
    this.when('#Noun+');
    return this;
  }
  parse() {
    return this.terms.map((t) => {
      return {};
    });
  }
  toPlural() {
    return toPlural(this);
  }
  toSingular() {
    return toSingular(this);
  }
}

module.exports = Nouns;
