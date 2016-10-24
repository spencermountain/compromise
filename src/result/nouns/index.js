'use strict';
const Result = require('../index');

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
}
Nouns.prototype.toPlural = require('./toPlural');
Nouns.prototype.toSingular = require('./toSingular');

module.exports = Nouns;
