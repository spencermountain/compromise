const nlp = require('./src/index')
// const corpus = require('nlp-corpus')
// nlp.verbose(true)
// nlp.extend(require('./plugins/output/src'))
nlp.extend(require('./plugins/verbs/src'))
// nlp.extend(require('./plugins/paragraphs/src'))
// nlp.extend(require('./plugins/sentences/src'))

// let str = `What's with these homies dissin' my girl? Why do they gotta front?

// What did we ever do to these guys that made them so violent?

// `
// let doc = nlp(str).join()
// console.log(doc.text() + '|')

let doc = nlp(`so i really walk to the store`).debug()
doc.verbs().negate()
console.log(doc.text())
