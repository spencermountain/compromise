const nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))

// **.normalize()** options
let options = {
  // case: true,
  // whitespace: true,
  // unicode: true,
  // punctuation: true,
  // contractions: false,
  // adverbs: false,
  // emoji: false,
  // parentheses: false,
  // quotations: false,
  // possessives: false,
  // verbs: false,
  // nouns: false,
}
// let doc = nlp(`mr. kelly's, really (i dare say) 'cool' A.F! ;) 👍`).debug()
// let doc = nlp(`the so-called “fascist  dictator”`).debug()
let doc = nlp(`a dash seperates words - like that`).debug()
doc.normalize({ whitespace: true, punctuation: false })
console.log(doc.text())

// let doc = nlp('during august')
// console.log(doc.dates().json(0))
