const cardinal = {
  ones : {
    'a': 1,
    'zero': 0,
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
  },
  teens : {
    'ten': 10,
    'eleven': 11,
    'twelve': 12,
    'thirteen': 13,
    'fourteen': 14,
    'fifteen': 15,
    'sixteen': 16,
    'seventeen': 17,
    'eighteen': 18,
    'nineteen': 19,
  },
  tens : {
    'twenty': 20,
    'thirty': 30,
    'forty': 40,
    'fifty': 50,
    'sixty': 60,
    'seventy': 70,
    'eighty': 80,
    'ninety': 90,
  },
  multiples : {
    'hundred': 100,
    'grand': 1000,
    'thousand': 1000,
    'million': 1000000,
    'billion': 1000000000,
    'trillion': 1000000000000,
    'quadrillion': 1000000000000000,
    'quintillion': 1000000000000000000,
    'sextillion': 1000000000000000000000,
    'septillion': 1000000000000000000000000
  }
};

const ordinal = {
  ones: {
    'first': 1,
    'second': 2,
    'third': 3,
    'fourth': 4,
    'fifth': 5,
    'sixth': 6,
    'seventh': 7,
    'eighth': 8,
    'ninth': 9
  },
  teens: {
    'tenth': 10,
    'eleventh': 11,
    'twelfth': 12,
    'thirteenth': 13,
    'fourteenth': 14,
    'fifteenth': 15,
    'sixteenth': 16,
    'seventeenth': 17,
    'eighteenth': 18,
    'nineteenth': 19
  },
  tens: {
    'twentieth': 20,
    'thirtieth': 30,
    'fourtieth': 40,
    'fiftieth': 50,
    'sixtieth': 60,
    'seventieth': 70,
    'eightieth': 80,
    'ninetieth': 90
  },
  multiples: {
    'hundredth': 100,
    'thousandth': 1000,
    'millionth': 1000000,
    'billionth': 1000000000,
    'trillionth': 1000000000000,
    'quadrillionth': 1000000000000000,
    'quintillionth': 1000000000000000000,
    'sextillionth': 1000000000000000000000,
    'septillionth': 1000000000000000000000000
  }
};


//used for the units
const prefixes = {
  'yotta': 1,
  'zeta': 1,
  'peta': 1,
  'tera': 1,
  'giga': 1,
  'mega': 1,
  'kilo': 1,
  'hecto': 1,
  'deca': 1,
  'centi': 1,
  'centa': 1,
  'milli': 1,
  'micro': 1,
  'nano': 1,
  'pico': 1,
  'femto': 1,
  'atto': 1,
  'zepto': 1,
  'yokto': 1,

  'square': 1,
  'cubic': 1,
  'quartic': 1,
};

module.exports = {
  ones: cardinal.ones,
  teens: cardinal.teens,
  tens: cardinal.tens,
  multiples: cardinal.multiples,

  ordinal_ones: ordinal.ones,
  ordinal_teens: ordinal.teens,
  ordinal_tens: ordinal.tens,
  ordinal_multiples: ordinal.multiples,

  prefixes: prefixes,
};
