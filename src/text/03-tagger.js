'use strict';
const tg = require('./tagger');
const step = tg.step;
const lumper = tg.lumper;
const contraction = tg.contraction;

const tagger = function(s) {
  s = step.punctuation_step(s);
  s = lumper.lexicon_lump(s);
  s = step.lexicon_step(s);
  s = step.capital_step(s);
  s = step.web_step(s);
  s = step.suffix_step(s);
  s = step.neighbour_step(s);
  s = step.noun_fallback(s);
  s = contraction.interpret(s);
  s = step.corrections(s);
  s = step.date_pass(s);
  for (let i = 0; i < 2; i++) {
    s = lumper.lump_three(s);
    s = lumper.lump_two(s);
  }
  return s;
};

module.exports = tagger;
