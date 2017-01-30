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
    this.forEach((ts) => {
      ts.toNumber();
    });
    return this;
  }
  /**5 -> 'five' */
  toTextValue() {
    this.forEach((ts) => {
      ts.toTextValue();
    });
    return this;
  }
  /**5th -> 5 */
  toCardinal() {
    this.forEach((ts) => {
      ts.toCardinal();
    });
    return this;
  }
  /**5 -> 5th */
  toOrdinal() {
    this.forEach((ts) => {
      ts.toOrdinal();
    });
    return this;
  }
  /**5900 -> 5,900 */
  toNiceNumber() {
    this.forEach((ts) => {
      ts.toNiceNumber();
    });
    return this;
  }
  static find(r, n) {
    // r.check();
    r = r.match('#Value+');
    // console.log(r.out('array'));
    if (r.has('. (a|an)')) {
      r = r.not('(a|an)$');
    }
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
