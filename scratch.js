const nlp = require('./src/index')
// const corpus = require('nlp-corpus')
// nlp.verbose(true)
nlp.extend(require('./plugins/numbers/src'))

/*
2. ~walk~ match
3. .swap()
*/

let doc = nlp('500th')

// doc.debug()

doc
  .numbers()
  .toText()
  .debug()

console.log(doc.text())
