'use strict';
const Text = require('../../index');

class Clauses extends Text {
  static find(r) {
    r = r.splitAfter('#ClauseEnd');
    return r;
  }
}

module.exports = Clauses;
