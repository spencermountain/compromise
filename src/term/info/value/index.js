'use strict';
const toNumber = require('./toNumber')
const toText = require('./toText')

const info = {

  /* return a number, like '5th', as an cardinal, like 5 */
  cardinalForm: (t) => {

  },
  /* return a number, like '5', as an ordinal, like '5th' */
  ordinalForm: (t) => {

  },
  /** return a float/integer version of this number*/
  number: (t) => {
    return toNumber(t)
  },

  /** return a spelled-out ordinal version of this number*/
  textordinal: (t) => {
    return toText.ordinal(t)
  },
  /** return a spelled-out cardinal version  version of this number*/
  textcardinal: (t) => {
    return toText.cardinal(t)
  },
  /** return a textual version of this number*/
  textual: (t) => {
    return toText.ordinal(t)
  }

}
module.exports = info
