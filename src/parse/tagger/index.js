//the steps and processes of pos-tagging
module.exports = {
  contraction: {
    interpret: require('./contraction')
  },
  lumper : {
    lexicon_lump: require('./lumper/lexicon_lump'),
    lump_two: require('./lumper/lump_two'),
    lump_three: require('./lumper/lump_three')
  },
  step : {
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
    adverb_step: require('./steps/11-adverb_step'),
    phrasal_step: require('./steps/12-phrasal_step'),
    comma_step: require('./steps/13-comma_step')
  }
};
