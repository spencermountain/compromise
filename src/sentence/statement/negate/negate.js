'use strict';
const fns = require('../../../fns');

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
//create corrollary
let logical_affirm = fns.reverseObj(logical_negate);
//these are not symmetic
logical_affirm['nobody'] = 'somebody';

const negate = function(s) {
  for(let i = 0; i < s.terms.length; i++) {
    let t = s.terms[i];
    //these verbs are red-herrings
    if (t.pos['Condition'] || t.pos['Quotation']) {
      continue;
    }
    //logical-negations are smoother than verb-negations
    //ie. always -> never
    if (logical_negate[t.normal]) {
      t.changeTo(logical_negate[t.normal]);
      break;
    }
    if (logical_affirm[t.normal]) {
      t.changeTo(logical_affirm[t.normal]);
      break;
    }
    //negate the first verb
    if (t.pos['Verb']) {
      t.negate();
      break;
    }
  }
  return;
};

module.exports = negate;
