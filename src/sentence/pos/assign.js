'use strict';
const pos = require('./parts_of_speech');

//set the part-of-speech of a particular term
const assign = function (t, tag, reason) {
  let P = pos.classMapping[tag] || pos.Term;
  let expansion = t.expansion;
  let whitespace = t.whitespace;
  t = new P(t.text, tag);
  t.reason = reason;
  t.whitespace = whitespace;
  t.expansion = expansion;
  return t;
};
module.exports = assign;
