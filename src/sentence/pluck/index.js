'use strict';
//grab specific terms inside this sentence
const pluck = {
  first: (s) => {
    return s.arr[0];
  },
  last: (s) => {
    return s.arr[s.arr.length - 1];
  },
  firstverb: (s) => {

  }
};

module.exports = pluck;
