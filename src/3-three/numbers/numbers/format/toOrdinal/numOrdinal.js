import toString from '../../_toString.js'
import { ordSuffix } from '../../_words.js'

// turn a number like 5 into an ordinal like 5th
const numOrdinal = function (obj) {
  const num = obj.num
  if (!num && num !== 0) {
    return null
  }
  const str = toString(num)
  return str + ordSuffix(str)
}

export default numOrdinal
