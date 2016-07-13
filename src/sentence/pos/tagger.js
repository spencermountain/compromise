'use strict';

const rule = {
  lexicon_step: require('./steps/lexicon/lexicon_pass')
}
const tagger = function(s) {
  s = rule.lexicon_step(s)
  return s;
};

module.exports = tagger;
