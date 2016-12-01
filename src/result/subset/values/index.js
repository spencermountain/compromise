'use strict';
const Text = require('../../index');

class Values extends Text {
  constructor(list) {
    super(list);
    return this;
  }
  find() {
    return this.match('#Value+')
  }
  parse() {
      return this.find().terms().map((t) => {
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
      this.find().terms().forEach((t) => {
        let num = t.value.number();
        if (num || num === 0) {
          t.text = '' + num;
          t.unTag('TextValue', 'toNumber()');
          t.tagAs('NumericValue', 'toNumber()');
        }
      });
      // this.all().check()
      return this.all();
    }
    /**5900 -> 5,900 */
  toNiceNumber() {
      this.find().terms().forEach((t) => {
        t.text = '' + t.value.nicenumber();
      });
      return this.all();
    }
    /**5 -> 'five' */
  toTextValue() {
      this.find().terms().forEach((t) => {
        t.text = t.value.textValue();
        t.unTag('NumericValue', 'toTextValue()');
        t.tagAs('TextValue', 'toTextValue()');
      });
      return this.all();
    }
    /**5th -> 5 */
  toCardinal() {
      this.find().terms().forEach((t) => {
        t.text = '' + t.value.cardinal();
        t.unTag('Ordinal', 'toCardinal()');
        t.tagAs('Cardinal', 'toCardinal()');
      });
      return this.all();
    }
    /**5 -> 5th */
  toOrdinal() {
    this.find().terms().forEach((t) => {
      t.text = t.value.ordinal();
      t.unTag('Cardinal', 'toOrdinal()');
      t.tagAs('Ordinal', 'toOrdinal()');
    });
    return this.all();
  }
}

module.exports = Values;
