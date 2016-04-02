'use strict';
const Sentence = require('../sentence.js');
const negate = require('./negate/negate.js');

class Statement extends Sentence {
  constructor(str, options) {
    super(str, options);
  }
  negate() {
    negate(this);
    return this;
  }
}
Statement.fn = Statement.prototype;

module.exports = Statement;

// let s = new Statement('john is a person');
// console.log(s);
