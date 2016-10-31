'use strict';

const numberRange = (ts) => {
  for(let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    //skip existing
    if (t.silent_term) {
      continue;
    }
    if (t.tag.NumberRange) {
      let parts = t.text.split(/-/);
      ts.insertAt('', i);
      let t2 = ts.terms[i + 1];
      t.text = parts[0] + '-';
      t.normal = parts[0];
      t2.text = parts[1];
      t2.tag = {
        Value: true
      };
      t2.whitespace.after = t.whitespace.after;
      t.whitespace.after = '';
    }
  }
  return ts;
};
module.exports = numberRange;
