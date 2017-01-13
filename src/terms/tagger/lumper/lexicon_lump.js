'use strict';
//check for "united" + "kingdom" in lexicon, and combine + tag it
const combine = require('./combine');
const p = require('../paths');
const log = p.log;
const lexicon = p.lexicon;
const fns = p.fns;
const path = 'tagger/multiple';

const combineMany = (ts, i, count) => {
  for (let n = 0; n < count; n++) {
    combine(ts, i);
  }
};

//try to concatenate multiple-words to get this term
const tryStringFrom = (want, start, ts) => {
  let text = '';
  let normal = '';
  let simple = '';
  for (let i = start; i < ts.terms.length; i++) {
    if (i === start) {
      text = ts.terms[i].text;
      normal = ts.terms[i].normal;
      simple = ts.terms[i].root;
    } else {
      text += ' ' + ts.terms[i].text;
      normal += ' ' + ts.terms[i].normal;
      simple += ' ' + ts.terms[i].root;
    }
    //we've gone too far
    if (text === want || normal === want || simple === want) {
      let count = i - start;
      combineMany(ts, start, count);
      return true;
    }
    if (normal.length > want.length) {
      return false;
    }
  }
  return false;
};

const lexicon_lump = function (ts) {
  log.here(path);
  let uLexicon = ts.lexicon || {};

  //try the simpler, known lexicon
  for (let i = 0; i < ts.terms.length - 1; i++) {
    //try 'A'+'B'
    let normal = ts.terms[i].normal + ' ' + ts.terms[i + 1].normal;
    let text = ts.terms[i].text + ' ' + ts.terms[i + 1].text;
    let pos = lexicon[normal] || lexicon[text];
    if (pos) {
      combine(ts, i);
      ts.terms[i].tagAs(pos, 'multiples-lexicon');
    }
  }

  //try the user's lexicon
  Object.keys(uLexicon).forEach((str) => {
    for (let i = 0; i < ts.terms.length; i++) {
      if (fns.startsWith(str, ts.terms[i].normal) || fns.startsWith(str, ts.terms[i].text)) {
        if (tryStringFrom(str, i, ts)) {
          ts.terms[i].tagAs(uLexicon[str], 'user-lexicon-lump');
        }
      }
    }
  });
  return ts;
};

module.exports = lexicon_lump;
