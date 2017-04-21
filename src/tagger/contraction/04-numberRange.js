'use strict';
const fixContraction = require('./fix');
const Term = require('../../term');

const numberRange = (ts) => {
  for(let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    //skip existing
    if (t.silent_term) {
      continue;
    }
    //hyphens found in whitespace - '5 - 7'
    if (t.tags.Value && i > 0 && t.whitespace.before === ' - ') {
      let to = new Term('');
      to.silent_term = 'to';
      ts.insertAt(i, to);
      ts.terms[i - 1].tag('NumberRange');
      ts.terms[i].tag('NumberRange');
      ts.terms[i].whitespace.before = '';
      ts.terms[i].whitespace.after = '';
      ts.terms[i + 1].tag('NumberRange');
      return ts;
    }
    //add a silent term
    if (t.tags.NumberRange) {
      let arr = t.text.split(/(-)/);
      arr[1] = 'to';
      ts = fixContraction(ts, arr, i);
      ts.terms[i].tag('Value');
      ts.terms[i + 1].tag('Preposition');
      ts.terms[i + 2].tag(['Value', 'NumberRange']);
      i += 2;
    }
  }
  return ts;
};
module.exports = numberRange;
