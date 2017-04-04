'use strict';
const Text = require('../../index');

//a subset of the Text class
let Acronyms = function (arr, lexicon, reference) {
  Text.call(this, arr, lexicon, reference);
};
Acronyms.prototype = Object.create(Text.prototype); //inheritance

//add instance methods
Text.addMethods(Acronyms, {
  data: function() {
    return this.terms().list.map((ts) => {
      let t = ts.terms[0];
      let parsed = t.text.toUpperCase().replace(/\./g).split('');
      return {
        periods: parsed.join('.'),
        normal: parsed.join(''),
        text: t.text
      };
    });
  }
});

Acronyms.find = function(r, n) {
  r = r.match('#Acronym');
  if (typeof n === 'number') {
    r = r.get(n);
  }
  return r;
};

module.exports = Acronyms;
