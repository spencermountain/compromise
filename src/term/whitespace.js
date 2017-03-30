'use strict';
const before = /^(\s|-+|\.\.+)+/;
const after = /(\s+|-+|\.\.+)$/;
//seperate the 'meat' from the trailing/leading whitespace.
//works in concert with ./src/result/tokenize.js
const build_whitespace = (str) => {
  let whitespace = {
    before: '',
    after: ''
  };
  //get before punctuation/whitespace
  let m = str.match(before);
  if (m !== null) {
    whitespace.before = m[0];
    str = str.replace(before, '');
  }
  //get after punctuation/whitespace
  m = str.match(after);
  if (m !== null) {
    str = str.replace(after, '');
    whitespace.after = m[0];
  }
  return {
    whitespace: whitespace,
    text: str
  };
};
module.exports = build_whitespace;
