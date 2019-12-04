const nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/sentences/src'))
nlp.extend(require('./plugins/dates/src'))

let doc = nlp(`i ate red apples`)
doc.nouns().toSingular()
// doc.nouns().toPlural()
console.log(doc.text())
