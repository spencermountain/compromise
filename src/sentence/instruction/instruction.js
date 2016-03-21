'use strict';
const Sentence = require('../sentence.js');

class Instruction extends Sentence {
  constructor(str, options) {
    super(str, options);
  }
}
Statement.fn = Instruction.prototype;

module.exports = Instruction;

// let s = new Statement('tell me your name');
// console.log(s);
