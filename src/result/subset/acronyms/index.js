'use strict';
const Text = require('../../index');

function Acronyms(arr, lexicon, reference) {
  Text.call(this, arr, lexicon, reference);
}
Acronyms.prototype = Object.create(Text.prototype);

//instance methods
Acronyms.prototype.data = function() {
  return this.terms().list.map((ts) => {
    let t = ts.terms[0];
    let parsed = t.text.toUpperCase().replace(/\./g).split('');
    return {
      periods: parsed.join('.'),
      normal: parsed.join(''),
      text: t.text
    };
  });
};

//static
Acronyms.find = function(r, n) {
  r = r.match('#Acronym');
  if (typeof n === 'number') {
    r = r.get(n);
  }
  return r;
};

module.exports = Acronyms;
