'use strict';
const Result = require('../paths').Result;

class SentenceList extends Result {
  constructor(arr, context) {
    super(arr, context);
    this.sentences = arr;
  }
  sentence(n) {
    return this.arr[n];
  }
  toExclamation() {
    this.arr.forEach((ts) => {
      let t = ts.last();
      t.text = t.text + '!';
    });
    return this;
  }
}
module.exports = SentenceList;
