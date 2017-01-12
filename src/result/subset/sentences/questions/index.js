'use strict';
const Text = require('../index');

class Questions extends Text {
  static find(r, n) {
    r = r.all();
    r = r.filter((ts) => {
      return ts.last().endPunctuation() === '?';
    });
    if (typeof n === 'number') {
      r = r.get(n);
    }
    return r;
  }
}

module.exports = Questions;
