const toText = require('../numbers/convert/toText')
const toOrdinal = require('../numbers/convert/toOrdinal/textOrdinal')
// do some fraction-work

const round = (n) => Math.round(n * 100) / 100

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

// 'two out of three'
exports.textCardinal = function (obj) {
  if (!obj.numerator || !obj.denominator) {
    return ''
  }
  let a = toText(obj.numerator)
  let b = toText(obj.denominator)
  return `${a} out of ${b}`
}

// create 1.33 from {1,3}
exports.toDecimal = function (obj) {
  if (!obj.numerator) {
    return 0
  }
  // don't divide by zero
  if (!obj.denominator) {
    return null
  }
  // actually do the math
  let num = obj.numerator / obj.denominator
  num = round(num) // to 2 decimal places
  return num
}
