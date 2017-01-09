'use strict';
const Terms = require('../../paths').Terms;

class Noun extends Terms {
  constructor(arr, lexicon, refText, refTerms) {
    super(arr, lexicon, refText, refTerms);
  }
  data() {
    let t = this.terms[0];
    return {
      article: t.noun.makeArticle(),
      singular: t.noun.singular(),
      plural: t.noun.plural(),
    };
  }
}
module.exports = Noun;
