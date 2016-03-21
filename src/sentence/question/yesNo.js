'use strict';

// Yes/No questions take the form:
// he is -> is he?
const yesNoVerb = {
  is: true,
  are: true,
  was: true,
  will: true,
  do: true,
  did: true,
};

const yesNoTerm = function(s, i) {
  let t = s.terms[i];
  let lastTerm = s.terms[i - 1];
  let nextTerm = s.terms[i + 1];
  //try a yes/no question then
  if (yesNoVerb[t.normal] || yesNoVerb[t.expansion]) {
    //leading 'is x...' is a question
    if (!lastTerm) {
      return true;
    }
    //ending '... are.' is a not question
    if (!lastTerm) {
      return false;
    }
    // 'he is' is not a question..
    if (lastTerm.pos['Pronoun'] || lastTerm.pos['Person']) {
      return false;
    }
    // 'is he' is a question..
    if (nextTerm.pos['Pronoun'] || nextTerm.pos['Person']) {
      return true;
    }
  }
  return false;
};

module.exports = yesNoTerm;
