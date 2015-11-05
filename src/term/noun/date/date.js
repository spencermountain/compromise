'use strict';
const Noun = require('../noun.js');
const parse = require('./parse.js');

class Date extends Noun {
  constructor(str) {
    super(str);
    this.parent = 'date';
    this.date = null;
    this.parse();
  }

  parse() {
    let dates = parse(this.text) || [];
    if (dates.length) {
      this.date = dates[0].Date;
    }
  }

}

module.exports = Date;
