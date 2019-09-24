var nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/verbs/src'))
// nlp.extend(require('./plugins/entities/src'))

let doc = nlp(`she is not`)
let json = doc.json({ terms: { clean: true, id: true, bestTag: true, raw: true, whitespace: true } })
console.log(JSON.stringify(json, null, 2))
