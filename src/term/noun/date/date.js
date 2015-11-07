'use strict';
const Noun = require('../noun.js');
const parse = require('./parse.js');

class Date extends Noun {
  constructor(str, tag) {
    super(str);
    this.tag = tag;
    this.pos = 'Date';
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
