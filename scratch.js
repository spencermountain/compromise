var nlp = require('./src/index')
const corpus = require('nlp-corpus')
// nlp.verbose(true)
// nlp.extend(require('./plugins/verbs/src'))
// nlp.extend(require('./plugins/entities/src'))

let txt = corpus.sotu.array()[8]
console.time('parse')
let doc = nlp(txt)
console.timeEnd('parse')
