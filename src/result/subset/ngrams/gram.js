'use strict';
const Terms = require('../../paths').Terms;

//this is one-or-more terms together, sorted by frequency
class Gram extends Terms {
  constructor(arr, lexicon, refText, refTerms) {
    super(arr, lexicon, refText, refTerms);
    //string to sort/uniq by
    this.key = this.out('normal');
    //bigram/trigram/etc
    this.size = arr.length;
    //number of occurances
    this.count = 1;
  }
  inc() {
    this.count += 1;
  }
}
module.exports = Gram;
