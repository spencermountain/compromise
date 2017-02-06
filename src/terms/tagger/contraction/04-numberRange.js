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
      t.text = parts[0];
      t.whitespace.after = '-';
      ts.insertAt(i + 1, parts[1]);
      t.text = parts[0];

      let t2 = ts.terms[i + 1];
      t2.silent_term = 'to';
      t2.whitespace.before = '';
      t2.whitespace.after = '';
      t.tagAs('Value');
      t2.tagAs('Value');
    }
  }
  return ts;
};
module.exports = numberRange;
