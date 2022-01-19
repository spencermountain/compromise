import numOrdinal from './toOrdinal/numOrdinal.js'
import textOrdinal from './toOrdinal/textOrdinal.js'
import textCardinal from './toText/index.js'
import makeSuffix from './suffix.js'

const format = function (obj, fmt) {
  if (fmt === 'TextOrdinal') {
    return obj.prefix + textOrdinal(obj) + makeSuffix(obj)
  }
  if (fmt === 'Ordinal') {
    return obj.prefix + numOrdinal(obj) + obj.suffix
  }
  if (fmt === 'TextCardinal') {
    return obj.prefix + textCardinal(obj) + makeSuffix(obj)
  }
  // assume Cardinal
  return obj.prefix + String(obj.num) + obj.suffix
}
export default format