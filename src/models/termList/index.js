'use strict';
const log = require('../../logger');

class TermList {
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

  pretty() {
    this.arr.forEach((t) => {
      t.render('pretty');
    });
  }
  /** flatten these terms into text */
  plaintext() {
    return this.arr.reduce((str, t) => {
      str += t.whitespace.before + t.text + t.whitespace.after;
      return str;
    }, '');
  }
}
/** fake filter */
TermList.prototype.filter = function(fn) {
  let arr = this.arr.filter(fn);
  return new TermList(arr);
};
/** fake foreach */
TermList.prototype.forEach = function(fn) {
  let arr = this.arr.forEach(fn);
  return this;
};
/** detach these terms from any pass-by-reference mutations*/
TermList.prototype.clone = function() {
  let arr = this.arr.map((t) => t.clone());
  return new TermList(arr);
};
/**fake slice  */
TermList.prototype.slice = function(start, end) {
  let arr = this.arr.slice(start, end);
  return new TermList(arr);
};
module.exports = TermList;
