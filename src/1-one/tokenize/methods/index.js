import sentence from './01-sentences/index.js'
import term from './02-terms/index.js'
import whitespace from './03-whitespace/index.js'
import normalize from '../compute/normal/index.js'
import uuid from './uuid.js'

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
    input = sentences.map((txt, n) => {
      let terms = splitTerms(txt, model)
      // split into [pre-text-post]
      terms = terms.map(splitWhitespace)
      // add normalized term format, always
      terms.forEach((term, i) => {
        normalize(term)
        term.id = uuid(n, i)
      })
      return terms
    })
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
