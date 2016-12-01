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
  get selected() {
      return this.terms.filter((t) => t.sel);
    }
    // set selected(arr) {
    //
    // }
  posTag() {
    tagger(this)
    return this
  }
  all() {
    this.terms.forEach((t) => {
      t.sel = true
    })
    return this
  }
  each(fn) {
    let start = null
    for (let i = 0; i < this.terms.length; i++) {
      let t = this.terms[i]
      if (t.sel) {
        if (start === null) {
          start = i
        }
      } else if (start !== null) {
        fn(start, i)
        start = null
      }
    }
    if (start !== null) {
      fn(start, this.terms.length)
    }
    return this
  }
  className() {
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
Terms = require('./methods/case')(Terms);
Terms = require('./methods/split')(Terms);
Terms = require('./methods/insert')(Terms);
Terms = require('./methods/replace')(Terms);
Terms = require('./methods/tag')(Terms);
Terms = require('./methods/remove')(Terms);
Terms = require('./methods/render')(Terms);
Terms = require('./methods/misc')(Terms);
Terms = require('./methods/transform')(Terms);
module.exports = Terms;;
module.exports = Terms;;
