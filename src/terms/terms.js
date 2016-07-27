'use strict';
//Terms() is an array of Terms, and their methods
const fns = require('../fns');
const log = require('../log');

class Terms {
  constructor(terms) {
    this.terms = terms
  }
  /** map through each term and get its info */
  info(method) {
    this.terms = this.terms.map((t) => {
      return t.info(method);
    });
  }
  /** map through each term and apply transformations */
  to(method) {
    this.terms = this.terms.map((t) => {
      return t.to(method);
    });
  }
}
module.exports = Terms
