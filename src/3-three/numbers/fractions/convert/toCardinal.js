import toText from '../../numbers/format/toText/index.js'

const toCardinal = function (obj) {
  if (!obj.numerator || !obj.denominator) {
    return ''
  }
  const a = toText({ num: obj.numerator })
  const b = toText({ num: obj.denominator })
  return `${a} out of ${b}`
}
export default toCardinal
