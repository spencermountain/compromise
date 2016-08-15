'use strict';
const log = require('../paths').log;
const path = 'tagger/noun_fallback';
//tag word as noun if we know nothing about it, still.

const noun_fallback = function(s) {
  log.here(path);
  for (let i = 0; i < s._terms.length; i++) {
    let t = s._terms[i];
    //fail-fast
    if (t.pos.Noun || t.pos.Verb) {
      continue;
    }
    //ensure it only has the tag 'Term'
    let tags = Object.keys(t.pos);
    if (tags.length === 0) {
      //ensure it's atleast word-looking
      if (t.is('word') === false) {
        continue;
      }
      t.tag('Noun', 'noun-fallback');
    }
  }
  return s;
};

module.exports = noun_fallback;
