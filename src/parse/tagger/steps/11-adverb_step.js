'use strict';
const log = require('../paths').log;
const path = 'tagger/adverb';

//adverbs can be for verbs or nouns
const adverb_step = function(ts) {
  log.here(path);
  for(let i = 0; i < ts.length; i++) {
    let t = ts.get(i);
    if (t.tag.Adverb) {
      //find the next verb/adjective
      for(let o = 0; o < 7; o++) {
        //look forward first
        let after = ts.get(i + o);
        if (after) {
          if (after.tag.Verb) {
            t.tagAs('VerbPhrase', 'adverb-verb');
            break;
          }
          if (after.tag.Adjective) {
            t.tagAs('AdjectivePhrase', 'adverb-adj');
            break;
          }
        }
        //look before the adverb now
        let before = ts.get(i - o);
        if (before) {
          if (before.tag.Verb) {
            t.tagAs('VerbPhrase', 'verb-adverb');
            break;
          }
          if (before.tag.Adjective) {
            t.tagAs('AdjectivePhrase', 'adj-adverb');
            break;
          }
        }
      }

    }
  }
  return ts;
};

module.exports = adverb_step;
