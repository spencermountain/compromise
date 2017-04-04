'use strict';
const Text = require('../../index');
const Value = require('./value');

//the Values() subset class
const methods = {
  data: function() {
    return this.list.map((ts) => ts.data());
  },
  noDates: function() {
    return this.not('#Date');
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
  toTextValue: function() {
    this.list = this.list.map((ts) => {
      return ts.toTextValue();
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
  toNiceNumber: function() {
    this.list = this.list.map((ts) => {
      return ts.toNiceNumber();
    });
    return this;
  }
};

const find = function(r, n) {
  r = r.match('#Value+');
  // r = r.match('#Value+ #Unit?');

  //june 21st 1992 is two seperate values
  r.splitOn('#Year');
  // r.debug();
  if (typeof n === 'number') {
    r = r.get(n);
  }
  r.list = r.list.map((ts) => {
    return new Value(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
  });
  return r;
};

module.exports = Text.makeSubset(methods, find);
