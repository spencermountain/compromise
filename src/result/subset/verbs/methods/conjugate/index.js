'use strict';
const conjugate = require('./conjugate');
const toBe = require('./toBe');

// const generic = {
//   FutureTense: (o) => {
//     return 'will ' + o.Infinitive;
//   },
//
//   PerfectTense: (o) => {
//     return 'have ' + (o.Participle || o.PastTense);
//   },
//
//   Pluperfect: (o) => {
//     if (o.PastTense) {
//       return 'had ' + o.PastTense;
//     }
//     return null;
//   },
//   FuturePerfect: (o) => {
//     if (o.PastTense) {
//       return 'will have ' + o.PastTense;
//     }
//     return null;
//   }
// };

//conjugation using auxillaries+adverbs and stuff
const multiWord = (vb, verbose) => {
  let isNegative = vb.negative.found;
  let isPlural = false;
  //handle 'to be' verb seperately
  if (vb.verb.tag.Copula || (vb.verb.normal === 'be' && vb.auxillary.match('will').found)) {
    return toBe(isPlural, isNegative);
  }

  let obj = conjugate(vb.verb, verbose);
  //apply particles
  if (vb.particle.found) {
    Object.keys(obj).forEach((k) => {
      obj[k] = obj[k] + vb.particle.out();
    });
  }
  //apply adverbs
  if (vb.adverbs.found) {
    Object.keys(obj).forEach((k) => {
      obj[k] = obj[k] + vb.adverbs.out();
    });
  }
  //apply negative
  if (isNegative) {
    obj.PastTense = 'did not ' + obj.Infinitive;
    obj.PresentTense = 'does not ' + obj.Infinitive;
  }
  //future Tense is pretty straightforward
  if (!obj.FutureTense) {
    if (isNegative) {
      obj.FutureTense = 'will not ' + obj.Infinitive;
    } else {
      obj.FutureTense = 'will ' + obj.Infinitive;
    }
  }
  return obj;
};
module.exports = multiWord;
