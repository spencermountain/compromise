'use strict';
const Result = require('../paths').Result;
const VerbPhrase = require('./verbPhrase');

class VerbList extends Result {
  constructor(arr, context) {
    //turn []terms into []VerbPhrase()
    // console.log(arr);
    super(arr, context);
    this.arr = this.arr.map((ts) => {
      return new VerbPhrase(ts);
    });
  }
  conjugate() {
    return this.arr.map((vp) => {
      return vp.conjugate();
    });
  }
}
module.exports = VerbList;
