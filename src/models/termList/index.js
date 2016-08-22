'use strict';
const log = require('../../logger');

class TermList {
  constructor(terms, context) {
    this.arr = terms;
    this.context = context || {};
  }
  get length() {
    return this.arr.length;
  }
}
//apply methods
require('../methods').applyTermList(TermList);
module.exports = TermList;
