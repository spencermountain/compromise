'use strict';
const Term = require('../../term/term');
//merge two term objects.. carefully

const combine = function(s, i) {
  let a = s.terms[i];
  let b = s.terms[i + 1];
  if (!b) {
    return;
  }
  let text = a.whitespace.before + a.text + a.whitespace.after;
  text += b.whitespace.before + b.text + b.whitespace.after;
  let term = new Term(text);
  s.terms[i] = term;
  s.terms[i + 1] = null;
  s.terms = s.terms.filter((t) => t !== null);
  return;
};

module.exports = combine;
