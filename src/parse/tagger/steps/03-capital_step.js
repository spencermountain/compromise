'use strict';
//titlecase is a signal for a noun
const log = require('../paths').log;
const path = 'tagger/capital';

const capital_logic = function(s) {
  log.here(path);
  //(ignore first word)
  for (let i = 1; i < s.terms.length; i++) {
    let t = s.terms[i];
    //has a capital, but isn't too weird.
    if (t.is('titlecase') && t.is('word')) {
      t.tagAs('Noun', 'capital-step');
      t.tagAs('TitleCase', 'capital-step');
    }
  }
  //support first-word of sentence as proper titlecase
  let t = s.terms[0];
  if (t && t.is('titlecase')) {
    if (t.tag.Person || t.tag.Organization || t.tag.Place) {
      t.tagAs('TitleCase', 'first-term-capital');
    }
  }
  return s;
};

module.exports = capital_logic;
