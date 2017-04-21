'use strict';
//the steps and processes of pos-tagging
const step = {
  punctuation_step: require('./steps/01-punctuation_step'),
  lexicon_step: require('./steps/02-lexicon_step'),
  capital_step: require('./steps/03-capital_step'),
  web_step: require('./steps/04-web_step'),
  suffix_step: require('./steps/05-suffix_step'),
  neighbour_step: require('./steps/06-neighbour_step'),
  noun_fallback: require('./steps/07-noun_fallback'),
  date_step: require('./steps/08-date_step'),
  auxiliary_step: require('./steps/09-auxiliary_step'),
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
  plural_step: require('./steps/21-plural_step'),

  lumper : require('./lumper'),
  multi : require('./lumper/lexicon_lump'),
  contraction: require('./contraction')
};
const corrections = require('./corrections');
const tagPhrase = require('./phrase');

const tagger = function (ts) {
  ts = step.punctuation_step(ts);
  ts = step.emoji_step(ts);
  ts = step.lexicon_step(ts);
  ts = step.multi.defaultLex(ts);
  ts = step.multi.userLex(ts);
  ts = step.web_step(ts);
  ts = step.suffix_step(ts);
  ts = step.neighbour_step(ts);
  ts = step.capital_step(ts);
  ts = step.noun_fallback(ts);
  ts = step.contraction(ts);
  ts = step.date_step(ts); //3ms
  ts = step.auxiliary_step(ts);
  ts = step.negation_step(ts);
  ts = step.phrasal_step(ts);
  ts = step.comma_step(ts);
  ts = step.possessive_step(ts);
  ts = step.value_step(ts);
  ts = step.acronym_step(ts);
  ts = step.person_step(ts); //1ms
  ts = step.quotation_step(ts);
  ts = step.organization_step(ts);
  ts = step.plural_step(ts);
  ts = step.lumper(ts);
  ts = corrections(ts); //2ms
  ts = tagPhrase(ts);
  ts = step.multi.userLex(ts);
  return ts;
};

module.exports = tagger;
