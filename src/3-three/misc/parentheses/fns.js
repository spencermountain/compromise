import { findPairs, stripPairs } from '../_pairs.js'
const hasOpen = /\(/
const hasClosed = /\)/

const findEnd = function (terms, i) {
  for (; i < terms.length; i += 1) {
    if (terms[i].post && hasClosed.test(terms[i].post)) {
      return i
    }
  }
  return null
}

const find = findPairs(hasOpen, findEnd)
const strip = stripPairs(hasOpen, hasClosed)
export { find, strip }
