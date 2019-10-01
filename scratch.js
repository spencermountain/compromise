var nlp = require('./src/index')
// const corpus = require('nlp-corpus')
// nlp.verbose(true)
nlp.extend(require('./plugins/nouns/src'))

// let arr = corpus.sotu.array().slice(0, 10)
// console.time('parse')
// arr.forEach(txt => nlp(txt) })
// console.timeEnd('parse')

// let doc = nlp('before before match, after after.')
// doc.splitOn('@hasComma').debug()

let doc = nlp('before1 before2 match, after after. then over here')
let m = doc.splitBefore('match').debug()
