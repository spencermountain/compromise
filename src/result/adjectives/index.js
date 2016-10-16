'use strict';
const Result = require('../index');

class Adjectives extends Result {
  constructor(list) {
    super(list);
    this.parent = this;
    return this;
  }
  stripAdverbs() {
    //very cool
    this.when('#Adverb+ #Adjective').remove('#Adverb+');
    //cool suddenly
    this.when('#Adjective #Adverb+').remove('#Adverb+');
    return this;
  }
}

module.exports = Adjectives;
