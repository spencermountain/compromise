'use strict';
//create an easy mapping between ordinal-cardinal
const numbers = require('./numbers')
let toOrdinal = {}
let toCardinal = {}
Object.keys(numbers.ordinal).forEach((k) => {
  let ordinal = Object.keys(numbers.ordinal[k])
  let cardinal = Object.keys(numbers.cardinal[k])
  for (let i = 0; i < ordinal.length; i++) {
    toOrdinal[cardinal[i]] = ordinal[i]
    toCardinal[ordinal[i]] = cardinal[i]
  }
})
module.exports = {
  toOrdinal: toOrdinal,
  toCardinal: toCardinal
}
// console.log(toCardinal)
