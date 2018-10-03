'use strict';
const checkIrregulars = require('./irregulars');
const suffixPass = require('./suffixes');
const generic = require('./generic');
//this method is the same as regular conjugate, but optimised for use in the lexicon during warm-up.
//it's way faster because it knows input is already infinitive

const want = ['Gerund', 'PastTense', 'PresentTense'];

const fasterConjugate = function(inf, world) {
  let all = {
    Infinitive: inf
  };
  //check irregulars list
  if (world && world.conjugations) {
    const irregObj = checkIrregulars(all['Infinitive'], world);
    if (irregObj !== null) {
      Object.keys(irregObj).forEach(k => {
        if (irregObj[k] && !all[k]) {
          all[k] = irregObj[k];
        }
      });
    }
  }
  //check suffix rules
  const suffObj = suffixPass(inf);
  Object.keys(suffObj).forEach(k => {
    if (suffObj[k] && !all[k]) {
      all[k] = suffObj[k];
    }
  });
  for (let i = 0; i < want.length; i++) {
    if (all[want[i]] === undefined) {
      all[want[i]] = generic[want[i]](all);
    }
  }
  return all;
};
module.exports = fasterConjugate;
// console.log(fasterConjugate('repeat'));
