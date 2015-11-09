'use strict';
const Noun = require('../noun.js');
const parse_date = require('./parse_date.js');

class _Date extends Noun {
  constructor(str, tag) {
    super(str);
    this.tag = tag;
    this.pos['Date'] = true;
    this.date = null;
    this.data = parse_date(this.text) || {};
  }

  interpret() {
    let d = new Date();
    if (this.data.year) {
      d.setYear(this.data.year);
    }
    if (this.data.month !== null) {
      d.setMonth(this.data.month);
    }
    if (this.data.day !== null) {
      d.setDate(this.data.day);
    }
    return d;
  }

}

module.exports = _Date;

// let d = new _Date('june thirtieth 1983');
// console.log(d.interpret());
