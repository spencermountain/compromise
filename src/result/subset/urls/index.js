'use strict';
const Text = require('../../index');

class Urls extends Text {
  constructor(list) {
    super(list);
    this.list = this.find().list;
    return this;
  }
  find() {
    return this.match('#Url');
  }
  parse() {
    return this.terms.map((t) => {
      return {
        text: t.text
      };
    });
  }
}

module.exports = Urls;
