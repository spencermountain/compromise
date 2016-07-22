'use strict';
const do_two = require('./data/do_two');
const dont_two = require('./data/dont_two');

const lump_two = function(s) {
  for (let i = 0; i < s.terms.length - 1; i++) {
    let a = s.terms[i];
    let b = s.terms[i + 1];
    for (let o = 0; o < do_two.length; o++) {
      if (do_two[o].condition(a, b)) {
        console.log(do_two[o]);
      }
    }
  }

  return s;
};

module.exports = lump_two;
