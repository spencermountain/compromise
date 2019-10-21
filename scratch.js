const nlp = require('./src/index')
// const corpus = require('nlp-corpus')
// nlp.verbose(true)
nlp.extend(require('./plugins/verbs/src'))

/*
2. ~walk~ match
3. .swap()
*/

// let r = nlp(`i said “don't have a cow, man”.`)
let r = nlp(`he is \u2E42really good\u201D`)
r.debug()
r.quotations().debug()
console.log(r.text())
