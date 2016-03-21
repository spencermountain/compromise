'use strict';

let hardFormVerb = {
  'which': 'which',
  'what': 'what',
};

// "what time" -> 'when'
let knownForm = {
  time: 'when',
  day: 'when',
  year: 'when',

  person: 'who', //more covered by pos["Actor"]

  amount: 'number',
  number: 'number',
};

const hardForm = function(s, i) {
  let t = s.terms[i];
  let nextTerm = s.terms[i + 1];
  // which, or what
  let questionWord = hardFormVerb[t.normal] || hardFormVerb[t.expanded];
  // end early.
  if (!nextTerm || !questionWord) {
    return null;
  }

  //"which is.."
  if (nextTerm.pos['Copula']) {
    return t.normal;
  }
  //"which politician.."
  if (nextTerm.pos['Actor']) {
    return 'who';
  }
  //"what time.."
  if (knownForm[nextTerm.normal]) {
    return knownForm[nextTerm.normal];
  }

  return questionWord;
};

module.exports = hardForm;
