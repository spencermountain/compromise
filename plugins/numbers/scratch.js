const nlp = require('../../src/index')
nlp.extend(require('./src'))
// nlp.verbose(true)
//
//
//
//
//

// let doc = nlp('2/3 of a slice').debug()
// let doc = nlp('2 thirds of a slice').debug()
let doc = nlp('2 out of three').debug()
// doc.fractions().toText()
console.log(doc.fractions().json())
// doc.fractions().toNumber()
// console.log(doc.text())
