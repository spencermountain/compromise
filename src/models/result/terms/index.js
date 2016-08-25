'use strict';
const log = require('../paths').log;

class Terms {
  constructor(arr, context) {
    this.arr = arr;
    this.context = context || {};
    this.get = (n) => {
      return this.arr[n];
    };
  // this.terms = this.arr;
  }
  term(n) {
    return this.arr[n];
  }
  get length() {
    return this.arr.length;
  }
  forEach(fn) {
    this.arr.forEach(fn);
    return this;
  }
  pretty() {
    let txt = this.arr.reduce((str, t) => {
      str += t.plaintext();
      return str;
    }, '');
    console.log(txt);
  }
}
//apply methods
module.exports = Terms;
