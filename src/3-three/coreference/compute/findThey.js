import { findChained } from './lib.js'

// find best reference for 'they' & 'their'
const getThey = function (s) {
  const nouns = s.nouns()

  // 'the bananas'
  let things = nouns.isPlural().notIf('#Pronoun')
  if (things.found) {
    return things.last()
  }
  // re-use existing pronoun reference
  const chain = findChained('(they|their|theirs)', s)
  if (chain.found) {
    return chain
  }

  // they can also refer to a singular noun
  // "the restaurant sold their food"
  // "a choir sang their song"

  // somebody shaved their head
  things = nouns.match('(somebody|nobody|everybody|anybody|someone|noone|everyone|anyone)')
  if (things.found) {
    return things.last()
  }
  return s.none()
}


export default getThey