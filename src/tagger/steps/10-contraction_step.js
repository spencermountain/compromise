'use strict';
const irregulars = require('./contraction/01-irregulars');
const isWasHas = require('./contraction/02-isWasHas');
const easyOnes = require('./contraction/03-easyOnes');
const numberRange = require('./contraction/04-numberRange');

//find and pull-apart contractions
const interpret = function(ts) {
  //check irregulars
  ts = irregulars(ts);
  //guess-at ambiguous "'s" one
  ts = isWasHas(ts);
  //check easy ones
  ts = easyOnes(ts);
  //5-7
  ts = numberRange(ts);
  return ts;
};

module.exports = interpret;
