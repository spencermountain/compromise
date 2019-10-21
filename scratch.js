const nlp = require('./src/index')
// const corpus = require('nlp-corpus')
// nlp.verbose(true)
nlp.extend(require('./plugins/nouns/src'))

/*
2. ~walk~ match
3. .swap()
*/

nlp(`gas`)
  // .tag('Singular')
  // .nouns()
  // .toPlural()
  .debug()

// console.log(doc.text())
