const nlp = require('./src/index')
const corpus = require('nlp-corpus')
// nlp.verbose(true)
// nlp.extend(require('./plugins/adjectives/src'))
// nlp.extend(require('./plugins/verbs/src'))

// **.normalize()** options
let options = {
  case: true,
  whitespace: true,
  unicode: true,
  punctuation: true,

  contractions: false,

  adverbs: false,
  emoji: false,
  parentheses: false,
  quotations: false,
  possessives: false,

  verbs: false,
  nouns: false,
}
// let doc = nlp(`we're here. we're clear. we don't want anymore bears.`).pre('\n')
// console.log(doc.text())
