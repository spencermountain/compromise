'use strict';
const log = require('../paths').log;
const rules = require('./data/punct_rules');
const path = 'tagger/punctuation';

const punctuation_step = function(ts) {
  log.here(path);
  ts.terms.forEach((t) => {
    //don't over-write any known tags
    if (Object.keys(t.tag).length > 0) {
      return;
    }
    //do punctuation rules (on t.text)
    for(let i = 0; i < rules.length; i++) {
      let r = rules[i];
      if (t.text.match(r.reg)) {
        t.tagAs(r.tag, 'punctuation-rule- "' + r.str + '"');
        return;
      }
    }

  });
  return ts;
};

module.exports = punctuation_step;
