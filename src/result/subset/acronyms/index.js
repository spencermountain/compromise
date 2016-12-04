'use strict';
const Text = require('../../index');

class Acronyms extends Text {
  constructor(list) {
    super(list);
    this.list = this.find().list;
    return this;
  }
  find() {
    return this.match('#Organization');
  }
  parse() {
    return this.terms.map((t) => {
      return {
        text: t.text
      };
    });
  }
}

module.exports = Organizations;
