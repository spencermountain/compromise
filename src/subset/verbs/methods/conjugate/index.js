'use strict';
const conjugate = require('./conjugate');
const toBe = require('./toBe');

const addAdverbs = function(obj, vb) {
  if (vb.adverbs.found) {
    //does the adverb go at the start or end?
    let isFirst = vb.first().match('#Adverb').found;
    Object.keys(obj).forEach(k => {
      if (isFirst) {
        obj[k] = vb.adverbs.out() + ' ' + obj[k];
      } else {
        obj[k] = obj[k] + vb.adverbs.out();
      }
    });
  }
  return obj;
};

//conjugation using auxillaries+adverbs and stuff
const multiWordConjugate = (vb, verbose) => {
  let isNegative = vb.negative.found;
  let isPlural = vb.isPlural();
  //handle 'to be' verb seperately
  if (vb.verb.tags.Copula || (vb.verb.normal === 'be' && vb.auxiliary.match('will').found)) {
    let isI = false;
    //account for 'i is' -> 'i am' irregular
    if (vb.parent && vb.parent.has('i #Adverb? #Copula')) {
      isI = true;
    }
    let copulas = toBe(isPlural, isNegative, isI);
    return addAdverbs(copulas, vb);
  }
  let obj = conjugate(vb.verb, vb.world, verbose);
  //apply particles
  if (vb.particle.found) {
    Object.keys(obj).forEach(k => {
      obj[k] = obj[k] + vb.particle.out();
    });
  }
  //apply negative
  if (isNegative) {
    obj.PastTense = 'did not ' + obj.Infinitive;
    obj.PresentTense = 'does not ' + obj.Infinitive;
    obj.Gerund = 'not ' + obj.Gerund;
  }
  //future Tense is pretty straightforward
  if (!obj.FutureTense) {
    if (isNegative) {
      obj.FutureTense = 'will not ' + obj.Infinitive;
    } else {
      obj.FutureTense = 'will ' + obj.Infinitive;
    }
  }
  //apply adverbs
  obj = addAdverbs(obj, vb);
  return obj;
};
module.exports = multiWordConjugate;
