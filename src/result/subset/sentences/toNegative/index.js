'use strict';
//


//these terms are nicer ways to negate a sentence
//ie. john always walks -> john always doesn't walk
const logical_negate = {
  'everyone': 'no one',
  'everybody': 'nobody',
  'someone': 'no one',
  'somebody': 'nobody',
  // everything:"nothing",
  'always': 'never'
};

const toNegative = (s) => {


  return s;
};
module.exports = toNegative;
