const nlp = require('./src/index')
const corpus = require('nlp-corpus')
// nlp.verbose(true)
// nlp.extend(require('./plugins/adjectives/src'))
// nlp.extend(require('./plugins/verbs/src'))

// let doc = nlp(`we're here. we're clear. we don't want anymore bears.`).pre('\n')
// console.log(doc.text())
let txt = corpus.wikipedia.array()[6]
console.time('parse')
nlp(txt)
console.timeEnd('parse')
// console.log(corpus.sotu.array()[27])

let lexicon = {
  kermit: 'FirstName',
  fozzie: 'FirstName',
}
let doc = nlp(muppetText, lexicon)
