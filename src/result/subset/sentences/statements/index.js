'use strict';
const Result = require('../index');

class Statements extends Result {
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

module.exports = Statements;
