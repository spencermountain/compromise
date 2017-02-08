'use strict';
const conjugate = require('./conjugate');
const toBe = require('./toBe');

//conjugation using auxillaries
const multiWord = (vb, verbose) => {
  if (!vb.auxillary.found) {
    return conjugate(vb.verb, verbose);
  }
  if (vb.verb.normal === 'be' && vb.auxillary.match('will').found) {
    return toBe();
  }
  return conjugate(vb.verb, verbose);
};
module.exports = multiWord;
