'use strict';
const Terms = require('../../paths').Terms;
const parsePunt = require('./parsePunt');
const parseSection = require('./parseSection');
const parseRelative = require('./parseRelative');
const parseDate = require('./parseDate');

class Date extends Terms {
  constructor(terms, context) {
    super(terms, context);
    this.month = this.match('#Month')
  }

  parse() {
    let obj = {}
      //parsing order matters..
      //[two days before] [the start of] [this] [thursday]
    obj.punt = parsePunt(this) //two days before
    obj.section = parseSection(this) //the start of
    obj.relative = parseRelative(this) //this
    obj.relative = parseDate(this) //thursday
    return obj
  }
}
module.exports = Date
