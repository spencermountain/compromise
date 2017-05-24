'use strict';
//check for "united" + "kingdom" in lexicon, and combine + tag it
// const combine = require('./combine');
const p = require('../paths');
const lexicon = p.lexicon;
const tries = p.tries;
const getFirstWords = require('./firstWord');
//build default-one
const lexiconFirst = getFirstWords([lexicon, tries.multiples()]);

//see if this term is a multi-match
const tryHere = function(ts, i, obj) {
  let n = i + 1;
  //one
  let str = ts.slice(n, n + 1).out('root');
  if (obj.hasOwnProperty(str) === true) {
    return n + 1;
  }
  //two
  str = ts.slice(n, n + 2).out('root');
  if (obj.hasOwnProperty(str)) {
    return n + 2;
  }
  //three
  str = ts.slice(n, n + 3).out('root');
  if (obj.hasOwnProperty(str)) {
    return n + 3;
  }
  return null;
};

//try all terms with this lexicon
const tryAll = function(lexFirst, ts) {
  for(let i = 0; i < ts.terms.length - 1; i++) {
    if (lexFirst.hasOwnProperty(ts.terms[i].root)) {
      let obj = lexFirst[ts.terms[i].root];
      let n = tryHere(ts, i, obj);
      if (n) {
        let str = ts.slice(i + 1, n).out('root');
        if (obj.hasOwnProperty(str) === true) {
          let tag = obj[str];
          let slice = ts.slice(i, n);
          slice.tag(tag, 'lexicon-lump');
        }
      }
    }
  }
  return ts;
};

//use default lexicon
const defaultLex = function (ts) {
  ts = tryAll(lexiconFirst, ts);
  return ts;
};
//try user's lexicon
const userLex = function (ts) {
  if (ts.lexicon) {
    let uFirst = getFirstWords([ts.lexicon]);
    ts = tryAll(uFirst, ts);
  }
  return ts;
};

module.exports = {
  defaultLex: defaultLex,
  userLex: userLex
};
