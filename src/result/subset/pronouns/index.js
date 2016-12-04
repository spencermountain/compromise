'use strict';
const Text = require('../../index');

class Pronouns extends Text {
  constructor(list) {
    super(list);
    this.list = this.find().list;
    return this;
  }
  find() {
    let subjects = this.splitAfter('#Comma');
    return subjects.match('#Pronoun');
  }
  parse() {
    return this.terms.map((t) => {
      return {
        text: t.text
      };
    });
  }
}

module.exports = Pronouns;
