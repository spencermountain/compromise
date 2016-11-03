'use strict';
//check for "united" + "kingdom" in lexicon, and combine + tag it
const combine = require('./combine');
const p = require('../paths');
const log = p.log;
const lexicon = p.lexicon;
const fns = p.fns;
const path = 'tagger/multiple';

const combineMany = (s, i, count) => {
  for(let n = 0; n < count; n++) {
    combine(s, i);
  }
};

//try to concatenate multiple-words to get this term
const tryStringFrom = (want, start, s) => {
  let text = '';
  let normal = '';
  for(let i = start; i < s.terms.length; i++) {
    if (i === start) {
      text = s.terms[i].text;
      normal = s.terms[i].normal;
    } else {
      text += ' ' + s.terms[i].text;
      normal += ' ' + s.terms[i].normal;
    }
    //we've gone too far
    if (normal.length > want.length) {
      return false;
    }
    if (text === want || normal === want) {
      let count = i - start;
      combineMany(s, start, count);
      return true;
    }
  }
  return false;
};

const lexicon_lump = function(s) {
  log.here(path);
  let uLexicon = s.context.lexicon || {};
  //try the user's lexicon
  Object.keys(uLexicon).forEach((str) => {
    for(let i = 0; i < s.terms.length; i++) {
      if (fns.startsWith(str, s.terms[i].normal) || fns.startsWith(str, s.terms[i].text)) {
        if (tryStringFrom(str, i, s)) {
          s.terms[i].tagAs(uLexicon[str], 'user-lexicon-lump');
        }
      }
    }
  });
  return s;
};

module.exports = lexicon_lump;
