'use strict';
const Term = require('../../../term');

const tags = {
  'not': 'Negative',
  'will': 'Verb',
  'would': 'Modal',
  'have': 'Verb',
  'are': 'Copula',
  'is': 'Copula',
  'am': 'Verb',
};
//make sure the newly created term gets the easy tags
const easyTag = (t) => {
  if (tags[t.silent_term]) {
    t.tagAs(tags[t.silent_term]);
  }
};


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
  ts.insertAt(i + 1, two);
  //ensure new term has no auto-whitspace
  two.whitespace.before = '';
  two.whitespace.after = '';
  easyTag(two);

  //potentially it's three-contracted-terms, like 'dunno'
  if (parts[2]) {
    let three = new Term('');
    three.silent_term = parts[2];
    // ts.terms.push(three);
    ts.insertAt(i + 2, three);
    three.tagAs('Contraction', 'tagger-contraction');
    easyTag(three);
  }

  return ts;
};

module.exports = fixContraction;
