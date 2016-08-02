'use strict';
const log = require('../paths').log;
const path = 'tagger/wrestle';
//take basic POS like 'Noun' and try to find a more aggressive POS
const wrestle = function(s) {
  log.here(path);
  s._terms = s._terms.map((t) => {
    return t.to('Specific')
  })
  return s
}

module.exports = wrestle
