'use strict';
const Result = require('../paths').Result;
const VerbPhrase = require('./verbPhrase');

class VerbList extends Result {
  constructor(arr, context) {
    //turn []terms into []VerbPhrase()
    arr = arr.map((terms) => {
      return new VerbPhrase(terms);
    });
    super(arr, context);
  }
  conjugate() {
    return this.arr.map((vp) => {
      return vp.conjugate();
    });
  }
}
module.exports = VerbList;
