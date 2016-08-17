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

  get length() {
    return this.arr.length;
  }
}

module.exports = TermList;
