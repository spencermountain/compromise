'use strict';
const log = require('../paths').log;
const isPlural = require('../../../result/subset/nouns/isPlural');
const path = 'tagger/plural';

const pluralStep = function(ts) {
  log.here(path);
  for(let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    if (t.tag.Noun) {
      //skip existing fast
      if (t.tag.Singular || t.tag.Plural) {
        continue;
      }
      //check if it's plural
      let plural = isPlural(t); //can be null if unknown
      if (plural) {
        t.tagAs('Plural', 'pluralStep');
      } else if (plural === false) {
        // console.log(t.normal, plural);
        t.tagAs('Singular', 'pluralStep');
      }
    }
  }
  return ts;
};

module.exports = pluralStep;
