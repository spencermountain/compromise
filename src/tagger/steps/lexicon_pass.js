'use strict';
const p = require('../paths');
const lexicon = p.lexicon;
const log = p.log;
const path = 'tagger/lexicon';

const check_lexicon = (str) => {
  if (lexicon[str]) {
    return lexicon[str];
  }
  //normalize it a bit
  // str = str.replace(/\bnot\b/, '');
  // str = str.replace(/\bwill\b/, '');
  // str = str.replace(/\bwon't\b/, '');
  // str = str.replace(/\bhave(n't)?\b/, '');
  // str = str.trim();
  // if (lexicon[str]) {
  //   return lexicon[str];
  // }
  return null;
};

const lexicon_pass = function(s) {
  log.here(path);
  //loop through each term
  for (let i = 0; i < s._terms.length; i++) {
    let t = s._terms[i];
    //contraction lookup
    let found = check_lexicon(t.silent_term);
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
