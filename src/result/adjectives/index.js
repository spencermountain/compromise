'use strict';
const Result = require('../index');

class Adjectives extends Result {
  constructor(list) {
    super(list);
    this.when('#Adjective+');
    return this;
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
