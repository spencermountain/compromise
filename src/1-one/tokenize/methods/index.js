import splitSentences from './01-sentences/index.js'
import splitTerms from './02-terms/index.js'
import splitWhitespace from './03-whitespace/index.js'
import killUnicode from './unicode.js'
import fromString from './parse.js'


export default {
  one: {
    killUnicode,
    tokenize: {
      splitSentences,
      splitTerms,
      splitWhitespace,
      fromString,
    },
  },
}
