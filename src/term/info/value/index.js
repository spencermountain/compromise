'use strict';
const toNumber = require('./number')
const toText = require('./text')
const parseNumber = require('./parse')

const info = {

  /* return a number, like '5th', as an cardinal, like 5 */
  cardinalForm: (t) => {
    let num = parseNumber(t)
    //if it is textual, make a textCardinal
    if (t.is('TextOrdinal') || t.is('TextCardinal')) {
      return toText.cardinal(num)
    }
    //otherwise, numerical form
    return num
  },
  /* return a number, like '5', as an ordinal, like '5th' */
  ordinalForm: (t) => {
    let num = parseNumber(t)
    //if it is textual, make a textCardinal
    if (t.is('TextOrdinal') || t.is('TextCardinal')) {
      return toText.ordinal(num)
    }
    //otherwise, numerical form
    return toNumber.ordinal(num)
  },
  /** return a float/integer version of this number*/
  number: (t) => {
    let n = parseNumber(t)
    if (t.is('Ordinal')) {
      return toNumber.ordinal(n)
    }
    return n
  },
  /** return a spelled-out ordinal version of this number*/
  textordinal: (t) => {
    let num = parseNumber(t)
    return toText.ordinal(num)
  },
  /** return a spelled-out cardinal version  version of this number*/
  textcardinal: (t) => {
    let num = parseNumber(t)
    return toText.cardinal(num)
  },
  /** return a textual version of this number*/
  textual: (t) => {
    let num = parseNumber(t)
    if (t.is('Ordinal')) {
      return toText.ordinal(num)
    } else {
      return toText.cardinal(num)
    }
  },
  /** generate all forms for this number */
  parse: (t) => {
    let num = parseNumber(t)
    return {
      numberCardinal: num,
      numberOrdinal: toNumber.ordinal(num),
      textCardinal: toText.cardinal(num),
      textOrdinal: toText.ordinal(num)
    }
  }

}
module.exports = info
