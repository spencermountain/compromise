'use strict';
const Text = require('../../index');
const Value = require('./value');

class Values extends Text {
  data() {
    return this.list.map((ts) => {
      return ts.data();
    });
  }
  noDates() {
    return this.not('#Date');
  }
  /** five -> 5 */
  numbers() {
    return this.list.map((ts) => {
      return ts.number();
    });
  }
  /** five -> '5' */
  toNumber() {
    this.list = this.list.map((ts) => {
      return ts.toNumber();
    });
    return this;
  }
  /**5 -> 'five' */
  toTextValue() {
    this.list = this.list.map((ts) => {
      return ts.toTextValue();
    });
    return this;
  }
  /**5th -> 5 */
  toCardinal() {
    this.list = this.list.map((ts) => {
      return ts.toCardinal();
    });
    return this;
  }
  /**5 -> 5th */
  toOrdinal() {
    this.list = this.list.map((ts) => {
      return ts.toOrdinal();
    });
    return this;
  }
  /**5900 -> 5,900 */
  toNiceNumber() {
    this.list = this.list.map((ts) => {
      return ts.toNiceNumber();
    });
    return this;
  }
  static find(r, n) {
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
  }
}
Values.prototype.clone = function() {
  let list = this.list.map((ts) => {
    return ts.clone();
  });
  return new Values(list, this.lexicon);
};
module.exports = Values;
