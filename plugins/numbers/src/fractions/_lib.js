const toText = require('../numbers/convert/toText')
const toOrdinal = require('../numbers/convert/toOrdinal/textOrdinal')
const makeNumber = require('../numbers/convert/makeNumber')
// do some fraction-work

const round = (n) => Math.round(n * 10) / 10

// create 'one thirds' from {1,3}
exports.toText = function (obj) {
  // don't divide by zero!
  if (!obj.numerator || !obj.denominator) {
    return ''
  }
  // create [two] [fifths]
  let start = toText(obj.numerator)
  let end = toOrdinal(obj.denominator)
  if (start && end) {
    if (obj.numerator !== 1) {
      end += 's'
    }
    return `${start} ${end}`
  }
  return ''
}

// create 1.33 from {1,3}
exports.toFraction = function (obj) {
  if (obj.num === null) {
    return null
  }
  let num = makeNumber(obj, false)
  return num
}
