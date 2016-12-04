'use strict';
const Text = require('../../index');

class Subjects extends Text {
  constructor(list) {
    super(list);
    this.list = this.find().list;
    return this;
  }
  find() {
    let subjects = this.splitAfter('#Comma');
    return subjects.match('#Noun+');
  }
  parse() {
    return this.terms.map((t) => {
      return {};
    });
  }
}

module.exports = Subjects;
