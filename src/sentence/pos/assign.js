'use strict';
const pos = require('./parts_of_speech');
const fns = require('../../fns');

//swap the Term object with a proper Pos class
const assign = function (t, tag, reason) {
  let old_pos = t.pos;
  let P = pos.classMapping[tag] || pos.Term;
  let implicit = t.implicit;
  t = new P(t.text, tag);
  t.reason = reason;
  t.implicit = implicit;
  t.pos = fns.extend(t.pos, old_pos);
  return t;
};
module.exports = assign;
