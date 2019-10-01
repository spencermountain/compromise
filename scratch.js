var nlp = require('./src/index')
// const corpus = require('nlp-corpus')
// nlp.verbose(true)
nlp.extend(require('./plugins/sentences/src'))
nlp.extend(require('./plugins/paragraphs/src'))

// let arr = corpus.sotu.array().slice(0, 10)
// console.time('parse')
// arr.forEach(txt => nlp(txt) })
// console.timeEnd('parse')

let str = `What's with these homies dissin' my girl? Why do they gotta front? 

What did we ever do to these guys that made them so violent?

Woo-hoo, but you know I'm yours.
Woo-hoo, and I know you're mine.
Woo-hoo, and that's for all time
`

let doc = nlp(str).paragraphs()
doc.if('these guys').debug()

// doc = doc.filter(p => {
//   return p.has('#Determiner guys')
// })
// doc = doc.forEach(p => {
//   p.terms(0).toUpperCase()
// })
// doc.terms().debug()
// console.log(doc.text())
