import sentence from './01-sentences/index.js'
import term from './02-terms/index.js'
import whitespace from './03-whitespace/index.js'
import normalize from '../compute/normal/index.js'
import killUnicode from './unicode.js'

// turn a string input into a 'document' json format
const fromString = function (input, world) {
  const { methods, model } = world
  const { splitSentences, splitTerms, splitWhitespace } = methods.one.tokenize
  input = input || ''
  // split into sentences
  let sentences = splitSentences(input, model)
  // split into word objects
  input = sentences.map((txt) => {
    let terms = splitTerms(txt, model)
    // split into [pre-text-post]
    terms = terms.map(splitWhitespace)
    // add normalized term format, always
    terms.forEach((t) => {
      normalize(t, world)
    })
    return terms
  })
  return input
}

export default {
  one: {
    killUnicode,
    tokenize: {
      splitSentences: sentence,
      splitTerms: term,
      splitWhitespace: whitespace,
      fromString,
    },
  },
}
