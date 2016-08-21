'use strict';
let p = require('./paths');
let lexicon = p.lexicon;
let fns = p.fns;
let log = p.log;

const step = {
  lexicon_step: require('./steps/lexicon_pass'),
  capital_step: require('./steps/capital_step'),
  suffix_step: require('./steps/suffix_step'),
  web_step: require('./steps/web_step'),
  date_pass: require('./steps/date_pass'),
  neighbour_step: require('./steps/neighbour_step'),
  // wrestle: require('./steps/wrestle'),
  noun_fallback: require('./steps/noun_fallback'),
  punctuation_step: require('./steps/punctuation_step'),
  corrections: require('./steps/corrections')
};

const interpret_contractions = require('./contraction');

const lumper = {
  lexicon_lump: require('./lumper/lexicon_lump'),
  lump_two: require('./lumper/lump_two'),
  lump_three: require('./lumper/lump_three')
};

const tagger = function(s) {
  s = step.punctuation_step(s);
  s = lumper.lexicon_lump(s);
  s = step.lexicon_step(s);
  s = step.capital_step(s);
  s = step.web_step(s);
  s = step.suffix_step(s);
  s = step.neighbour_step(s);
  s = step.noun_fallback(s);
  s = interpret_contractions(s);
  s = step.corrections(s);
  s = step.date_pass(s);
  for (let i = 0; i < 2; i++) {
    s = lumper.lump_three(s);
    s = lumper.lump_two(s);
  // s = step.wrestle(s);
  }
  return s;
};

module.exports = tagger;
