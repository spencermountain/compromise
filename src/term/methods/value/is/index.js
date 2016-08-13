'use strict';
//'is' methods for value
const p = require('../paths');
const num = p.data.numbers;
const ordinal = num.ordinal;
const cardinal = num.cardinal;

const lastWord = (t) => {
  let words = t.normal.split(/[ -]/);
  return words[words.length - 1];
};

let value = {

  /** is this an ordinal number written in numbers, like '500th' */
  numberordinal: (t) => {
    if (t.normal.match(/[0-9](st|nd|rd|r?th)$/)) {
      return true;
    }
    return false;
  },
  /** is this an ordinal number spelled-out in words, like 'five hundredth' */
  textordinal: (t) => {
    let last = lastWord(t);
    if (ordinal.ones[last] || ordinal.teens[last] || ordinal.tens[last] || ordinal.multiples[last]) {
      return true;
    }
    return false;
  },
  /** is this an cardinal number written in numbers, like '500' */
  numbercardinal: (t) => {
    if (t.normal.match(/^[0-9,\.]+$/)) {
      return true;
    }
    return false;
  },
  /** is this an cardinal number spelled-out in words, like 'five hundredth' */
  textcardinal: (t) => {
    let last = lastWord(t);
    if (cardinal.ones[last] || cardinal.teens[last] || cardinal.tens[last] || cardinal.multiples[last]) {
      return true;
    }
    return false;
  },

  /** an ordinal is '5th', or 'fifth', instead of 5 */
  ordinal: (t) => {
    if (t.is('NumberOrdinal') || t.is('TextOrdinal')) {
      return true;
    }
    return false;
  },

  /** a cardinal is a number that is not an ordinal like 'fifth', but a regular number, like 'five' */
  cardinal: (t) => {
    if (t.is('NumberCardinal') || t.is('TextCardinal')) {
      return true;
    }
    return false;
  },

  /** a TextValue is a number that's spelled-out*/
  textvalue: (t) => {
    if (t.is('TextCardinal') || t.is('TextOrdinal')) {
      return true;
    }
    return false;
  },
  /** a TextValue is a number that's spelled-out*/
  Numeric: (t) => {
    if (t.is('NumberCardinal') || t.is('NumberOrdinal')) {
      return true;
    }
    return false;
  }
};
module.exports = value;
