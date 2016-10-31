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
      ts.insertAt('-', i);
      ts.insertAt(parts[1], i + 1);
      t.text = parts[0];
      let t2 = ts.terms[i + 1];
      t2.silent_term = 'to';
      let t3 = ts.terms[i + 2];
      t2.whitespace.before = '';
      t2.whitespace.after = '';
      t3.whitespace.before = '';
      t3.whitespace.after = t.whitespace.after;
      t.whitespace.after = '';
      t.tag = {
        Value: true,
      };
      t2.tag = {
        Preposition: true,
      };
      t3.tag = {
        Value: true,
      };
    }
  }
  return ts;
};
module.exports = numberRange;
