'use strict';
//seperate the 'meat' from the trailing/leading whitespace.
//works in concert with ./src/result/tokenize.js
const build_whitespace = (str) => {
  let whitespace = {
    before: '',
    after: ''
  };
  //get before punctuation/whitespace
  let m = str.match(/^(\s|-+|\.\.+)+/);
  if (m) {
    whitespace.before = m[0];
    str = str.replace(/^(\s|-+|\.\.+)+/, '');
  }
  //get after punctuation/whitespace
  m = str.match(/(\s+|-+|\.\.+)$/);
  if (m) {
    str = str.replace(/(\s+|-+|\.\.+)$/, '');
    whitespace.after = m[0];
  }
  return {
    whitespace: whitespace,
    text: str
  };
};
module.exports = build_whitespace;
