'use strict';
const tagger = require('./tagger');
const tokenize = require('./methods/tokenize');

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
  posTag() {
    tagger(this)
    return this
  }
  static fromString(str, context) {
    let termArr = tokenize(str)
    let ts = new Terms(termArr, context)
      //give each term a reference to this ts
    ts.terms.forEach((t) => {
      t.parent = ts;
    });
    ts.posTag()
    return ts
  }
}
Terms = require('./match')(Terms);
Terms = require('./methods/split')(Terms);
Terms = require('./methods/insert')(Terms);
Terms = require('./methods/render')(Terms);
Terms = require('./methods/misc')(Terms);
Terms = require('./methods/transform')(Terms);

module.exports = Terms;
