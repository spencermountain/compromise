'use strict';
const Result = require('../index');

class Questions extends Result {
  constructor(list) {
    super(list);
    return this;
  }
  parse() {
    return this.terms.map((t) => {
      return {};
    });
  }
}

module.exports = Questions;
