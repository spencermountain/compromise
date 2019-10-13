const nlp = require('./src/index')
// const corpus = require('nlp-corpus')
// nlp.verbose(true)
// nlp.extend(require('./plugins/output/src'))
nlp.extend(require('./plugins/verbs/src'))
nlp.extend(require('./plugins/nouns/src'))
// nlp.extend(require('./plugins/paragraphs/src'))
// nlp.extend(require('./plugins/sentences/src'))

// let str = `What's with these homies dissin' my girl? Why do they gotta front?

// What did we ever do to these guys that made them so violent?

// `
// let doc = nlp(str).join()
// console.log(doc.text() + '|')

let doc = nlp(`the donkeys' hotel`).debug()
console.log(doc.list[0].terms(0))
doc.nouns().toPlural()
// doc.nouns().toSingular()
// console.log(doc.nouns().json())
// doc
//   .nouns()
//   .hasPlural()
//   .debug()

// console.log(doc.has('girl'))
// console.log(doc.text('normal'))
