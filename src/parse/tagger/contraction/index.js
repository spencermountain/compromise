'use strict';
const irregulars = require('./01-irregulars');
const hardOne = require('./02-hardOne');
const easyOnes = require('./03-easyOnes');

//find and pull-apart contractions
const interpret = function(ts) {
  //check irregulars
  ts = irregulars(ts);
  //guess-at ambiguous "'s" one
  ts = hardOne(ts);
  //check easy ones
  ts = easyOnes(ts);
  return ts;
};

module.exports = interpret;
