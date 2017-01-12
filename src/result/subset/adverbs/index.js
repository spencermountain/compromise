'use strict';
const Text = require('../../index');

class Adverbs extends Text {
  data() {
    return this.mapTerms((t) => {
      return {
        adjectiveForm: t.adverb.adjectiveForm(),
        normal: t.normal,
        text: t.text
      };
    });
  }
  static find(r, n) {
    r = r.match('#Adverb+');
    if (typeof n === 'number') {
      r = r.get(n);
    }
    return r;
  }
}

module.exports = Adverbs;
