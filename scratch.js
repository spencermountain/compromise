const nlp = require('./src/index')
nlp.verbose(true)
// let txt = require('./scripts/test/speed/_sotu-text.js')
nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))

// let doc = nlp('i paid $5.50.')
// let doc = nlp('$5.32')

let doc = nlp('i went 5 k/m²').debug()
// console.log(doc.termList())
