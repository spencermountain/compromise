'use strict';
const Result = require('../paths').Result;

class NounList extends Result {
  constructor(arr, context) {
    super(arr, context);
  }
  toPlural() {
    this.arr.forEach((ts) => {
      let t = ts.last();
      t.text = t.text + 's';
    });
    return this;
  }
}
module.exports = NounList;
