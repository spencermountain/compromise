'use strict';
const log = require('../log')

const step = {
  lexicon_step: require('./steps/known_words/lexicon_pass'),
  capital_step: require('./steps/rules/capital_step'),
  suffix_step: require('./steps/rules/suffix_step')
}
const tagger = function(s) {
  log.here('tagger')
  s = step.lexicon_step(s)
  s = step.capital_step(s)
  s = step.suffix_step(s)
  return s;
};

module.exports = tagger;
