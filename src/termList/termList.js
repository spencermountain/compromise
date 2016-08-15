'use strict';

const helpers = require('./helpers');
const addMethods = require('./addMethods');
const log = require('../log');
const SentenceList = require('../sentenceList/sentenceList');

// console.log(methods);
class TermList {
  constructor(terms, context) {
    this.arr = terms;
    this.context = context || {};
    addMethods(this);
  }

  get length() {
    return this.arr.length;
  }

  match(str) {
    return null;
  }

  /** remove all these selected terms from their sentences */
  remove() {
    console.log('---removetermlist--');
    this.arr.forEach((t) => {
      log.tell('removing ' + t.normal);
      console.log('-' + t.normal);
      t.remove();
    });
    // this.arr = [];
    return this;
  }
  /** detach these terms from any pass-by-reference mutations*/
  clone() {
    this.arr.map((t) => t.clone());
    return this;
  }
  /** fake foreach */
  forEach(fn) {
    this.arr.forEach(fn);
    return this;
  }
  /** fake map */
  map(fn) {
    return this.arr.map(fn);
  }
  /** fake map */
  filter(fn) {
    this.arr = this.arr.filter(fn);
    return this;
  }
  /** terms[0] wrapper */
  first() {
    return this.arr[0];
  }
  /** terms[1] wrapper */
  second() {
    return this.arr[1];
  }
  /** terms[2] wrapper */
  third() {
    return this.arr[2];
  }
  /** the last result. terms[terms.length-1] wrapper */
  last() {
    return this.arr[this.arr.length - 1];
  }
  /** add a new term before this one*/
  append(str) {
    this.arr.forEach((t) => {
      t.append(str);
    });
    return this.context.parent;
  }
  /** add a new term after this one*/
  prepend(str) {
    this.arr.forEach((t) => {
      t.prepend(str);
    });
    return this.context.parent;
  }
  /** turn this term into another one*/
  replace(str) {
    this.arr.forEach((t) => {
      t.replace(str);
    });
    return this.context.parent;
  }
  /** grab the sentence for each term*/
  sentences() {
    let sentences = this.arr.map((t) => {
      return t.context.sentence;
    });
    return new SentenceList(sentences);
  }
  /** flatten these terms into text */
  plaintext() {
    return this.arr.reduce((str, t) => {
      str += t.whitespace.before + t.text + t.whitespace.after;
      return str;
    }, '');
  }
  pretty() {
    this.arr.forEach((t) => {
      t.render('pretty');
    });
  }
  /** return unique terms and their frequencies */
  byFreq() {
    return helpers.byFreq(this.arr);
  }
}

module.exports = TermList;
