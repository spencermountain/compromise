'use strict';
//
const toOrdinal = require('../../paths').data.ordinalMap.toOrdinal;
const buildUp = require('./buildUp')
const toText = {
  cardinal: (t) => {
    let num = parseFloat(t.normal)
    let arr = buildUp(num)
    return arr.join(' ')
  },
  ordinal: (t) => {
    let num = parseFloat(t.normal)
    let arr = buildUp(num)
    //convert the last number to an ordinal
    let last = arr[arr.length - 1]
    arr[arr.length - 1] = toOrdinal[last] || last
    return arr.join(' ')
  }
}

module.exports = toText
