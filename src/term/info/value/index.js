'use strict';
const parse = require('./parse')

const info = {

  /* return a number, like '5th', as an cardinal, like 5 */
  cardinalForm: (t) => {

  },
  /* return a number, like '5', as an ordinal, like '5th' */
  ordinalForm: (t) => {

  },

  /** return a float/integer version of this number*/
  number: (t) => {
    return parse(t)
  }

}
module.exports = info
