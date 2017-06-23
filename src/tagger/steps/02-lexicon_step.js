'use strict';
const split = require('../contraction/split');
const l = require('../../lexicon');
const lexicon = l.lexicon;
const firstWords = l.firstWords;

const check_lexicon = (str, sentence) => {
  //check a user's custom lexicon
  let custom = sentence.lexicon || {};
  if (custom.hasOwnProperty(str)) {
    return custom[str];
  }
  //check internal lexicon
  if (lexicon.hasOwnProperty(str)) {
    return lexicon[str];
  }
  return null;
};

const findTwoWords = function(ts, i) {
  let want = firstWords[ts.terms[i].normal];
  //try 2 words
  if (!ts.terms[i + 1]) {
    return false;
  }
  let str = ts.terms[i + 1].normal;
  if (want[str] === true) {
    let tag = lexicon[ts.terms[i].normal + ' ' + str];
    ts.terms[i].tag(tag, 'lexicon-multi');
    ts.terms[i + 1].tag(tag, 'lexicon-multi');
    return true;
  }
  return false;
};

const findThreeWords = function(ts, i) {
  let want = firstWords[ts.terms[i].normal];
  //try 3 words
  if (!ts.terms[i + 2]) {
    return false;
  }
  let str = ts.terms[i + 1].normal + ' ' + ts.terms[i + 2].normal;
  if (want[str] === true) {
    let tag = lexicon[ts.terms[i].normal + ' ' + str];
    ts.terms[i].tag(tag, 'lexicon-multi');
    ts.terms[i + 1].tag(tag, 'lexicon-multi');
    ts.terms[i + 2].tag(tag, 'lexicon-multi');
    return true;
  }
  return false;
};

const lexicon_pass = function(ts) {
  let found;
  //loop through each term
  for (let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];

    //try multiple-words in the lexicon
    if (firstWords[t.normal]) {
      if (findTwoWords(ts, i) === true) {
        i += 1;
        continue;
      }
      if (findThreeWords(ts, i) === true) {
        i += 2;
        continue;
      }
    }
    //basic term lookup
    found = check_lexicon(t.normal, ts);
    if (found) {
      t.tag(found, 'lexicon-match');
      continue;
    }
    //support silent_term matches
    found = check_lexicon(t.silent_term, ts);
    if (t.silent_term && found) {
      t.tag(found, 'silent_term-lexicon');
      continue;
    }
    // found = check_lexicon(t.text, ts);
    // if (found) {
    //   t.tag(found, 'lexicon-match-text');
    //   continue;
    // }
    //support contractions (manually)
    let parts = split(t);
    if (parts && parts.start) {
      found = check_lexicon(parts.start.toLowerCase(), ts);
      if (found) {
        t.tag(found, 'contraction-lexicon');
        continue;
      }
    }
  }
  return ts;
};

module.exports = lexicon_pass;
