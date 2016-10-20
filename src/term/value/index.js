'use strict';
const numericValue = require('./numericValue');
const textValue = require('./textValue');
const parseNumber = require('./parse');

const value = {

  /* return a number, like '5th', as a cardinal, like 5 */
  cardinal: function() {
    let num = parseNumber(this);
    //if it is textual, make a textCardinal
    if (this.tag.TextValue) {
      return textValue.cardinal(num);
    }
    //otherwise, numerical form
    return num;
  },

  /* return a number, like '5', as an ordinal, like '5th' */
  ordinal: function() {
    let num = parseNumber(this);
    //if it is textual, make a textCardinal
    if (this.tag.TextValue) {
      return textValue.ordinal(num);
    }
    //otherwise, numerical form
    return numericValue.ordinal(num);
  },

  /** return a float/integer version of this number*/
  number: function() {
    let n = parseNumber(this);
    if (this.tag.Ordinal) {
      return numericValue.ordinal(n);
    }
    return n;
  },

  /** return a textual version of this number*/
  textValue: function() {
    let num = parseNumber(this);
    if (this.tag.Ordinal) {
      return textValue.ordinal(num);
    } else {
      return textValue.cardinal(num);
    }
  },

  nicenumber: function() {
    let n = parseNumber(this);
    n = '' + n;
    let x = n.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  },

  /** generate all forms for this number */
  parse: function() {
    let num = numericValue(this);
    return {
      Number: {
        Cardinal: num,
        Ordinal: toNumber.ordinal(num)
      },
      Text: {
        Cardinal: textValue.cardinal(num),
        Ordinal: textValue.ordinal(num)
      }
    };
  }

};
module.exports = value;
