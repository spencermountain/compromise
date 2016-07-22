'use strict';
const rules = require('./data/word_rules');

const suffix_step = function(s) {
  for (let i = 0; i < s.terms.length; i++) {
    let t = s.terms[i];
    for (let o = 0; o < rules.length; o++) {
      let r = rules[o];
      if (t.normal.match(r.reg)) {
        t.tag(r.pos, 'suffix-step- "' + r.str + '"');
      }
    }
  }
  return;
};

module.exports = suffix_step;
