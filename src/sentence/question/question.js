'use strict';
const Sentence = require('../sentence.js');

class Question extends Sentence {
  constructor(str, options) {
    super(str, options);
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
Question.fn = Question.prototype;

module.exports = Question;

// let s = new Question('is John a person?');
