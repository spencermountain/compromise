const toString = require('./_toString')
const toText = require('./toText')
const numOrdinal = require('./toOrdinal/numOrdinal')
const textOrdinal = require('./toOrdinal/textOrdinal')
const symbols = require('./_symbols')
const prefixes = symbols.prefixes
const suffixes = symbols.suffixes

// convert $ to 'dollars', etc
const prefixToText = function(obj) {
  // turn 5% to 'five percent'
  if (prefixes.hasOwnProperty(obj.prefix)) {
    obj.suffix += prefixes[obj.prefix]
    obj.prefix = ''
  }
  //turn 5km to 'five kilometres'
  if (suffixes.hasOwnProperty(obj.suffix)) {
    obj.suffix = prefixes[obj.suffix]
  }
  // add a space, if it exists
  if (obj.suffix) {
    obj.suffix = ' ' + obj.suffix
  }
  return obj
}

//business-logic for converting a cardinal-number to other forms
const makeNumber = function(obj, isText, isOrdinal) {
  let num = String(obj.num)
  if (isText) {
    obj = prefixToText(obj)
    if (isOrdinal) {
      //ordinal-text
      num = textOrdinal(num)
      return `${obj.prefix || ''}${num}${obj.suffix || ''}`
    }
    //cardinal-text
    num = toText(num)
    return `${obj.prefix || ''}${num}${obj.suffix || ''}`
  }
  //ordinal-number
  if (isOrdinal) {
    return numOrdinal(num)
  }
  // cardinal-number
  num = toString(num) // support very large numbers
  return `${obj.prefix || ''}${num}${obj.suffix || ''}`
}
module.exports = makeNumber
