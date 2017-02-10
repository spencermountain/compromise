'use strict';
const Terms = require('../../paths').Terms;

class Gram extends Terms {
  constructor(arr, lexicon, refText, refTerms) {
    super(arr, lexicon, refText, refTerms);
    this.key = this.out('normal');
    this.size = arr.length;
    this.edge = null;
    this.count = 1;
  }
  inc() {
    this.count += 1;
  }
}
module.exports = Gram;
