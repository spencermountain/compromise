'use strict';
const Result = require('../index');

class VerbList extends Result {
  constructor(arr, context) {
    super(arr, context);
  }
  conjugate() {
    return this.arr.map((ts) => {
      let t = ts.last();
      return t.info('conjugate');
    });
  }
}
module.exports = VerbList;
