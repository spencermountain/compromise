'use strict';
const Result = require('../index');

class Adverbs extends Result {
  constructor(list) {
    super(list);
    this.match('#Adverb+');
    return this;
  }
  parse() {
    return this.terms.map((t) => {
      return {
        adjectiveForm: t.adverb.adjectiveForm(),
      };
    });
  }
}

module.exports = Adverbs;
