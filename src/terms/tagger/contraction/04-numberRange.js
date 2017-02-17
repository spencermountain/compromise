'use strict';
const fixContraction = require('./fix');

const numberRange = (ts) => {
  for(let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    //skip existing
    if (t.silent_term) {
      continue;
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
