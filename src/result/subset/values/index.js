'use strict';
const Text = require('../../index');
const Value = require('./value');

class Values extends Text {
  parse() {
    return this.list.map((ts) => {
      return ts.parse();
    });
  }
  /** five -> '5' */
  toNumber() {
    this.forEach((ts) => {
      ts.toNumber();
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
  static find(r) {
    r = r.match('#Value+');
    r.list = r.list.map((ts) => {
      return new Value(ts.terms, ts.lexicon, ts.parent, ts.parentTerms);
    });
    return r;
  }
}

module.exports = Values;
