'use strict';

let hardFormVerb = {
  'which': true,
  'what': true,
};

let knownThings = {
  person: 'who',
  actor: 'who',
  politician: 'who',
};

const hardForm = function(s, i) {
  let t = s.terms[i];
  let lastTerm = s.terms[i - 1];
  let nextTerm = s.terms[i + 1];
  // end early.
  if (!nextTerm || !lastTerm) {
    return null;
  }
  // which, or what
  if (hardFormVerb[t.normal] || hardFormVerb[t.expanded]) {
    //"which is.."
    if (nextTerm.pos['Copula']) {
      return t.normal;
    }
    //"which person.."
    if (knownThings[nextTerm.normal]) {
      return knownThings[nextTerm.normal];
    }
  }
  return null;
};

module.exports = hardForm;
