'use strict';
const Terms = require('../../paths').Terms;
const methods = require('./methods');

class Adjective extends Terms {
  constructor(arr, lexicon, refText, refTerms) {
    super(arr, lexicon, refText, refTerms);
  }
  data() {
    const str = this.out('normal');
    return {
      comparative: methods.toComparative(str),
      superlative: methods.toSuperlative(str),
      adverbForm: methods.toAdverb(str),
      nounForm: methods.toNoun(str),
      verbForm: methods.toVerb(str),
      normal: str,
      text: this.out('text')
    };

  }
}
module.exports = Adjective;
