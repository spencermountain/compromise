'use strict';
const log = require('../paths').log;
const rules = require('./data/punct_rules');
const path = 'tagger/punctuation';

const punctuation_step = function(s) {
  log.here(path);
  s.arr.forEach((t) => {
    //don't over-write any known tags
    if (Object.keys(t.pos).length > 0) {
      return;
    }
    //do punctuation rules (on t.text)
    for(let i = 0; i < rules.length; i++) {
      let r = rules[i];
      if (t.text.match(r.reg)) {
        t.tag(r.pos, 'punctuation-rule- "' + r.str + '"');
        return;
      }
    }

  });
  return s;
};

module.exports = punctuation_step;
