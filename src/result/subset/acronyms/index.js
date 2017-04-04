'use strict';
const Text = require('../../index');

// Circle - subclass
// function Acronyms(arr, lexicon, reference) {
//   // Call constructor of superclass to initialize superclass-derived members.
//   Text.call(this, x, y);
//
//   // Initialize subclass's own members
//   this.r = r;
// }

class Acronyms extends Text {
  data() {
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
  static find(r, n) {
    r = r.match('#Acronym');
    if (typeof n === 'number') {
      r = r.get(n);
    }
    return r;
  }
}

module.exports = Acronyms;
