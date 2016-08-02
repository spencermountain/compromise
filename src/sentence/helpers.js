'use strict';

exports.strip_terminator = (s) => {
  let t = s._terms[s._terms.length - 1];
  let m = t.text.match(/([\.\?\!])\W*$/);
  if (m) {
    let char = m[0];
    //remove from end of last term
    t.text = t.text.substr(0, t.text.length - char.length);
    return char;
  }
  return '';
};
