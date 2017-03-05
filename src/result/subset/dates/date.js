'use strict';
const Terms = require('../../paths').Terms;
// const parsePunt = require('./parsePunt');
// const parseSection = require('./parseSection');
// const parseRelative = require('./parseRelative');
const parseDate = require('./parseDate');

class Date extends Terms {
  constructor(arr, lexicon, refText, refTerms) {
    super(arr, lexicon, refText, refTerms);
    this.month = this.match('#Month');
  }
  data() {
    return {
      text: this.out('text'),
      normal: this.out('normal'),
      date: parseDate(this)
    };
  }
}
module.exports = Date;
