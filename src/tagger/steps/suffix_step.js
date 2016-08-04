'use strict';
const log = require('../paths').log;
const rules = require('./data/word_rules');
const path = 'tagger/suffix';

const suffix_step = function(s) {
  log.here(path);
  for (let i = 0; i < s._terms.length; i++) {
    let t = s._terms[i];
    //don't over-write any known tags
    if (Object.keys(s._terms[i].pos).length > 0) {
      continue;
    }
    for (let o = 0; o < rules.length; o++) {
      let r = rules[o];
      if (t.normal.match(r.reg)) {
        t.tag(r.pos, 'suffix-step- "' + r.str + '"');
        break;
      }
    }
  }
  return s;
};

module.exports = suffix_step;
