'use strict';
const Noun = require('../noun.js');
const parse_date = require('./parse_date.js');

class _Date extends Noun {
  constructor(str, tag) {
    super(str);
    this.tag = tag;
    this.pos['Date'] = true;
    this.data = parse_date(this.text) || {};
  }

  //can we make it a js Date object?
  is_date() {
    let o = this.data;
    if (o.month === null || o.day === null || o.year === null) {
      return false;
    }
    return true;
  }

  date() {
    if (this.is_date() === false) {
      return null;
    }
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
_Date.fn = _Date.prototype;

module.exports = _Date;

// let d = new _Date('June 4th 1993');
// console.log(d.date());
