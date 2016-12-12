'use strict';
const Text = require('../index');

class Questions extends Text {
  parse() {
    return this.list.map((ts) => {
      return {
        text: ts.plaintext(),
        normal: ts.normal()
      };
    });
  }
  static find(r) {
    r = r.all();
    t.list = r.list.filter((ts) => {
      return ts.last().endPunctuation() === '?';
    });
    return r;
  }
}

module.exports = Questions;
