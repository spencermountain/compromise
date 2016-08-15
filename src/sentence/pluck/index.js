'use strict';
//grab specific terms inside this sentence
const pluck = {
  first: (s) => {
    return s._terms[0];
  },
  last: (s) => {
    return s._terms[s._terms.length - 1];
  },
  firstverb: (s) => {

  }
};

module.exports = pluck;
