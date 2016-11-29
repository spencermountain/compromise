'use strict';
const log = require('../paths').log;
const rules = require('./data/punct_rules');
const path = 'tagger/punctuation';

const oneLetters = {
  a: true,
  i: true,
  //e-speak
  u: true,
  r: true,
  c: true,
  k: true
}

const punctuation_step = function (ts) {
  log.here(path);
  ts.terms.forEach((t) => {
    //don't over-write any known tags
    if (Object.keys(t.tag).length > 0) {
      return;
    }
    //ok, normalise it a little,
    let str = t.text
    str = str.replace(/[,\.\?]$/, '')
      //do punctuation rules (on t.text)
    for (let i = 0; i < rules.length; i++) {
      let r = rules[i];
      if (str.match(r.reg)) {
        t.tagAs(r.tag, 'punctuation-rule- "' + r.str + '"');
        return;
      }
    }
    //terms like 'e'
    if (str.length === 1 && !oneLetters[str]) {
      t.tagAs('Acronym', 'one-letter-acronym')
    }

  });
  return ts;
};

module.exports = punctuation_step;
