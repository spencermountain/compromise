'use strict';
const Result = require('../index');

class Adjectives extends Result {
  constructor(list) {
    super(list);
  }
  stripAdverbs() {
    console.log('hi!');
    return this.remove('#Adverb');
  }
}

const addSubclass = function(R) {
  R.prototype.adjectives = function() {
    return new Adjectives(this.list);
  };
  return Result;
};

module.exports = addSubclass;
