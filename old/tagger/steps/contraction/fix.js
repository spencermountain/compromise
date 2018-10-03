'use strict';
const Term = require('../../../term');

const tags = {
  not: 'Negative',
  will: 'Verb',
  would: 'Modal',
  have: 'Verb',
  are: 'Copula',
  is: 'Copula',
  am: 'Verb'
};
//make sure the newly created term gets the easy tags
const easyTag = t => {
  if (tags[t.silent_term]) {
    t.tag(tags[t.silent_term]);
  }
};

//add a silent term
const fixContraction = (ts, parts, i) => {
  //add the interpretation to the contracted term
  let one = ts.terms[i];
  one.silent_term = parts[0];
  //tag it as a contraction
  one.tag('Contraction', 'tagger-contraction');

  //add a new empty term
  if (parts[1]) {
    let two = new Term('', ts.world);
    two.silent_term = parts[1];
    two.tag('Contraction', 'tagger-contraction');
    ts.insertAt(i + 1, two);
    //ensure new term has no auto-whitspace
    two.whitespace.before = '';
    two.whitespace.after = '';
    easyTag(two);
  }

  //potentially it's three-contracted-terms, like 'dunno'
  if (parts[2]) {
    let three = new Term('', ts.world);
    three.silent_term = parts[2];
    // ts.terms.push(three);
    ts.insertAt(i + 2, three);
    three.tag('Contraction', 'tagger-contraction');
    easyTag(three);
  }

  return ts;
};

module.exports = fixContraction;
