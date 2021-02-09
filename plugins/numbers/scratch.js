const nlp = require('../../src/index')
nlp.extend(require('./src'))
// nlp.verbose(true)
//
//
//
//
//

let doc = nlp('2/3 of a slice').debug()
// doc.fractions().toText()
doc.fractions().toNumber()
// console.log(doc.text())
console.log(doc.fractions().json())
