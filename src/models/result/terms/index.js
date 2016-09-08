'use strict';
const paths = require('../paths');
const log = paths.log;
const fns = paths.fns;
const Term = require('../../term');
const match = require('./match');

class Terms {
  constructor(arr, context) {
    this.terms = arr;
    this.context = context || {};
    this.get = (n) => {
      return this.terms[n];
    };
  // this.terms = this.arr;
  }
  term(n) {
    return this.terms[n];
  }
  get length() {
    return this.terms.length;
  }
  forEach(fn) {
    this.terms.forEach(fn);
    return this;
  }
  plaintext() {
    return this.terms.reduce((str, t) => {
      str += t.plaintext();
      return str;
    }, '');
  }
  remove(tag) {
    this.terms = this.terms.filter((t) => {
      return !t[tag];
    });
    return this;
  }
  check() {
    let txt = this.plaintext();
    console.log(txt);
  }

}
//some other methods
Terms.prototype.clone = function() {
  let terms = this.terms.map((t) => {
    return t.clone();
  });
  return new Terms(terms, this.context);
};

Terms.prototype.match = function(reg) {
  let matchTerms = match(this.terms, reg);
  return new Terms(matchTerms, this.context);
};
module.exports = Terms;
