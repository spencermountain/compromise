'use strict';
const fixContraction = require('./fix');
const Term = require('../../../term');

const numberRange = (ts) => {
  for(let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    //skip existing
    if (t.silent_term) {
      continue;
    }
    //hyphens found in whitespace - '5 - 7'
    if (t.tag.Value && i > 0 && t.whitespace.before === ' - ') {
      let to = new Term('');
      to.silent_term = 'to';
      ts.insertAt(i, to);
      ts.terms[i - 1].tagAs('NumberRange');
      ts.terms[i].tagAs('NumberRange');
      ts.terms[i].whitespace.before = '';
      ts.terms[i].whitespace.after = '';
      ts.terms[i + 1].tagAs('NumberRange');
      return ts;
    }
    if (t.tag.NumberRange) {
      let arr = t.text.split(/(-)/);
      arr[1] = 'to';
      ts = fixContraction(ts, arr, i);
      ts.terms[i].tagAs('NumberRange');
      ts.terms[i + 1].tagAs('NumberRange');
      ts.terms[i + 2].tagAs('NumberRange');
      i += 2;
    }
  }
  return ts;
};
module.exports = numberRange;
