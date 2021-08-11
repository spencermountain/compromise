import sentence from './01-sentences/index.js'
import term from './02-terms/index.js'
import whitespace from './03-whitespace/index.js'

// turn a string input into a 'document' json format
const tokenize = function (input, world) {
  const { methods, model, compute } = world
  const { splitSentences, splitTerms, splitWhitespace } = methods.one
  if (typeof input === 'string') {
    // split into sentences
    let sentences = splitSentences(input, model)
    // split into word objects
    input = sentences.map(txt => {
      let terms = splitTerms(txt)
      // split into [pre-text-post]
      return terms.map(splitWhitespace)
    })
    // add normalized term format
    compute.normal(input)
    // support slashes, apostrophes, etc
    compute.alias(input, model)
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
