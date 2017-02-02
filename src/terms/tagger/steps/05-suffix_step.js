'use strict';
const log = require('../paths').log;
const rules = require('./data/word_rules');
const path = 'tagger/suffix';

const suffix_step = function(s) {
  log.here(path);
  s.terms.forEach((t) => {
    //do normalized rules (on t.normal)
    for (let o = 0; o < rules.length; o++) {
      let r = rules[o];
      if (t.normal.match(r.reg)) {
        //don't over-write any other known tags
        if (t.canBe(r.tag)) {
          t.tagAs(r.tag, 'word-rule- "' + r.str + '"');
        }
        return;
      }
    }
  });
  return s;
};

module.exports = suffix_step;
