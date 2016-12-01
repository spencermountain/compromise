'use strict';
const Text = require('../../index');

class Adjectives extends Text {
  constructor(list) {
    super(list);
    // this.check();
    return this;
  }
  find() {
    return this.match('#Adjective+');
  }
  parse() {
    return this.find().terms().map((t) => {
      return {
        comparative: t.adjective.comparative(),
        superlative: t.adjective.superlative(),
        adverbForm: t.adjective.adverbForm(),
        nounForm: t.adjective.nounForm(),
      };
    });
  }
  adverbs() {
    this.all();
    //very cool / cool suddenly
    this.match('#Adverb+ #Adjective').or('#Adjective #Adverb+').match('#Adverb');
    return this;
  }
  stripAdverbs() {
    this.all();
    this.adverbs().remove();
    return this.all();
  }
}

module.exports = Adjectives;
