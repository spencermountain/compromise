'use strict';
// Terms() is an array of Terms, with utility methods that map over them
const render = require('./render');
const fns = require('../fns');

class Terms {
  constructor(terms) {
    this.terms = terms
  }
  /** map through each term and get its info */
  info(method) {
    return this.terms.map((t) => {
      return t.info(method);
    });
  }
  /** map through each term and apply transformations */
  to(method) {
    this.terms = this.terms.map((t) => {
      return t.to(method);
    });
    return this
  }
  /** return a subset of flattened terms with the condition */
  if(str) {
    let terms = this.terms.filter((t) => t.is(str))
    return new Terms(terms)
  }

  /** get, analyze, return boolean */
  is(method) {
    if (fns.isFunction(method)) {
      return method(this);
    }
    //otherwise, try each term
    return this.terms.map((t) => {
      return t.is(method);
    });
  }
  /** reduce the output of each term into one result */
  render(method) {
    //if we have a specialised method for 'Terms'
    if (render[method]) {
      return render[method](this)
    }
    //just do a reduce over terms
    return this.terms.reduce((col, t) => {
      col += t.render(method);
      return col
    }, '');
  }
}
module.exports = Terms
