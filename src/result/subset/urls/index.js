'use strict';
const Text = require('../../index');

class Urls extends Text {
  parse() {
    return this.mapTerms((t) => {
      return {
        text: t.text
      };
    });
  }
  static find(r) {
    return r.match('#Url');
  }
}

module.exports = Urls;
