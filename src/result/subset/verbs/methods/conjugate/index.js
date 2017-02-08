'use strict';
const conjugate = require('./conjugate');
const toBe = require('./toBe');

//conjugation using auxillaries
const multiWord = (vb, verbose) => {
  let obj = conjugate(vb.verb, verbose);
  if (vb.verb.normal === 'be' && vb.auxillary.match('will').found) {
    obj = toBe();
  }
  //apply particles
  if (vb.particle.found) {
    Object.keys(obj).forEach((k) => {
      obj[k] = obj[k] + vb.particle.out();
    });
  }
  //apply negative
  if (vb.negative.found) {
    Object.keys(obj).forEach((k) => {
      obj[k] = obj[k] + ' not';
    });
  }
  //apply adverbs
  if (vb.adverbs.found) {
    Object.keys(obj).forEach((k) => {
      obj[k] = obj[k] + vb.adverbs.out();
    });
  }
  return obj;
};
module.exports = multiWord;
