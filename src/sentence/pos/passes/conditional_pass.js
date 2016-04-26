'use strict';

const starts = {
  'if': true,
  'in the event': true,
  'in order to': true,
  'so long as': true,
  'provided': true,
  'save that': true,
  'after': true,
  'once': true,
  'subject to': true,
  'without': true,
  'effective': true,
  'upon': true,
  'during': true,
  'unless': true,
  'according': true,
  'notwithstanding': true,
  'when': true,
  'before': true,
};

// ensure there's a verb in a couple words
const verbSoon = function(terms, x) {
  for(let i = 0; i < 5; i++) {
    if (terms[i + x] && terms[i + x].pos['Verb']) {
      return true;
    }
  }
  return false;
};

// find the next upcoming comma
const nextComma = function(terms, i) {
  //don't be too aggressive
  let max = terms.length - 1;
  if (max > i + 7) {
    max = i + 7;
  }
  for(let x = i; x < max; x++) {
    //ensure there's a command and a verb coming up soon
    if (terms[x].has_comma() && verbSoon(terms, x)) {
      return x;
    }
  }
  //allow trailing conditions too
  if (i > 5 && terms.length - i < 5) {
    return terms.length;
  }
  return null;
};

//set these terms as conditional
const tagCondition = function(terms, start, stop) {
  for(let i = start; i <= stop; i++) {
    if (!terms[i]) {
      break;
    }
    terms[i].pos['Condition'] = true;
  }
};

const conditional_pass = function(terms) {

  //try leading condition
  if (starts[terms[0].normal]) {
    let until = nextComma(terms, 0);
    if (until) {
      tagCondition(terms, 0, until);
    }
  }

  //try trailing condition
  for(let i = 3; i < terms.length; i++) {
    if (starts[terms[i].normal] && terms[i - 1].has_comma()) {
      let until = nextComma(terms, i);
      if (until) {
        tagCondition(terms, i, until);
        i += until;
      }
    }
  }
  return terms;
};

module.exports = conditional_pass;
