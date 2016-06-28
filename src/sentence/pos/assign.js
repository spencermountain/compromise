'use strict';
const pos = require('./parts_of_speech');

//set the part-of-speech of a particular term
const assign = function (t, tag, reason) {
  //check if redundant, first
  if (t.pos[tag]) {
    return t;
  }
  let P = pos.classMapping[tag] || pos.Term;
  let expansion = t.expansion;
  let whitespace = t.whitespace;
  let reasoning = t.reasoning;
  t = new P(t.text, tag);
  t.reasoning = reasoning;
  t.reasoning.push(reason);
  t.whitespace = whitespace;
  t.expansion = expansion;
  return t;
};
module.exports = assign;
