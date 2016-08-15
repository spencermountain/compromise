'use strict';
const p = require('../paths');
const lexicon = p.lexicon;
const log = p.log;
const path = 'tagger/lexicon';

const check_lexicon = (str, sentence) => {
  //check a user's custom lexicon
  let custom = sentence.context.lexicon || {};
  if (custom[str]) {
    return custom[str];
  }
  if (lexicon[str]) {
    return lexicon[str];
  }
  return null;
};

const lexicon_pass = function(s) {
  log.here(path);
  let found;
  //loop through each term
  for (let i = 0; i < s.arr.length; i++) {
    let t = s.arr[i];
    //check term without contraction
    if (t.text.match(/s'$/)) {
      let reduced = t.normal.replace(/s$/, '');
      found = check_lexicon(reduced, s);
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
    found = check_lexicon(t.silent_term, s);
    if (t.silent_term && found) {
      t.tag(found, 'silent_term-lexicon');
      continue;
    }
    //basic term lookup
    found = check_lexicon(t.normal, s);
    if (found) {
      t.tag(found, 'lexicon-match');
      continue;
    }

  }
  return s;
};

module.exports = lexicon_pass;
