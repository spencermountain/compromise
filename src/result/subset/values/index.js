'use strict';
const Text = require('../../index');
const Value = require('./value');

class Values extends Text {
  data() {
    return this.list.map((ts) => {
      return ts.data();
    });
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
    r = r.match('#Value+ #Unit?');
    r = r.not('#Date');
    if (typeof n === 'number') {
      r = r.get(n);
    }
    r.list = r.list.map((ts) => {
      return new Value(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
    });
    return r;
  }
}
// Values.prototype.clone = function() {
//   console.log('=-');
//   let r = this.clone();
//   return Values.find(r);
// };
module.exports = Values;
