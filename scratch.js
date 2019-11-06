const nlp = require('./src/index')
// nlp.verbose(true)
nlp.extend(require('./plugins/numbers/src'))
nlp.extend(require('./plugins/dates/src'))

// **.normalize()** options
// let options = {
//   case: true,
//   whitespace: true,
//   unicode: true,
//   punctuation: true,

//   contractions: false,
//   adverbs: false,
//   emoji: false,
//   parentheses: false,
//   quotations: false,
//   possessives: false,
//   verbs: false,
//   nouns: false,
// }
// let doc = nlp(`We're HERE. we're CLEAR. we don't want anymore bears.`)
// doc.normalize(options)
// console.log(doc.text())

// bug one:
let doc = nlp('two weeks ').tag('Cool')
doc.numbers().toNumber()
doc.debug()

// bug two:
// let doc = nlp('two weeks before june 19th 2019')
// doc.match('^(on|during|in) [.]').debug()

// console.log(doc.dates().json())
