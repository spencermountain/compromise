'use strict';
//tag word as noun if we know nothing about it, still.

const noun_fallback = function(s) {
  for (let i = 0; i < s.terms.length; i++) {
    //fail-fast
    if (s.terms[i].pos.Noun || s.terms[i].pos.Verb) {
      continue;
    }
    //ensure it only has the tag 'Term'
    let tags = Object.keys(s.terms[i].pos);
    if (tags.length === 0) {
      //ensure it's atleast word-looking
      if (s.terms[i].is('wordlike') === false) {
        continue;
      }
      s.terms[i].tag('Noun', 'noun-fallback');
    }
  }
  return s;
};

module.exports = noun_fallback;
