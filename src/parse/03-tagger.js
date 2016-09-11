'use strict';
const tg = require('./tagger');
const step = tg.step;
const lumper = tg.lumper;
const contraction = tg.contraction;

const tagger = function(ts) {
  ts = step.punctuation_step(ts);
  ts = lumper.lexicon_lump(ts);
  ts = step.lexicon_step(ts);
  ts = step.capital_step(ts);
  ts = step.web_step(ts);
  ts = step.suffix_step(ts);
  ts = step.neighbour_step(ts);
  ts = step.noun_fallback(ts);
  ts = contraction.interpret(ts);
  ts = step.date_step(ts);
  ts = step.auxillary_step(ts);
  ts = step.negation_step(ts);
  // ts = step.adverb_step(ts);
  ts = step.phrasal_step(ts);
  // ts = step.correction_step(ts);
  for (let i = 0; i < 2; i++) {
    ts = lumper.lump_three(ts);
    ts = lumper.lump_two(ts);
  }
  return ts;
};

module.exports = tagger;
