'use strict';
const Text = require('../index');

class Statements extends Text {
  static find(r, n) {
    r = r.all();
    if (typeof n === 'number') {
      r = r.get(n);
    }
    let list = r.list.filter((ts) => {
      return ts.last().endPunctuation() !== '?';
    });
    return new Text(list, this.lexicon, this.parent);
  }
}

module.exports = Statements;
