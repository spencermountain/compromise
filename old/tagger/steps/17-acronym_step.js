'use strict';

//tag 'FBI' as letters-representing-words.
//we guess if letters are an acronym in the Term class.
const acronym_step = function(ts) {
  ts.terms.forEach((t) => {
    if (t.isAcronym()) {
      t.tag('Acronym', 'acronym-step');
    }
  });
  return ts;
};

module.exports = acronym_step;
