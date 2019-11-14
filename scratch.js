const nlp = require('./src/index')
// nlp.verbose(true)
nlp.extend(require('./plugins/numbers/src'))
nlp.extend(require('./plugins/dates/src'))

// let doc = nlp(`between june 5th 1999 and sept 7 2019`)
let doc = nlp(`quarter past five`)
console.log(doc.dates().json())

// let doc = nlp(`My dog LOVES pizza, and grapes!!`)
// doc.debug()
