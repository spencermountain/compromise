'use strict';
'use strict';
const log = require('../paths').log;
const path = 'tagger/acronym_step';

const isAcronym = (t) => {
  //like N.D.A
  if (t.text.match(/([A-Z]\.)+[A-Z]?$/)) {
    return true;
  }
  //like 'F.'
  if (t.text.match(/^[A-Z]\.$/)) {
    return true;
  }
  //like NDA
  if (t.text.match(/[A-Z]{3}$/)) {
    return true;
  }
  return false;
};

const acronym_step = function(ts) {
  log.here(path);
  ts.terms.forEach((t) => {
    if (isAcronym(t)) {
      t.tagAs('Acronym');
    }
  });
  return ts;
};

module.exports = acronym_step;
