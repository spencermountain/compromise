'use strict';
const log = require('../paths').log;
const path = 'tagger/wrestle';
//take basic POS like 'Noun' and try to find a more aggressive POS
const wrestle = function(s) {
  log.here(path);
  s.terms = s.terms.map((t) => {
    console.log(t.pos)
    return t.to('Specific')
  })
  return s
}

module.exports = wrestle
