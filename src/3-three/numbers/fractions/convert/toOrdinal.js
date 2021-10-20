import toText from '../../numbers/convert/toText/index.js'
import textOrdinal from '../../numbers/convert/toOrdinal/textOrdinal.js'

const toOrdinal = function (obj) {
  // don't divide by zero!
  if (!obj.numerator || !obj.denominator) {
    return ''
  }
  // create [two] [fifths]
  let start = toText(obj.numerator)
  let end = textOrdinal(obj.denominator)
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
export default toOrdinal
