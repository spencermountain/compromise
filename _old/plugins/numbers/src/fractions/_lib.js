const toText = require('../numbers/convert/toText')
const toOrdinal = require('../numbers/convert/toOrdinal/textOrdinal')
// do some fraction-work

// create 'one thirds' from {1,3}
exports.toText = function (obj) {
  // don't divide by zero!
  if (!obj.numerator || !obj.denominator) {
    return ''
  }
  // create [two] [fifths]
  let start = toText(obj.numerator)
  let end = toOrdinal(obj.denominator)
  // 'one secondth' -> 'one half'
  if (obj.denominator === 2) {
    end = 'half'
  }
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
  return obj.decimal
}
