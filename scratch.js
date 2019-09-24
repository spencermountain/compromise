var nlp = require('./src/index')
// nlp.verbose(true)
nlp.extend(require('./plugins/verbs/src'))
// nlp.extend(require('./plugins/entities/src'))

let doc = nlp(`she is not. we are cool!!`)
let json = doc.pronouns().json({ terms: { tags: false, offset: true } })
console.log(JSON.stringify(json, null, 2))
