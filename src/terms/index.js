'use strict';
const tagger = require('./tagger');
const tokenize = require('./methods/tokenize');

class Terms {
  constructor(arr, lexicon, parent, full) {
    this.terms = arr;
    this.lexicon = lexicon
    this.parent = parent
    this.full = full
    this.get = (n) => {
      return this.terms[n];
    };
  }
  get found() {
    return this.terms.length > 0
  }
  get length() {
    return this.terms.length;
  }
  posTag() {
    tagger(this)
    return this
  }
  all() {
    return this.full || this
  }
  place() {

  }
  wut() {
    return 'Terms'
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
module.exports = Terms;;
module.exports = Terms;
