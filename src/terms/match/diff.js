'use strict';
//
const remove = (needle, ts) => {
  let n = 0;
  let matches = [];
  let current = [];
  ts.terms.forEach((term) => {
    if (term === needle.terms[n]) {
      if (current.length) {
        matches.push(current);
        current = [];
      }
      n += 1;
      return;
    }
    current.push(term);
  });
  return matches;
};
module.exports = remove;
