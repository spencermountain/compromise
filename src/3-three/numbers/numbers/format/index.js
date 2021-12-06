import numOrdinal from './toOrdinal/numOrdinal.js'
import textOrdinal from './toOrdinal/textOrdinal.js'
import textCardinal from './toText/index.js'

const format = function (obj, fmt) {
  if (fmt === 'TextOrdinal') {
    return textOrdinal(obj)
  }
  if (fmt === 'Ordinal') {
    return numOrdinal(obj)
  }
  if (fmt === 'TextCardinal') {
    return textCardinal(obj)
  }
  // assume Cardinal
  return String(obj.num)
}
export default format