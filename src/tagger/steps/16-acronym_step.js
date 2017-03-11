'use strict';
'use strict';
const log = require('../paths').log;
const path = 'tagger/acronym_step';

const acronym_step = function(ts) {
  log.here(path);
  ts.terms.forEach((t) => {
    if (t.isAcronym()) {
      t.tagAs('Acronym', 'acronym-step');
    }
  });
  return ts;
};

module.exports = acronym_step;
