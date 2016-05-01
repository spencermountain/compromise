'use strict';
// handle 'nine point eight four'
const nums = require('../../../../data/numbers.js');
const ones = Object.assign({}, nums.ones, nums.teens, nums.ordinal_ones, nums.ordinal_teens);

//concatenate into a string with leading '0.'
const decimals = function(words) {
  let str = '0.';
  for(let i = 0; i < words.length; i++) {
    let w = words[i];
    if (ones[w]) {
      str += ones[w];
    } else {
      return 0;
    }
  }
  return parseFloat(str);
};

module.exports = decimals;
