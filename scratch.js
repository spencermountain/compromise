const nlp = require('./src/index')
// nlp.verbose(true)
// let txt = require('./scripts/test/speed/_sotu-text.js')
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))
nlp.extend(require('./plugins/sentences/src'))

let doc = nlp("couldn't drive")
let m = doc.clone()
m.debug()

// doc.sentences().toPastTense() //.debug()
// console.log(doc.text())
