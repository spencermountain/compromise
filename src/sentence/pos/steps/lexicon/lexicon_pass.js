'use strict';
const {lexicon, log} = require('../../paths')
const path = 'tagger/lexicon'

const lexicon_pass = function(s) {
  log.here(path)
  //loop through each term
  for (let i = 0; i < s.terms.length; i++) {
    let t = s.terms[i]
    if (lexicon[t.normal]) {
      log.change(t.normal + '  -> [' + lexicon[t.normal] + ']', path)
    // console.log(lexicon[t.normal])
    }
  }
  return
}

module.exports = lexicon_pass
