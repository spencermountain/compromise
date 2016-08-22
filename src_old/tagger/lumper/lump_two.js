'use strict';
const log = require('../paths').log;
const path = 'lumper/lump_two';
const do_two = require('./data/do_two');
const combine = require('./combine');
// const dont_two = require('./data/dont_two');

const lump_two = function(s) {
  log.here(path);
  for (let o = 0; o < do_two.length; o++) {
    for (let i = 0; i < s.arr.length - 1; i++) {
      let a = s.arr[i];
      let b = s.arr[i + 1];
      if (do_two[o].condition(a, b)) {
        //merge terms
        combine(s, i);
        //tag it as POS
        s.arr[i].tagAs(do_two[o].result, 'lump-two (' + do_two[o].reason + ')');
      }
    }
  }
  return s;
};

module.exports = lump_two;
