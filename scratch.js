const nlp = require('./src/index')
// const corpus = require('nlp-corpus')
// nlp.verbose(true)
// nlp.extend(require('./plugins/output/src'))
nlp.extend(require('./plugins/verbs/src'))
nlp.extend(require('./plugins/nouns/src'))
// nlp.extend(require('./plugins/paragraphs/src'))

/*
1. .before()
2. ~walk~ match
3. .swap()
*/

let doc = nlp(`i walked to a store. the store was very nice`)
doc
  .match('store')
  .lookBehind('#Determiner')
  .debug()
// doc.nouns().toPlural()
// doc.nouns().toSingular()
// console.log(doc.nouns().json())
// doc
//   .nouns()
//   .hasPlural()
//   .debug()

// console.log(doc.has('girl'))
// console.log(doc.text('normal'))
