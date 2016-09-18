'use strict';
const toNumber = require('./toNumber');
const toText = require('./toText');
const parseNumber = require('./parse');

const info = {

  /* return a number, like '5th', as a cardinal, like 5 */
  cardinal: (t) => {
    let num = parseNumber(t);
    //if it is textual, make a textCardinal
    if (t.is('TextValue')) {
      return toText.cardinal(num);
    }
    //otherwise, numerical form
    return num;
  },

  /* return a number, like '5', as an ordinal, like '5th' */
  ordinal: (t) => {
    let num = parseNumber(t);
    //if it is textual, make a textCardinal
    if (t.is('TextValue')) {
      return toText.ordinal(num);
    }
    //otherwise, numerical form
    return toNumber.ordinal(num);
  },

  /** return a float/integer version of this number*/
  number: (t) => {
    let n = parseNumber(t);
    if (t.is('Ordinal')) {
      return toNumber.ordinal(n);
    }
    return n;
  },

  /** return a textual version of this number*/
  textual: (t) => {
    let num = parseNumber(t);
    if (t.is('Ordinal')) {
      return toText.ordinal(num);
    } else {
      return toText.cardinal(num);
    }
  },

  nicenumber: (t) => {
    let n = parseNumber(t);
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
  parse: (t) => {
    let num = parseNumber(t);
    return {
      Numeric: {
        Cardinal: num,
        Ordinal: toNumber.ordinal(num)
      },
      TextValue: {
        Cardinal: toText.cardinal(num),
        Ordinal: toText.ordinal(num)
      }
    };
  }

};
module.exports = info;
