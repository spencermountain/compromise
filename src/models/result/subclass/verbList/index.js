'use strict';
const Result = require('../paths').Result;
const VerbPhrase = require('./verbPhrase');

class VerbList extends Result {
  constructor(arr, context) {
    super(arr, context);
    this.arr = this.arr.map((ts) => {
      return new VerbPhrase(ts);
    });
  }

  conjugate() {
    return this.arr.map((vp) => {
      // return vp.conjugate();
    });
  }

  toPositive() {
    this.arr.forEach((vp) => {
      if (vp.parts.negation) {
        vp.parts.negation.remove();
      }
    });
    return this;
  }
}
module.exports = VerbList;
