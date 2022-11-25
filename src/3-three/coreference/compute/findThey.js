import { findChained } from './lib.js'

// find best reference for 'they' & 'their'
const getThey = function (s) {
  // 'the bananas'
  let things = s.nouns().isPlural()
  if (things.found) {
    return things.last()
  }
  // re-use existing pronoun reference
  let chain = findChained('(they|their|theirs)', s)
  if (chain.found) {
    return chain
  }
  return s.none()
}


export default getThey