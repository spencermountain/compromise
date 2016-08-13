'use strict';
const log = require('../paths').log;
const path = 'tagger/datePass';

//non-destructively tag values & prepositions as dates
const datePass = function(s) {
  log.here(path);
  //set verbs as auxillaries
  for(let i = 0; i < s._terms.length; i++) {
    let t = s._terms[i];
  }
  return s;
};

module.exports = datePass;
