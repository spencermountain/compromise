'use strict';
const Text = require('../index');

class Questions extends Text {
  constructor(list) {
    super(list);
    this.list=this.find().list
    return this;
  }
  find(){
    return this.list.filter((ts) => {
      return ts.last().endPunctuation() === '?';
    });
  }
  parse() {
    return this.list.map((ts) => {
      return {
        text: ts.plaintext(),
        normal: ts.normal()
      };
    });
  }
}

module.exports = Questions;
