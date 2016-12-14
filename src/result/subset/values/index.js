'use strict';
const Text = require('../../index');

class Values extends Text {
  parse() {
    return this.mapTerms((t) => {
      return {
        number: t.value.number(),
        nicenumber: t.value.nicenumber(),
        textValue: t.value.textValue(),
        cardinal: t.value.cardinal(),
        ordinal: t.value.ordinal(),
      };
    });
  }
  /** five -> '5' */
  toNumber() {
    this.forEachTerms((t) => {
      let num = t.value.number();
      if (num || num === 0) {
        t.text = '' + num;
        t.unTag('TextValue', 'toNumber()');
        t.tagAs('NumericValue', 'toNumber()');
      }
    });
    return this;
  }
  /**5900 -> 5,900 */
  toNiceNumber() {
    this.forEachTerms((t) => {
      t.text = '' + t.value.nicenumber();
    });
    return this;
  }
  /**5 -> 'five' */
  toTextValue() {
    this.forEachTerms((t) => {
      t.text = t.value.textValue();
      t.unTag('NumericValue', 'toTextValue()');
      t.tagAs('TextValue', 'toTextValue()');
    });
    return this;
  }
  /**5th -> 5 */
  toCardinal() {
    this.forEachTerms((t) => {
      t.text = '' + t.value.cardinal();
      t.unTag('Ordinal', 'toCardinal()');
      t.tagAs('Cardinal', 'toCardinal()');
    });
    return this;
  }
  /**5 -> 5th */
  toOrdinal() {
    this.forEachTerms((t) => {
      t.text = t.value.ordinal();
      t.unTag('Cardinal', 'toOrdinal()');
      t.tagAs('Ordinal', 'toOrdinal()');
    });
    return this;
  }
  static find(r) {
    return r.match('#Value+');
  }
}

module.exports = Values;
