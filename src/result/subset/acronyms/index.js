'use strict';
const Text = require('../../index');

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
