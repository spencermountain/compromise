import toText from '../../numbers/format/toText/index.js'
import textOrdinal from '../../numbers/format/toOrdinal/textOrdinal.js'
import { isValid } from '../_lib.js'

const toOrdinal = function (obj) {
  // don't divide by zero!
  if (!isValid(obj)) {
    return ''
  }
  // create [two] [fifths]
  const start = toText({ num: obj.numerator })
  let end = textOrdinal({ num: obj.denominator })
  // 'one secondth' -> 'one half'
  if (obj.denominator === 2) {
    end = 'half'
  }
  if (start && end) {
    if (Math.abs(obj.numerator) !== 1) {
      end = end === 'half' ? 'halves' : end + 's'
    }
    return `${start} ${end}`
  }
  return ''
}
export default toOrdinal
