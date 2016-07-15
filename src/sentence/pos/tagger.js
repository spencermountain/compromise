'use strict';
const {log} = require('./paths')

const rule = {
  lexicon_step: require('./steps/lexicon/lexicon_pass')
}
const tagger = function(s) {
  log.here('tagger')
  s = rule.lexicon_step(s)
  return s;
};

module.exports = tagger;
