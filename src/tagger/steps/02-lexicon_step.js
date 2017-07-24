'use strict';
const split = require('../contraction/split');
// const l = require('../../lexicon/init');
// const lexicon = l.lexicon;

const lexicon_pass = function(ts) {
  const lexicon = ts.world.lexicon || {};
  // let uLex = ts.lexicon || {};
  // uLex = uLex.lexicon;
  //loop through each term
  for (let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    let str = t.normal;
    //user-lexicon lookup
    // if (uLex && uLex.hasOwnProperty(str) === true) {
    //   t.tag(uLex[str], 'user-lexicon');
    //   continue;
    // }
    //basic term lookup
    if (lexicon.hasOwnProperty(str) === true) {
      t.tag(lexicon[str], 'lexicon');
      continue;
    }
    //support silent_term matches
    if (t.silent_term && lexicon.hasOwnProperty(t.silent_term) === true) {
      t.tag(lexicon[t.silent_term], 'silent_term-lexicon');
      continue;
    }
    //check root version too
    if (t.root && t.normal !== t.root) {
      // if (uLex && uLex.hasOwnProperty(t.root) === true) {
      //   t.tag(uLex[t.root], 'user-lexicon');
      //   continue;
      // }
      if (lexicon.hasOwnProperty(t.root) === true) {
        t.tag(lexicon[t.root], 'lexicon');
        continue;
      }
    }
    //support contractions (manually)
    let parts = split(t);
    if (parts && parts.start) {
      let start = parts.start.toLowerCase();
      if (lexicon.hasOwnProperty(start) === true) {
        t.tag(lexicon[start], 'contraction-lexicon');
        continue;
      }
    }
  }
  return ts;
};

module.exports = lexicon_pass;
