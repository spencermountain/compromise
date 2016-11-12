'use strict';
const tagger = require('./tagger');

class Terms {
  constructor(arr, context) {
    this.terms = arr;
    this.context = context || {};
    this.get = (n) => {
      return this.terms[n];
    };
    // this.terms = this.arr;
  }
  get length() {
    return this.terms.length;
  }
  tagger() {
    tagger(this)
    return this
  }
}
Terms = require('./split')(Terms);
Terms = require('./match')(Terms);
Terms = require('./render')(Terms);
Terms = require('./misc')(Terms);
Terms = require('./transform')(Terms);

module.exports = Terms;
