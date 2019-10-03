var nlp = require('./src/index')
// const corpus = require('nlp-corpus')
// nlp.verbose(true)
nlp.extend(require('./plugins/nouns/src'))
nlp.extend(require('./plugins/sentences/src'))

// let arr = corpus.sotu.array().slice(0, 10)
// console.time('parse')
// arr.forEach(txt => nlp(txt) })
// console.timeEnd('parse')

let doc = nlp('in the end')
doc.match('end').forEach(p => {
  p.replaceWith('more words here')
})
// console.log(doc.terms())
// console.log(doc.terms())
doc.debug()

// var doc = nlp('He is cool.')
// doc.forEach(d => {
//   d.prepend('so')
// })
// console.log(doc.out())
// console.log(doc.list[0])
