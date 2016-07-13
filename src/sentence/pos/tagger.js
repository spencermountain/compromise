'use strict';
<<<<<<< Updated upstream
// const lexicon = require('../../lexicon/lexicon');
let logger = require('../../log')

const tagger = function(s) {
  let log = logger(s.context.debug)
  log('--tagging-- "' + s.input + '"')
=======
const rule = {
  lexicon_step: require('./steps/lexicon/lexicon_pass')
}
const tagger = function(s) {
  s = rule.lexicon_step(s)
>>>>>>> Stashed changes
  return s;
};

module.exports = tagger;
