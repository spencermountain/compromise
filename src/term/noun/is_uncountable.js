//uncountables are words that shouldn't ever inflect, for metaphysical reasons, like 'peace'
'use strict';
const uncountable_arr = require('../../data/uncountables.js');

const uncountable = uncountable_arr.reduce(function(h, a) {
  h[a] = true;
  return h;
}, {});

const is_uncountable = function(str) {
  if (uncountable[str]) {
    return true;
  }
  return false;
};
// console.log(is_uncountable("peace") === true)
// console.log(is_uncountable("dog") === false)
module.exports = is_uncountable;
