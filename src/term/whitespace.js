'use strict';
const build_whitespace = (str) => {
  let whitespace = {
    before: '',
    after: ''
  };
  //get before
  let m = str.match(/^\s+/);
  if (m) {
    whitespace.before = m[0];
  }
  //get after
  m = str.match(/\s+$/);
  if (m) {
    whitespace.after = m[0];
  }
  return whitespace;
};
module.exports = build_whitespace;
