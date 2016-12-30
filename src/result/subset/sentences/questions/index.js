'use strict';
const Text = require('../index');

class Questions extends Text {
  data() {
    return this.list.map((ts) => {
      return {
        text: ts.plaintext(),
        normal: ts.normal()
      };
    });
  }
  static find(r) {
    r = r.all();
    return r.filter((ts) => {
      return ts.last().endPunctuation() === '?';
    });
  }
}

module.exports = Questions;
