'use strict';
//titlecase is a signal for a noun
const log = require('../paths').log;
const path = 'tagger/capital';

const capital_logic = function(s) {
  log.here(path);
  //(ignore first word)
  for (let i = 1; i < s.arr.length; i++) {
    let t = s.arr[i];
    //has a capital, but isn't too weird.
    if (t.is('titleCase') && t.is('word')) {
      t.tagAs('Noun', 'capital-step');
    }
  }
  return s;
};

module.exports = capital_logic;
