'use strict';
const log = require('../paths').log;
const rules = require('./data/punct_rules');
const path = 'tagger/punctuation';

//not so smart (right now)
const isRomanNumeral = function(t) {
  if (!t.canBe('RomanNumeral')) {
    return false;
  }
  const str = t.text;
  if (str.length > 1 && str.match(/^[IVXCM]+$/)) {
    return true;
  }
  return false;
};

const oneLetters = {
  a: true,
  i: true,
  //internet-slang
  u: true,
  r: true,
  c: true,
  k: true
};

const punctuation_step = function (ts) {
  log.here(path);
  ts.terms.forEach((t) => {
    let str = t.text;
    //anything can be titlecase
    if (str.match(/^[A-Z][a-z']/)) {
      t.tagAs('TitleCase', 'punct-rule');
    }
    //ok, normalise it a little,
    str = str.replace(/[,\.\?]$/, '');
    //do punctuation rules (on t.text)
    for (let i = 0; i < rules.length; i++) {
      let r = rules[i];
      if (str.match(r.reg)) {
        //don't over-write any other known tags
        if (t.canBe(r.tag)) {
          t.tagAs(r.tag, 'punctuation-rule- "' + r.str + '"');
        }
        return;
      }
    }
    //terms like 'e'
    if (str.length === 1 && !oneLetters[str.toLowerCase()]) {
      t.tagAs('Acronym', 'one-letter-acronym');
    }
    //roman numerals (weak rn)
    if (isRomanNumeral(t)) {
      t.tagAs('RomanNumeral', 'is-roman-numeral');
    }

  });
  return ts;
};

module.exports = punctuation_step;
