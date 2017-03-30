'use strict';
const isPlural = require('../../result/subset/nouns/isPlural');

const pluralStep = function(ts) {
  for(let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    if (t.tags.Noun) {
      //skip existing fast
      if (t.tags.Singular || t.tags.Plural) {
        continue;
      }
      //check if it's plural
      let plural = isPlural(t); //can be null if unknown
      if (plural) {
        t.tag('Plural', 'pluralStep');
      } else if (plural === false) {
        // console.log(t.normal, plural);
        t.tag('Singular', 'pluralStep');
      }
    }
  }
  return ts;
};

module.exports = pluralStep;
