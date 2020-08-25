const nlp = require('./src/index')
// nlp.verbose(true)
// let txt = require('./scripts/test/speed/_sotu-text.js')
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))
nlp.extend(require('./plugins/sentences/src'))

// let doc = nlp('i should drive')
// doc.sentences().toFutureTense()
// doc.debug()
// console.log(doc.text())

// let doc = nlp('i did really walk')
// doc.verbs().toFutureTense()
// console.log(doc.text())

let doc = nlp('i may')
doc.verbs().toPastTense()
doc.debug()
