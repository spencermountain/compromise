'use strict';
const Text = require('../index');

class Statements extends Text {
  static find(r, n) {
    r = r.filter((ts) => {
      return ts.last().endPunctuation() !== '?';
    });
    if (typeof n === 'number') {
      r = r.get(n);
    }
    return r;
  }
}

module.exports = Statements;
