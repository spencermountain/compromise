'use strict';
//the steps and processes of pos-tagging
const step = {
  punctuation_step: require('./steps/01-punctuation_step'),
  emoji_step: require('./steps/02-emoji_step'),
  lexicon_step: require('./steps/03-lexicon_step'),
  lexicon_multi: require('./steps/04-lexicon_multi'),
  web_step: require('./steps/05-web_step'),
  suffix_step: require('./steps/06-suffix_step'),
  neighbour_step: require('./steps/07-neighbour_step'),
  capital_step: require('./steps/08-capital_step'),
  noun_fallback: require('./steps/09-noun_fallback'),
  contraction: require('./steps/10-contraction_step'),
  date_step: require('./steps/11-date_step'),
  auxiliary_step: require('./steps/12-auxiliary_step'),
  negation_step: require('./steps/13-negation_step'),
  comma_step: require('./steps/14-comma_step'),
  quotation_step: require('./steps/15-quotation_step'),
  possessive_step: require('./steps/16-possessive_step'),
  acronym_step: require('./steps/17-acronym_step'),
  person_step: require('./steps/18-person_step'),
  organization_step: require('./steps/19-organization_step'),
  parentheses_step: require('./steps/20-parentheses_step'),
  plural_step: require('./steps/21-plural_step'),
  value_step: require('./steps/22-value_step'),
  corrections: require('./steps/23-corrections'),
  properNoun: require('./steps/24-proper_noun'),
  custom: require('./steps/25-custom'),
};
const tagPhrase = require('./phrase');

const tagger = function(ts) {
  ts = step.punctuation_step(ts);
  ts = step.emoji_step(ts);
  ts = step.lexicon_step(ts);
  ts = step.lexicon_multi(ts);
  ts = step.web_step(ts);
  ts = step.suffix_step(ts);
  ts = step.comma_step(ts); //formerly #14
  ts = step.neighbour_step(ts);
  ts = step.capital_step(ts);
  ts = step.noun_fallback(ts);
  ts = step.contraction(ts);
  ts = step.date_step(ts); //3ms
  ts = step.auxiliary_step(ts);
  ts = step.negation_step(ts);
  ts = step.quotation_step(ts);
  ts = step.possessive_step(ts);
  ts = step.acronym_step(ts);
  ts = step.person_step(ts); //1ms
  ts = step.organization_step(ts);
  ts = step.parentheses_step(ts);
  ts = step.plural_step(ts);
  ts = step.value_step(ts);
  ts = step.corrections(ts); //2ms
  ts = step.properNoun(ts);
  ts = tagPhrase(ts);
  ts = step.custom(ts);
  return ts;
};

module.exports = tagger;
