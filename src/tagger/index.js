'use strict';
const log = require('../log');

const step = {
  lexicon_step: require('./steps/lexicon_pass'),
  capital_step: require('./steps/capital_step'),
  suffix_step: require('./steps/suffix_step'),
  web_step: require('./steps/web_step')
};

const lumper = {
  lump_two: require('./lumper/lump_two'),
  lump_three: require('./lumper/lump_three')
};

const tagger = function(s) {
  log.here('tagger');
  s = step.lexicon_step(s);
  s = step.capital_step(s);
  s = step.web_step(s);
  s = step.suffix_step(s);
  s = lumper.lump_two(s);
  s = lumper.lump_three(s);
  return s;
};

module.exports = tagger;
