'use strict';

const helpers = require('./helpers');
const addMethods = require('./addMethods');
const methods = require('./methods');
const log = require('../log');
const SentenceList = require('../sentenceList/sentenceList');

class TermList {
  constructor(terms, context) {
    this.arr = terms;
    this.context = context || {};
    addMethods(this);
    Object.keys(methods).forEach((k) => {
      this[k] = methods[k];
    });
  }
  // /** fake filter */
  // filter(fn) {
  //   this.arr = this.arr.filter(fn);
  //   return new Termlist(this.arr);
  // }
  get length() {
    return this.arr.length;
  }
}
/** fake filter */
TermList.prototype.filter = function(fn) {
  let arr = this.arr.filter(fn);
  return new TermList(arr);
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
