const nlp = require('./src/index')
// nlp.verbose(true)
nlp.extend(require('./plugins/adjectives/src'))
// nlp.extend(require('./plugins/verbs/src'))

let doc = nlp('John K. Smith')
doc.debug()

let json = doc.export()
// console.log(JSON.stringify(json, null, 2))

let doc2 = nlp.import(json)
doc2.debug()
