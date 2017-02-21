'use strict';
//the steps and processes of pos-tagging
const contraction = {
  interpret: require('./contraction')
};
const lumper = {
  lexicon_lump: require('./lumper/lexicon_lump'),
  lump_two: require('./lumper/lump_two'),
  lump_three: require('./lumper/lump_three')
};
const step = {
  punctuation_step: require('./steps/01-punctuation_step'),
  lexicon_step: require('./steps/02-lexicon_step'),
  capital_step: require('./steps/03-capital_step'),
  web_step: require('./steps/04-web_step'),
  suffix_step: require('./steps/05-suffix_step'),
  neighbour_step: require('./steps/06-neighbour_step'),
  noun_fallback: require('./steps/07-noun_fallback'),
  date_step: require('./steps/08-date_step'),
  auxillary_step: require('./steps/09-auxillary_step'),
  negation_step: require('./steps/10-negation_step'),
  phrasal_step: require('./steps/12-phrasal_step'),
  comma_step: require('./steps/13-comma_step'),
  possessive_step: require('./steps/14-possessive_step'),
  value_step: require('./steps/15-value_step'),
  acronym_step: require('./steps/16-acronym_step'),
  emoji_step: require('./steps/17-emoji_step'),
  person_step: require('./steps/18-person_step'),
  quotation_step: require('./steps/19-quotation_step'),
  organization_step: require('./steps/20-organization_step'),
  plural_step: require('./steps/21-plural_step')
};
const corrections = require('./corrections');
const tagPhrase = require('./phrase');


const tagger = function (ts) {
  ts = step.punctuation_step(ts);
  ts = step.emoji_step(ts);
  ts = lumper.lexicon_lump(ts);
  ts = step.lexicon_step(ts);
  ts = step.web_step(ts);
  ts = step.suffix_step(ts);
  ts = step.neighbour_step(ts);
  ts = step.capital_step(ts);
  ts = step.noun_fallback(ts);
  ts = contraction.interpret(ts);
  ts = step.date_step(ts);
  ts = step.auxillary_step(ts);
  ts = step.negation_step(ts);
  ts = step.phrasal_step(ts);
  ts = step.comma_step(ts);
  ts = step.possessive_step(ts);
  ts = step.value_step(ts);
  ts = step.acronym_step(ts);
  ts = step.person_step(ts);
  ts = step.quotation_step(ts);
  ts = step.organization_step(ts);
  ts = step.plural_step(ts);
  //lump a couple times, for long ones
  for (let i = 0; i < 3; i++) {
    ts = lumper.lump_three(ts);
    ts = lumper.lump_two(ts);
  }
  ts = corrections(ts);
  ts = tagPhrase(ts);
  return ts;
};

module.exports = tagger;
