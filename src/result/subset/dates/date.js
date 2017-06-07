'use strict';
const Terms = require('../../paths').Terms;
const parseDate = require('./parseDate');

const _Date = function(arr, lexicon, refText) {
  Terms.call(this, arr, lexicon, refText);
  this.month = this.match('#Month');
};

//Inherit properties
_Date.prototype = Object.create(Terms.prototype);

_Date.prototype.data = function() {
  return {
    text: this.out('text'),
    normal: this.out('normal'),
    date: parseDate(this)
  };
};

module.exports = _Date;
