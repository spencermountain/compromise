'use strict';
const log = require('../../logger');

class Terms {
  constructor(terms, context) {
    this.arr = terms;
    this.context = context || {};
    this.get = (n) => {
      return this.arr[n];
    };
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
