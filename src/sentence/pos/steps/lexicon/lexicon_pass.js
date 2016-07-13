'use strict';
const lexicon = require('../../../lexicon/lexicon')
const lexicon_pass = function(s) {
  //loop through each term
  for (let i = 0; i < s.terms.length; i++) {
    let t = s.terms[i]
    if (lexicon[t.normal]) {
      console.log(lexicon[t.normal])
    }
  }
  return
}

module.exports = lexicon_pass
