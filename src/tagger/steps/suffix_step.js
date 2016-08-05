'use strict';
const log = require('../paths').log;
const rules = require('./data/word_rules');
const path = 'tagger/suffix';

const suffix_step = function(s) {
  log.here(path);
  s._terms.forEach((t) => {
    //don't over-write any known tags
    if (Object.keys(t.pos).length > 0) {
      return;
    }
    //do normalized rules (on t.normal)
    for (let o = 0; o < rules.length; o++) {
      let r = rules[o];
      if (t.normal.match(r.reg)) {
        t.tag(r.pos, 'word-rule- "' + r.str + '"');
        return;
      }
    }
  });
  return s;
};

module.exports = suffix_step;
