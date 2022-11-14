import { prevSentence, findChain } from './lib.js'

// find best reference for 'they' & 'their'
const findPlural = function (m) {
  let things = m.before().nouns().isPlural()
  if (things.found) {
    return things.last()
  }
  let chain = findChain('(they|their)')
  if (chain.found) {
    return chain
  }
  // look at prev sentence
  let s = prevSentence(m)
  things = s.before().nouns().isPlural()
  if (things.found) {
    return things.last()
  }
  return m.none()
}

export default findPlural