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
    lexicon_step: require('./steps/lexicon_pass'),
    capital_step: require('./steps/capital_step'),
    suffix_step: require('./steps/suffix_step'),
    web_step: require('./steps/web_step'),
    date_pass: require('./steps/date_pass'),
    neighbour_step: require('./steps/neighbour_step'),
    noun_fallback: require('./steps/noun_fallback'),
    punctuation_step: require('./steps/punctuation_step'),
    corrections: require('./steps/corrections')
  }
};
