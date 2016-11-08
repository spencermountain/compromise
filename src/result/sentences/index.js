'use strict';
const Result = require('../index');

class Sentences extends Result {
  constructor(list) {
    super(list);
    return this;
  }
  parse() {
    return this.terms.map((t) => {
      return {
      };
    });
  }
  passive() {
    // this.match('was #Adverb? #PastTense #Adverb? by');
  }
  toNegative() {
    this.match('#Copula').verbs().negate();
  }
}

module.exports = Sentences;
