'use strict';
const Text = require('../../index');

class Acronyms extends Text {
  parse() {
    return this.terms.map((t) => {
      let parsed=t.text.toUpperCase().replace(/\./g).split('')
      return {
        periods:parsed.join('.'),
        normal:parsed.join(''),
        text: t.text
      };
    });
  }
  static find(r){
    return r.match('#Acronym');
  }
}

module.exports = Acronyms;
