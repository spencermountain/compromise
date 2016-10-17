'use strict';
const Result = require('../index');

class Values extends Result {
  constructor(list) {
    super(list);
    this.when('#Value+');
    return this;
  }
  parse() {
    return this.terms.map((t) => {
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
    this.terms.forEach((t) => {
      t.text = '' + t.value.number();
      t.tagAs('NumericValue', 'toNumber()');
    });
    return this;
  }
  /**5900 -> 5,900 */
  toNiceNumber() {
    this.terms.forEach((t) => {
      t.text = '' + t.value.nicenumber();
    });
    return this;
  }
  /**5 -> 'five' */
  toTextValue() {
    this.terms.forEach((t) => {
      t.text = t.value.textValue();
      t.tagAs('TextValue', 'toTextValue()');
    });
    return this;
  }
  /**5th -> 5 */
  toCardinal() {
    this.terms.forEach((t) => {
      t.text = '' + t.value.cardinal();
      t.tagAs('Cardinal', 'toCardinal()');
    });
    return this;
  }
  /**5 -> 5th */
  toOrdinal() {
    this.terms.forEach((t) => {
      t.text = t.value.ordinal();
      t.tagAs('Ordinal', 'toOrdinal()');
    });
    return this;
  }
}

module.exports = Values;
