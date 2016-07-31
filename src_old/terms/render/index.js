'use strict';
//specialized render method for Terms(), that require more than a straightup map/reduce
let terms = {
  /** return a pixel-perfect reproduction of the terms, with whitespace preserved */
  text: (ts) => {
    return ts.terms.reduce((str, t) => {
      str += t.render('text');
      return str;
    }, '');
  },
  /** return a string with normalized punctuation, trimmed whitespace, and lowercased */
  normal: (ts) => {
    let normal = ts.terms.reduce((str, t) => {
      str += ' ' + t.render('normal');
      return str;
    }, '');
    normal = normal.trim();
    return normal;
  }
}
module.exports = terms
