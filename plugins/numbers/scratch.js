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
let doc = nlp('fourth quarter').debug()
// let doc = nlp('hundredth of a parsec').debug()
// doc.fractions().toText()

// doc.fractions().toDecimal()
console.log(doc.fractions().json())

// doc.fractions().toNumber()
// console.log(doc.text())
