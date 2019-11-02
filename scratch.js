const nlp = require('./src/index')
nlp.verbose(true)
nlp.extend(require('./plugins/numbers/src'))

// let doc = nlp('234.0%')
// console.log(doc.termList())
// doc.debug()
// console.log(doc.values().json())
// let doc = nlp('39%')
// let doc = nlp('400s').debug()
let doc = nlp('MIMMCMXXIII').debug()

doc.values().toText()
console.log(doc.text())
