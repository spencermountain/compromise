import { convert } from 'suffix-thumb'
import toAdverb from '../adverbs/toAdverb.js'


const toSuperlative = function (adj, model) {
  const mod = model.two.models.toSuperlative
  return convert(adj, mod)
}
const toComparative = function (adj, model) {
  const mod = model.two.models.toComparative
  return convert(adj, mod)
}
const fromComparative = function (adj, model) {
  const mod = model.two.models.fromComparative
  return convert(adj, mod)
}
const fromSuperlative = function (adj, model) {
  const mod = model.two.models.fromSuperlative
  return convert(adj, mod)
}

const all = function (str, model) {
  let arr = [str]
  arr.push(toSuperlative(str, model))
  arr.push(toComparative(str, model))
  arr.push(toAdverb(str))
  arr = arr.filter(s => s)
  arr = new Set(arr)
  return Array.from(arr)
}

export {
  all,
  toSuperlative, toComparative, fromComparative, fromSuperlative
}
