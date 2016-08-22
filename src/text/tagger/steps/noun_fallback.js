'use strict';
const log = require('../paths').log;
const path = 'tagger/noun_fallback';
//tag word as noun if we know nothing about it, still.

const noun_fallback = function(s) {
  log.here(path);
  for (let i = 0; i < s.arr.length; i++) {
    let t = s.arr[i];
    //fail-fast
    if (t.tag.Noun || t.tag.Verb) {
      continue;
    }
    //ensure it only has the tag 'Term'
    let tags = Object.keys(t.tag);
    if (tags.length === 0) {
      //ensure it's atleast word-looking
      if (t.is('word') === false) {
        continue;
      }
      t.tagAs('Noun', 'noun-fallback');
    }
  }
  return s;
};

module.exports = noun_fallback;
