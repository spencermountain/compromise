'use strict';
const Result = require('../index');

class Adjectives extends Result {
  constructor(list) {
    super(list);
    // this.check();
    this.when('#Adjective+');
    return this;
  }
  parse() {
    return this.terms.map((t) => {
      return {
        comparative: t.adjective.comparative(),
        superlative: t.adjective.superlative(),
        adverbForm: t.adjective.adverbForm(),
        nounForm: t.adjective.nounForm(),
      };
    });
  }
  adverbs() {
    this.parent();
    //very cool / cool suddenly
    this.when('#Adverb+ #Adjective').or('#Adjective #Adverb+').when('#Adverb');
    return this;
  }
  stripAdverbs() {
    this.parent();
    this.adverbs().remove();
    return this.parent();
  }
}

module.exports = Adjectives;
