import { convert } from 'suffix-thumb'

// convert with one of the suffix-thumb models
const by = key => (adj, model) => convert(adj, model.two.models[key])

const toSuperlative = by('toSuperlative')
const toComparative = by('toComparative')
const fromComparative = by('fromComparative')
const fromSuperlative = by('fromSuperlative')
const toNoun = by('adjToNoun')

export {
  toSuperlative, toComparative, fromComparative, fromSuperlative, toNoun
}
