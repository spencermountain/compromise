'use strict';
const Term = require('../../../term');

//add a silent term
const fixContraction = (ts, parts, i) => {
  //add the interpretation to the contracted term
  let one = ts.terms[i];
  one.silent_term = parts[0];
  //tag it as a contraction
  one.tagAs('Contraction', 'tagger-contraction');

  //add a new empty term
  let two = new Term('');
  two.silent_term = parts[1];
  two.tagAs('Contraction', 'tagger-contraction');
  ts.insertAt(i, two);
  //ensure new term has no auto-whitspace
  two.whitespace.before = '';
  two.whitespace.after = '';
  // ts.terms.push(two);

  //potentially it's three-contracted-terms, like 'dunno'
  if (parts[2]) {
    let three = new Term('');
    three.silent_term = parts[2];
    ts.terms.push(three);
    three.tagAs('Contraction', 'tagger-contraction');
  }

  return ts;
};

module.exports = fixContraction;
