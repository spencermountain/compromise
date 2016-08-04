'use strict';
const methods = require('../term/methods');

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
  }
  /** remove all these selected terms from their sentences */
  remove() {
    this._terms.forEach((t) => t.remove());
    this._terms = [];
    return this.context.text;
  }
  first() {
    return this._terms[0];
  }
  second() {
    return this._terms[1];
  }
  third() {
    return this._terms[2];
  }
  last() {
    return this._terms[this._terms.length - 1];
  }
  count() {
    return this._terms.length;
  }
  text() {
    return this._terms.map((t) => t.text);
  }
}

module.exports = TermList;
