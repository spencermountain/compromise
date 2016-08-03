'use strict';
const term_methods = require('../term/methods');

class TermList {
  constructor(terms) {
    this._terms = terms;
    //add tag filters for each pos
    Object.keys(term_methods.filters).forEach((method) => {
      this[method] = () => {
        this._terms = this._terms.filter((t) => {
          return t.is(term_methods.filters[method]);
        });
        return this;
      };
    });
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
  text() {
    return this._terms.map((t) => t.text);
  }
}

module.exports = TermList;
