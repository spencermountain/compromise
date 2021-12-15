import sentence from './01-sentences/index.js'
import term from './02-terms/index.js'
import whitespace from './03-whitespace/index.js'
import normalize from '../compute/normal/index.js'

// turn a string input into a 'document' json format
const tokenize = function (input, world) {
  const { methods, model, compute } = world
  const { splitSentences, splitTerms, splitWhitespace } = methods.one
  input = input || ''
  if (typeof input === 'number') {
    input = String(input)
  }
  if (typeof input === 'string') {
    // split into sentences
    let sentences = splitSentences(input, model)
    // split into word objects
    input = sentences.map(txt => {
      let terms = splitTerms(txt, model)
      // split into [pre-text-post]
      terms = terms.map(splitWhitespace)
      // add normalized term format, always
      terms.forEach(normalize)
      return terms
    })
    // compute.normal(input)
    // support slashes, apostrophes, etc
    // compute.alias(input, world)
  }
  return input
}

export default {
  one: {
    splitSentences: sentence,
    splitTerms: term,
    splitWhitespace: whitespace,
    tokenize,
  },
}
