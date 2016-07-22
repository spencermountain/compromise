'use strict';
const p = require('./paths');
const lexicon = p.lexicon;
const log = p.log;
const path = 'tagger/lexicon';

const lexicon_pass = function(s) {
  log.here(path);
  //loop through each term
  for (let i = 0; i < s.terms.length; i++) {
    let t = s.terms[i];
    //basic match
    if (lexicon[t.normal]) {
      t.tag(lexicon[t.normal], 'lexicon-match');
    }
  }
  return s;
};

module.exports = lexicon_pass;
