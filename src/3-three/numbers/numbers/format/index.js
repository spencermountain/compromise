import numOrdinal from './toOrdinal/numOrdinal.js'
import textOrdinal from './toOrdinal/textOrdinal.js'
import textCardinal from './toText/index.js'
import makeSuffix from './suffix.js'

const format = function (obj, fmt) {
  if (fmt === 'TextOrdinal') {
    return textOrdinal(obj) + makeSuffix(obj)
  }
  if (fmt === 'Ordinal') {
    return numOrdinal(obj) + obj.suffix
  }
  if (fmt === 'TextCardinal') {
    return textCardinal(obj) + makeSuffix(obj)
  }
  // assume Cardinal
  return String(obj.num) + obj.suffix
}
export default format