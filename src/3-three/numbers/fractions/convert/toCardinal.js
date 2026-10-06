import toText from '../../numbers/format/toText/index.js'
import { isValid } from '../_lib.js'

const toCardinal = function (obj) {
  if (!isValid(obj)) {
    return ''
  }
  const a = toText({ num: obj.numerator })
  const b = toText({ num: obj.denominator })
  return `${a} out of ${b}`
}
export default toCardinal
