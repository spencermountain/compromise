'use strict';
const Sentence = require('../sentence.js');
const question_form = require('./question_form');

class Question extends Sentence {
  constructor(str, options) {
    super(str, options);
  }

  form() {
    return question_form(this);
  }

}
Question.fn = Question.prototype;

module.exports = Question;

// let q = new Question(`accordingly, is he cool?`);
// let q = new Question(`what time did you show up?`);
// console.log(q.form());
