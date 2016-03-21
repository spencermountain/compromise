'use strict';
//classifies a question into:
let yesNoTerm = require('./yesNo.js');
let easyForm = require('./easyForm.js');
let hardForm = require('./hardForm.js');

// how, when, where, who, why
// what, which
// number
// yesNo

//exceptions:
// You bought what!? - Echo question
// Who bought what? - Multiple wh-expressions
// I wonder who Fred will ask to leave. - passive question

// "Five Ws and one H" + 'which'
// let forms = {
// how: ['in what way'],
// what: ['what\'s'],
// which: ['what one'],
// number: ['how many', 'how much', 'how far', 'how long'],
// };

const question_form = function(s) {
  //loop through and find first signal
  for(let i = 0; i < s.terms.length; i++) {

    //who is.. -> "who"
    let form = easyForm(s, i);
    if (form) {
      return form;
    }
    //which politician.. -> "who"
    form = hardForm(s, i);
    if (form) {
      return form;
    }
    //is he..  -> "yesNo"
    if (yesNoTerm(s, i)) {
      return 'yesNo';
    }

  }
  return null;
};


module.exports = question_form;
