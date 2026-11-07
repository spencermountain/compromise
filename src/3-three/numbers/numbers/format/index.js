import numOrdinal from './toOrdinal/numOrdinal.js'
import textOrdinal from './toOrdinal/textOrdinal.js'
import textCardinal from './toText/index.js'
import makeSuffix from './suffix.js'
import { Ord } from '../../../../2-two/preTagger/tagSet/_lib.js'

// keep a sign ahead of any currency prefix - '-$5'
const withPrefix = (obj, str) => {
  if (str.startsWith('-')) {
    return '-' + obj.prefix + str.slice(1)
  }
  return obj.prefix + str
}

const format = function (obj, fmt) {
  if (fmt === 'TextOrdinal') {
    const { prefix, suffix } = makeSuffix(obj)
    return prefix + textOrdinal(obj) + suffix
  }
  if (fmt === Ord) {
    return withPrefix(obj, numOrdinal(obj)) + obj.suffix
  }
  if (fmt === 'TextCardinal') {
    const { prefix, suffix } = makeSuffix(obj)
    return prefix + textCardinal(obj) + suffix
  }
  // assume Cardinal
  let num = obj.num
  if (obj.hasComma) {
    num = num.toLocaleString()
  }
  return withPrefix(obj, String(num)) + obj.suffix
}
export default format