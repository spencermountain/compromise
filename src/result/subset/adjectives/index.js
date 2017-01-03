'use strict';
const Text = require('../../index');

class Adjectives extends Text {
  data() {
    return this.mapTerms((t) => {
      return {
        comparative: t.adjective.comparative(),
        superlative: t.adjective.superlative(),
        adverbForm: t.adjective.adverbForm(),
        nounForm: t.adjective.nounForm(),
        normal: t.normal,
        text: t.text
      };
    });
  }
  static find(r) {
    return r.match('#Adjective');
  }
}

module.exports = Adjectives;
