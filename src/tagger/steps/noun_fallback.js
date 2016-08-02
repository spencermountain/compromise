'use strict';
//tag word as noun if we know nothing about it, still.

const noun_fallback = function(s) {
  for (let i = 0; i < s._terms.length; i++) {
    //fail-fast
    if (s._terms[i].pos.Noun || s._terms[i].pos.Verb) {
      continue;
    }
    //ensure it only has the tag 'Term'
    let tags = Object.keys(s._terms[i].pos);
    if (tags.length === 0) {
      //ensure it's atleast word-looking
      if (s._terms[i].is('wordlike') === false) {
        continue;
      }
      s._terms[i].tag('Noun', 'noun-fallback');
    }
  }
  return s;
};

module.exports = noun_fallback;
