'use strict';
const Result = require('../../index');

class Adverbs extends Result {
  constructor(list) {
    super(list);
    return this;
  }
  find() {
    return this.match('#Adverb+');
  }
  parse() {
    return this.find().terms().map((t) => {
      return {
        adjectiveForm: t.adverb.adjectiveForm(),
      };
    });
  }
}

module.exports = Adverbs;
