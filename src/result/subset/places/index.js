'use strict';
const Text = require('../../index');

class Places extends Text {
  constructor(list) {
    super(list);
    this.list = this.find().list;
    return this;
  }
  find() {
    return this.match('#Place');
  }
  parse() {
    return this.terms.map((t) => {
      return {
        text: t.text
      };
    });
  }
}

module.exports = Places;
