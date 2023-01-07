import { findChained } from './lib.js'

// find best reference for 'they' & 'their'
const getThey = function (s) {
  let nouns = s.nouns()

  // somebody shaved their head
  let things = nouns.match('(somebody|nobody|everybody|anybody)')
  if (things.found) {
    return things.last()
  }

  // 'the bananas'
  things = nouns.isPlural()
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