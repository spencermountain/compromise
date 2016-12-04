'use strict';
const Text = require('../../index');

class Conditions extends Text {
  constructor(list) {
    super(list);
    this.list = this.find().list;
    return this;
  }
  find() {
    return this.match('#Condition+');
  }
  parse() {
    return this.terms.map((t) => {
      return {
        if: t.text,
        then: ''
      };
    });
  }
}

module.exports = Conditions;
