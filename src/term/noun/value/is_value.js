'use strict';

const nums = require('../../../data/numbers.js');
const is_date = require('../date/is_date');

const is_value = function(str) {
  let words = str.split(' ');
  //'january 5' is not a value
  if (is_date(str)) {
    return false;
  }
  for(let i = 0; i < words.length; i++) {
    let w = words[i];
    if (nums.ones[w] || nums.teens[w] || nums.tens[w] || nums.multiples[w] || nums.prefixes[w]) {
      return true;
    }
    if (parseFloat(w)) {
      return true;
    }
  }
  return false;
};

module.exports = is_value;
