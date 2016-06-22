'use strict';
const pos = require('../parts_of_speech');

//get the combined text
const new_string = function(a, b) {
  let space = a.whitespace.trailing + b.whitespace.preceding;
  return a.text + space + b.text;
};

const combine = function(terms, i, tag, reason) {
  let a = terms[i];
  let b = terms[i + 1];
  //fail-fast
  if (!a || !b) {
    return terms;
  }
  //find the new Pos class
  let Pos = pos.classMapping[tag] || pos.Term;
  terms[i] = new Pos(new_string(a, b), tag);
  //copy-over reasoning
  terms[i].reasoning = a.reasoning.concat(b.reasoning);
  terms[i].reasoning.push(reason);
  //combine whitespace
  terms[i].whitespace.preceding = a.whitespace.preceding;
  terms[i].whitespace.trailing = b.whitespace.trailing;
  //kill 'b'
  terms[i + 1] = null;
  return terms;
};

module.exports = combine;
