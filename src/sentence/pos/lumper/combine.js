'use strict';
const pos = require('../parts_of_speech');
const fns = require('../../../fns');

//get the combined text
const new_string = function(a, b) {
  let space = a.whitespace.trailing + b.whitespace.preceding;
  return a.text + space + b.text;
};

const combine_two = function(terms, i, tag, reason) {
  let a = terms[i];
  let b = terms[i + 1];
  //fail-fast
  if (!a || !b) {
    return terms;
  }
  //keep relevant/consistant old POS tags
  let old_pos = {};
  if (a.pos[tag]) {
    old_pos = a.pos;
  }
  if (b.pos[tag]) {
    old_pos = fns.extend(old_pos, b.pos);
  }
  //find the new Pos class
  let Pos = pos.classMapping[tag] || pos.Term;
  terms[i] = new Pos(new_string(a, b), tag);
  //copy-over reasoning
  terms[i].reasoning = [a.reasoning.join(', '), b.reasoning.join(', ')];
  terms[i].reasoning.push(reason);
  //copy-over old pos
  terms[i].pos = fns.extend(terms[i].pos, old_pos);
  //combine whitespace
  terms[i].whitespace.preceding = a.whitespace.preceding;
  terms[i].whitespace.trailing = b.whitespace.trailing;
  //kill 'b'
  terms[i + 1] = null;
  return terms;
};

const combine_three = function(terms, i, tag, reason) {
  let a = terms[i];
  let b = terms[i + 1];
  let c = terms[i + 2];
  //fail-fast
  if (!a || !b || !c) {
    return terms;
  }
  let Pos = pos.classMapping[tag] || pos.Term;
  let space1 = a.whitespace.trailing + b.whitespace.preceding;
  let space2 = b.whitespace.trailing + c.whitespace.preceding;
  let text = a.text + space1 + b.text + space2 + c.text;
  terms[i] = new Pos(text, tag);
  terms[i].reasoning = [a.reasoning.join(', '), b.reasoning.join(', ')];
  terms[i].reasoning.push(reason);
  //transfer unused-up whitespace
  terms[i].whitespace.preceding = a.whitespace.preceding;
  terms[i].whitespace.trailing = c.whitespace.trailing;
  terms[i + 1] = null;
  terms[i + 2] = null;
  return terms;
};

module.exports = {
  two: combine_two,
  three: combine_three,
};
