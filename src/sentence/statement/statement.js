'use strict';
const Sentence = require('../sentence.js');
// const change_tense = require('../tense.js');

class Statement extends Sentence {
  constructor(str, options) {
    super(str, options);
  }
}
Statement.fn = Statement.prototype;

module.exports = Statement;

// let s = new Statement('john is a person');
// console.log(s);
