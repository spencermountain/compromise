'use strict';
const Text = require('../index');

class Statements extends Text {
  parse() {
    return this.terms.map((t) => {
      return {};
    });
  }
  static find(r) {
    r.list = r.list.filter((ts) => {
      return ts.last().endPunctuation() !== '?';
    });
    return r.all(); //for now
  }
}

module.exports = Statements;
