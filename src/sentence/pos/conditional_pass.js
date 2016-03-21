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
};


//find the next upcoming comma
const nextComma = function(terms, i) {
  let max = terms.length;
  if (max > i + 7) {
    max = i + 7;
  }
  for(let x = i; x < max; x++) { //don't be too aggressive
    if (terms[x].has_comma()) {
      return x + i;
    }
  }
  //allow trailing conditions too
  if (i > 5 && terms.length - i < 5) {
    return terms.length - 1;
  }
  return null;
};

//set these terms as conditional
const tagCondition = function(terms, start, stop) {
  for(let i = start; i <= stop; i++) {
    terms[i].pos['Condition'] = true;
  }
};

const conditional_pass = function(terms) {
  for(let i = 0; i < terms.length; i++) {
    let t = terms[i];
    if (starts[t.normal]) {
      let until = nextComma(terms, i);
      if (until) {
        tagCondition(terms, i, until);
        i += until - 1;
      }
    }
  }
  return terms;
};

module.exports = conditional_pass;
