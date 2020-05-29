const nlp = require('./src/index')
// nlp.verbose(true)
// let txt = require('./scripts/test/speed/_sotu-text.js')
nlp.extend(require('./plugins/sentences/src'))

const txt = `Probably the renovation, which has been done to the property.`
let doc = nlp(txt)
// let doc = nlp('is wayne gretskzy alive')
doc.clauses().debug()
// doc.sentences().isQuestion().debug()
