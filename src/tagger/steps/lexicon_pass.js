'use strict';
const p = require('../paths');
const lexicon = p.lexicon;
const log = p.log;
const path = 'tagger/lexicon';

const check_lexicon = (str) => {
  if (lexicon[str]) {
    return lexicon[str];
  }
  return null;
};

const lexicon_pass = function(s) {
  log.here(path);
  let found;
  //loop through each term
  for (let i = 0; i < s._terms.length; i++) {
    let t = s._terms[i];
    //check term without contraction
    if (t.text.match(/s'$/)) {
      let reduced = t.normal.replace(/s$/, '');
      found = check_lexicon(reduced);
      if (found) {
        t.tag(found, 'possessive-lexicon');
        continue;
      }
    }
    //don't over-write any known tags
    if (Object.keys(t.pos).length > 0) {
      continue;
    }
    //contraction lookup
    found = check_lexicon(t.silent_term);
    if (t.silent_term && found) {
      t.tag(found, 'silent_term-lexicon');
      continue;
    }
    //basic term lookup
    found = check_lexicon(t.normal);
    if (found) {
      t.tag(found, 'lexicon-match');
      continue;
    }

  }
  return s;
};

module.exports = lexicon_pass;
