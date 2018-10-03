'use strict';
const hasCapital = /^[A-Z]/;

//sticking words at the start sentence-sensitive
const prepend = (ts, str) => {
  let firstTerm = ts.terms[0];
  ts.insertAt(0, str);
  //handle titlecase of first-word
  if (hasCapital.test(firstTerm.text)) {
    //is it titlecased because it should be?
    if (firstTerm.needsTitleCase() === false) {
      firstTerm.toLowerCase();
    }
    let newTerm = ts.terms[0];
    newTerm.toTitleCase();
  }
  return ts;
};

//sticking words on end sentence-sensitive
const append = (ts, str) => {
  let endTerm = ts.terms[ts.terms.length - 1];
  //move the sentence punctuation to the end
  let punct = ts.getPunctuation();
  if (punct) {
    endTerm.killPunctuation();
  }
  ts.insertAt(ts.terms.length, str);
  let newTerm = ts.terms[ts.terms.length - 1];
  if (punct) {
    newTerm.text += punct;
  }
  //move over sentence-ending whitespace too
  if (endTerm.whitespace.after) {
    newTerm.whitespace.after = endTerm.whitespace.after;
    endTerm.whitespace.after = '';
  }
  return ts;
};

module.exports = {
  append: append,
  prepend: prepend
};
