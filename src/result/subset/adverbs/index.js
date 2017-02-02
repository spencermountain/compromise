'use strict';
const Text = require('../../index');
const toAdjective = require('./toAdjective');

class Adverbs extends Text {
  data() {
    return this.mapTerms((t) => {
      return {
        adjectiveForm: toAdjective(t.normal),
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
