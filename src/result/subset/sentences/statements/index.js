'use strict';
const Text = require('../index');

class Statements extends Text {
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
