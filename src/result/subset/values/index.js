'use strict';
const Text = require('../../index');
const Value = require('./value');
const parse = require('./parse');


//the Values() subset class
const methods = {
  noDates: function() {
    return this.not('#Date');
  },
  noUnits: function() {
    return this.not('#Unit');
  },
  units: function() {
    return this.match('#Unit+');
  },
  /** five -> 5 */
  numbers: function() {
    return this.list.map((ts) => {
      return ts.number();
    });
  },
  /** five -> '5' */
  toNumber: function() {
    this.list = this.list.map((ts) => {
      return ts.toNumber();
    });
    return this;
  },
  /**5 -> 'five' */
  toText: function() {
    this.list = this.list.map((ts) => {
      return ts.toText();
    });
    return this;
  },
  /**5th -> 5 */
  toCardinal: function() {
    this.list = this.list.map((ts) => {
      return ts.toCardinal();
    });
    return this;
  },
  /**5 -> 5th */
  toOrdinal: function() {
    this.list = this.list.map((ts) => {
      return ts.toOrdinal();
    });
    return this;
  },
  /**5900 -> 5,900 */
  toNice: function() {
    this.list = this.list.map((ts) => {
      return ts.toNice();
    });
    return this;
  },
  /**seven === 7th */
  isEqual: function(num) {
    num = parse(num);
    this.list = this.list.filter((ts) => {
      return num !== null && ts.number() === num;
    });
    return this;
  },
  /**eight > 7th */
  greaterThan: function(num) {
    num = parse(num);
    this.list = this.list.filter((ts) => {
      return num !== null && ts.number() > num;
    });
    return this;
  },
  /**five < 7th */
  lessThan: function(num) {
    num = parse(num);
    this.list = this.list.filter((ts) => {
      return num !== null && ts.number() < num;
    });
    return this;
  },
  /**seven + 2 = 'nine' */
  add: function(n) {
    this.list = this.list.map((ts) => {
      return ts.add(n);
    });
    return this;
  },
  /**seven - 2 = 'five' */
  subtract: function(n) {
    this.list = this.list.map((ts) => {
      return ts.subtract(n);
    });
    return this;
  },
  /**seven -> 'eight' */
  increment: function() {
    this.list = this.list.map((ts) => {
      return ts.add(1);
    });
    return this;
  },
  /**seven -> 'eight' */
  decrement: function() {
    this.list = this.list.map((ts) => {
      return ts.subtract(1);
    });
    return this;
  },
};

const find = function(r, n) {
  r = r.match('#Value+ #Unit?');
  // r = r.match('#Value+ #Unit?');

  //june 21st 1992 is two seperate values
  if (r.has('#NumericValue #NumericValue')) {
    r.splitOn('#Year');
  }
  //fifth five
  if (r.has('#Ordinal #Cardinal')) {
    r.splitBefore('#Cardinal+');
  }
  //five 2017 (support '5 hundred', and 'twenty 5'
  if (r.has('#TextValue #NumericValue') && !r.has('(twenty|thirty|fourty|fifty|sixty|seventy|eighty|ninety|hundred|thousand|million|billion|trillion)')) {
    r.splitBefore('#NumericValue+');
  }
  //5-8
  if (r.has('#NumberRange')) {
    r.splitAfter('#NumberRange');
  }
  // r.splitAfter('#Comma');
  if (typeof n === 'number') {
    r = r.get(n);
  }
  r.list = r.list.map((ts) => {
    return new Value(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
  });
  return r;
};

module.exports = Text.makeSubset(methods, find);
