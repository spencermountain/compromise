'use strict';
const Terms = require('../../paths').Terms;
const parsePunt = require('./parsePunt');
const parseSection = require('./parseSection');
const parseRelative = require('./parseRelative');
const parseDate = require('./parseDate');

class Date extends Terms {
  constructor(arr, lexicon, refText, refTerms) {
    super(arr, lexicon, refText, refTerms);
    this.month = this.match('#Month');
  }

  data() {
    let obj = {};
    //parsing order matters..
    //[two days before] [the start of] [this] [thursday]
    obj.punt = parsePunt(this); //two days before
    obj.section = parseSection(this); //the start of
    obj.relative = parseRelative(this); //this
    obj.date = parseDate(this); //thursday
    return obj;
  }
}
module.exports = Date;
