'use strict';
const do_three = require('./data/do_three');
// const dont_three = require('./data/dont_three');

const lump_three = function(s) {
  for (let i = 0; i < s.terms.length - 2; i++) {
    let a = s.terms[i];
    let b = s.terms[i + 1];
    let c = s.terms[i + 2];
    for (let o = 0; o < do_three.length; o++) {
      if (do_three[o].condition(a, b, c)) {
        console.log('-----');
        console.log(do_three[o]);
      }
    }
  }

  return s;
};

module.exports = lump_three;
