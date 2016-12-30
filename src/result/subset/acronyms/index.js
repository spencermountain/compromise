'use strict';
const Text = require('../../index');

class Acronyms extends Text {
  data() {
    return this.mapTerms((t) => {
      let parsed = t.text.toUpperCase().replace(/\./g).split('');
      return {
        periods: parsed.join('.'),
        normal: parsed.join(''),
        text: t.text
      };
    });
  }
  static find(r) {
    return r.match('#Acronym');
  }
}

module.exports = Acronyms;
