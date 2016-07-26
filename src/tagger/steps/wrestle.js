'use strict';
//take basic POS like 'Noun' and try to find a more aggressive POS
const wrestle = function(s) {
  s.terms = s.terms.map((t) => {
    return t.to('Specific')
  })
  return s
}

module.exports = wrestle
