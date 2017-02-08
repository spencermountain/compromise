'use strict';
//too many special cases for is/was/will be
const toBe = (isPlural, isNegative) => {
  let obj = {
    PastTense: 'was',
    PresentTense: 'is',
    FutureTense: 'will be',
    Infinitive: 'is',
    Gerund: 'being',
    Actor: '',
    PerfectTense: 'been',
    Pluperfect: 'been',
  };
  return obj;
};
module.exports = toBe;
