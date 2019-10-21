const nlp = require('./src/index')
// const corpus = require('nlp-corpus')
// nlp.verbose(true)
nlp.extend(require('./plugins/verbs/src'))

/*
2. ~walk~ match
3. .swap()
*/

let r = nlp(`i didn't want to`)
r.verbs()
  .debug()
  .toNegative()
  .debug()
console.log(r.text('text'))
