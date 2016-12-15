'use strict';
const Terms = require('../../paths').Terms;
const parse = require('./parse');

class Value extends Terms {
  /** five -> '5' */
  toNumber() {
    let num = parse(this);
    this.replaceWith('' + num);
    // this.tagAs('NumericValue', 'toNumber()');
    return this;
  }
  /**5900 -> 5,900 */
  toNiceNumber() {
    return this;
  }
  /**5 -> 'five' */
  toTextValue() {
    this.unTag('NumericValue', 'toTextValue()');
    this.tagAs('TextValue', 'toTextValue()');
    return this;
  }
  /**5th -> 5 */
  toCardinal() {
    this.unTag('Ordinal', 'toCardinal()');
    this.tagAs('Cardinal', 'toCardinal()');
    return this;
  }
  /**5 -> 5th */
  toOrdinal() {
    t.unTag('Cardinal', 'toOrdinal()');
    t.tagAs('Ordinal', 'toOrdinal()');
    return this;
  }
  parse() {
    return {
      number: this.number(),
      nicenumber: this.nicenumber(),
      textValue: this.textValue(),
      cardinal: this.cardinal(),
      ordinal: this.ordinal(),
    };
  }
}
module.exports = Value;
