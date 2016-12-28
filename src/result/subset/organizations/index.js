'use strict';
const Text = require('../../index');

class Organizations extends Text {
  parse() {
    return this.mapTerms((t) => {
      return {
        text: t.text
      };
    });
  }
  static find(r) {
    r = r.splitAfter('#Comma');
    return r.match('#Organization+');
  }
}

module.exports = Organizations;
