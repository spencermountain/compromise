'use strict';
const Text = require('../../index');

class Clauses extends Text {
  data() {
    return this.mapTerms((t) => {
      return {};
    });
  }
  static find(r) {
    r = r.splitAfter('#ClauseEnd');
    return r;
  }
}

module.exports = Clauses;
