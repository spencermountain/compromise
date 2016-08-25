'use strict';
const Result = require('../index');

class SentenceList extends Result {
  constructor(arr, context) {
    super(arr, context);
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
