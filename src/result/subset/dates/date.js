'use strict';
const Terms = require('../../paths').Terms;
const parsePunt = require('./parsePunt');

class Date extends Terms {
  constructor(terms, context) {
    super(terms, context);
    this.month = this.match('#Month')
  }
  parseRelative() {
    return null
  }
  parseDate() {
    return {
      month: null,
      date: null,
      day: null,
      year: null,
      knownDate: null
    }
  }
  parse() {
    let obj = {}
    obj.punt = parsePunt(this)
    obj.parseRelative = this.parseRelative()
    return obj
  }
}
module.exports = Date
