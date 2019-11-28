const textValue = require('../toText')
// const toString = require('../_toString')

const irregulars = {
  one: 'first',
  two: 'second',
  three: 'third',
  five: 'fifth',
  eight: 'eighth',
  nine: 'ninth',
  twelve: 'twelfth',
  twenty: 'twentieth',
  thirty: 'thirtieth',
  forty: 'fortieth',
  fourty: 'fourtieth',
  fifty: 'fiftieth',
  sixty: 'sixtieth',
  seventy: 'seventieth',
  eighty: 'eightieth',
  ninety: 'ninetieth',
}

/**
 * convert a javascript number to 'twentieth' format
 * */
const textOrdinal = num => {
  let words = textValue(num).split(' ')
  //convert the last number to an ordinal
  let last = words[words.length - 1]
  if (irregulars.hasOwnProperty(last)) {
    words[words.length - 1] = irregulars[last]
  } else {
    words[words.length - 1] = last.replace(/y$/, 'i') + 'th'
  }
  return words.join(' ')
}

module.exports = textOrdinal
