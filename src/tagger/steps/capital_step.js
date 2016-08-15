'use strict';
//titlecase is a signal for a noun
const log = require('../paths').log;
const path = 'tagger/capital';

const capital_logic = function(s) {
  log.here(path);
  //(ignore first word)
  for (let i = 1; i < s._terms.length; i++) {
    let t = s._terms[i];
    //has a capital, but isn't too weird.
    if (t.is('titleCase') && t.is('word')) {
      t.tag('Noun', 'capital-step');
    }
  }
  return s;
};

module.exports = capital_logic;
