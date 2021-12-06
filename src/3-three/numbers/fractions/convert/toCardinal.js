import toText from '../../numbers/format/toText/index.js'

const toCardinal = function (obj) {
  if (!obj.numerator || !obj.denominator) {
    return ''
  }
  let a = toText(obj.numerator)
  let b = toText(obj.denominator)
  return `${a} out of ${b}`
}
export default toCardinal
