'use strict';
const Result = require('../index');

class Sentences extends Result {
  constructor(list) {
    super(list);
    return this;
  }
  parse() {
    return this.list.map((ts) => {
      return {
        text: ts.plaintext(),
        normal: ts.normal()
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
