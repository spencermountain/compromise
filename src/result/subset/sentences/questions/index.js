'use strict';
const Text = require('../index');

class Questions extends Text {
  constructor(list) {
    super(list);
    this.selection = this.list.filter((ts) => {
      return ts.last().endPunctuation() === '?';
    });
    return this;
  }
  parse() {
    return this.selection.map((ts) => {
      return {
        text: ts.plaintext(),
        normal: ts.normal()
      };
    });
  }
}

module.exports = Questions;
