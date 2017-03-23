'use strict';
//check for "united" + "kingdom" in lexicon, and combine + tag it
// const combine = require('./combine');
const p = require('../paths');
const lexicon = p.lexicon;
const getFirstWords = require('./firstWord');
//build default-one
const lexFirst = getFirstWords(lexicon);

//see if this term is a multi-match
const tryHere = function(ts, i, obj) {
  let n = i + 1;
  //one
  if (obj[ts.slice(n, n + 1).out('normal')]) {
    return n + 1;
  }
  //two
  if (obj[ts.slice(n, n + 2).out('normal')]) {
    return n + 2;
  }
  //three
  if (obj[ts.slice(n, n + 3).out('normal')]) {
    return n + 3;
  }
  return null;
};

const lexicon_lump = function (ts) {
  //use default lexicon
  for(let i = 0; i < ts.terms.length - 1; i++) {
    let obj = lexFirst[ts.terms[i].normal];
    if (obj) {
      let n = tryHere(ts, i, obj);
      if (n) {
        let slice = ts.slice(i, n);
        let tag = lexicon[slice.out('normal')];
        slice.lump().tagAs(tag, 'lexicon-lump');
      }
    }
  }
  //try user's lexicon
  if (ts.lexicon) {
    let uFirst = getFirstWords(ts.lexicon);
    for(let i = 0; i < ts.terms.length - 1; i++) {
      let obj = uFirst[ts.terms[i].normal];
      if (obj) {
        let n = tryHere(ts, i, obj);
        if (n) {
          let slice = ts.slice(i, n);
          let tag = ts.lexicon[slice.out('normal')];
          slice.tagAs(tag, 'lexicon-lump');
          slice.lump();
        }
      }
    }
  }
  return ts;
};

module.exports = lexicon_lump;
