'use strict';
const Text = require('../../index');

class Clauses extends Text {
  static find(r, n) {
    r = r.splitAfter('#ClauseEnd');
    if (typeof n === 'number') {
      r = r.get(n);
    }
    return r;
  }
}

module.exports = Clauses;
