'use strict';
//
const splitTerms = (ts, term, isAfter) => {
  let before = [];
  let after = [];
  for(let i = 0; i < ts.terms.length; i++) {
    console.log(ts.terms[i].normal);
    let t = ts.terms[i];
    if (t === term) {
      let len = ts.terms.length;
      //split after this term
      if (isAfter) {
        before.push(ts.terms[i]);
        after = ts.terms.slice(i + 1, len);
      } else {
        after = ts.terms.slice(i, len);
      }
      if (before.length > 0) {
        return [before, after];
      }
      return [after];
    }
    before.push(ts.terms[i]);
  }
  return [before];
};
module.exports = splitTerms;
