'use strict';
const Text = require('../../index');

class Subjects extends Text {
  constructor(list) {
    super(list);
    // this.check();
    return this.find()
  }
  find() {
    let subjects = this.splitAfter('#Comma')
    return subjects.match('#Noun+');
  }
  parse() {
    return this.find().terms.map((t) => {
      return {};
    });
  }
}

module.exports = Subjects;
