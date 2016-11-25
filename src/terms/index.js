'use strict';
const tagger = require('./tagger');
const tokenize = require('./methods/tokenize');

class Terms {
  constructor(arr, lexicon, parent) {
    this.terms = arr;
    this.get = (n) => {
      return this.terms[n];
    };
    this.parent = parent
  }
  get found() {
    return this.terms.length > 0
  }
  get length() {
    return this.terms.length;
  }
  get index() {
    let result = this.parent
    if (result) {
      for (let i = 0; i < result.list.length; i++) {
        if (result.list[i] === this) {
          return i
        }
      }
    }
    return null
  }
  posTag() {
    tagger(this)
    return this
  }

  static fromString(str, lexicon, parent) {
    let termArr = tokenize(str)
    let ts = new Terms(termArr, lexicon)
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
