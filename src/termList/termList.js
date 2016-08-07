'use strict';
const methods = require('../term/methods');
const helpers = require('./helpers');
const SentenceList = require('../sentenceList/sentenceList');

// console.log(methods);
class TermList {
  constructor(terms, context) {
    this._terms = terms;
    this.context = context || {};
    //add filters
    Object.keys(methods.filters).forEach((method) => {
      this[method] = () => {
        this._terms = methods.filters[method](this._terms);
        return this;
      };
    });
    //add map over info methods
    Object.keys(methods.infos).forEach((method) => {
      this[method] = () => {
        return methods.infos[method](this._terms);
      };
    });
    //add transform methods
    Object.keys(methods.transforms).forEach((method) => {
      this[method] = () => {
        return methods.transforms[method](this);
      };
    });
    //add pluck methods
    Object.keys(methods.pluck).forEach((method) => {
      this[method] = () => {
        this._terms = this._terms.map((t) => t.pluck(method));
        this._terms = this._terms.filter(t => t);
        return this;
      };
    });
  }

  get length() {
    return this._terms.length;
  }

  /** remove all these selected terms from their sentences */
  remove() {
    this._terms.forEach((t) => t.remove());
    this._terms = [];
    return this.context.text;
  }
  /** fake foreach */
  forEach(fn) {
    this._terms.forEach(fn);
    return this;
  }
  /** fake map */
  map(fn) {
    return this._terms.map(fn);
  }
  /** fake map */
  filter(fn) {
    this._terms = this._terms.filter(fn);
    return this;
  }
  /** terms[0] wrapper */
  first() {
    return this._terms[0];
  }
  /** terms[1] wrapper */
  second() {
    return this._terms[1];
  }
  /** terms[2] wrapper */
  third() {
    return this._terms[2];
  }
  /** the last result. terms[terms.length-1] wrapper */
  last() {
    return this._terms[this._terms.length - 1];
  }
  /** add a new term before this one*/
  append(str) {
    this._terms.forEach((t) => {
      t.append(str);
    });
    return this.context.parent;
  }
  /** add a new term after this one*/
  prepend(str) {
    this._terms.forEach((t) => {
      t.prepend(str);
    });
    return this.context.parent;
  }
  /** turn this term into another one*/
  replace(str) {
    this._terms.forEach((t) => {
      t.replace(str);
    });
    return this.context.parent;
  }
  /** grab the sentence for each term*/
  sentences() {
    let sentences = this._terms.map((t) => {
      return t.context.sentence;
    });
    return new SentenceList(sentences);
  }
  /** flatten these terms into text */
  plaintext() {
    return this._terms.reduce((str, t) => {
      str += t.whitespace.before + t.text + t.whitespace.after;
      return str;
    }, '');
  }
  /** return unique terms and their frequencies */
  byFreq() {
    return helpers.byFreq(this._terms);
  }
}

module.exports = TermList;
