'use strict';
const Sentence = require('../sentence.js');
// const change_tense = require('../tense.js');

class Statement extends Sentence {
  constructor(str) {
    super(str);
  }
// // john walks quickly -> john walked quickly
// to_past() {
//   change_tense(this, 'past');
//   return this;
// }
// // john walked quickly -> john walks quickly
// to_present() {
//   change_tense(this, 'present');
//   return this;
// }
// // john walked quickly -> john will walk quickly
// to_future() {
//   change_tense(this, 'future');
//   return this;
// }
}
Statement.fn = Statement.prototype;

module.exports = Statement;

// let s = new Statement('john is a person');
// console.log(s.tags());
// console.log(s);
// console.log(s.to_past().text());
