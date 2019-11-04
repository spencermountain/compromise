const nlp = require('./src/index')
// nlp.verbose(true)
nlp.extend(require('./plugins/adjectives/src'))
// nlp.extend(require('./plugins/verbs/src'))

let doc = nlp('JDI university')
doc.debug()
// console.log(doc.adjectives().toAdverb())

// let json = doc.export()
// console.log(JSON.stringify(json, null, 2))
