'use strict';
const log = require('../log')

const rule = {
  lexicon_step: require('./steps/known_words/lexicon_pass')
}
const tagger = function(s) {
  log.here('tagger')
  s = rule.lexicon_step(s)
  return s;
};

module.exports = tagger;
