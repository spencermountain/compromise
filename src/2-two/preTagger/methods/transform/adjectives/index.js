import { toSuperlative, toComparative, fromSuperlative, fromComparative } from './inflect.js'
import fromAdverb from './adverbs/toAdjective.js'
import toAdverb from './adverbs/toAdverb.js'
import toNoun from './adverbs/toNoun.js'

const all = function (str, model) {
  let arr = [str]
  arr.push(toSuperlative(str, model))
  arr.push(toComparative(str, model))
  arr.push(toAdverb(str))
  arr = arr.filter(s => s)
  arr = new Set(arr)
  return Array.from(arr)
}

export default {
  toSuperlative, toComparative, toAdverb, toNoun,
  fromAdverb, fromSuperlative, fromComparative,
  all,
}