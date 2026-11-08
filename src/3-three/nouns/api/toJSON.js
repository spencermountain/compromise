import parseNoun from './parse.js'
import { toArray } from '../../_lib.js'

const toText = m => m.text()

const getNum = function (m) {
  const num = null
  if (!m.found) {
    return num
  }
  const val = m.values(0)
  if (val.found) {
    const obj = val.parse()[0] || {}
    return obj.num
  }
  return num
}

const toJSON = function (m) {
  const res = parseNoun(m)
  return {
    root: toText(res.root),
    number: getNum(res.number),
    determiner: toText(res.determiner),
    adjectives: toArray(res.adjectives),
    isPlural: res.isPlural,
    isSubordinate: res.isSubordinate,
  }
}
export default toJSON
