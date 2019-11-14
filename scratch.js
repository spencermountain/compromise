const nlp = require('./src/index')
// nlp.verbose(true)
nlp.extend(require('./plugins/numbers/src'))
nlp.extend(require('./plugins/dates/src'))

let doc = nlp(`2am`)
// doc.dates().format('{iso-short}')
// console.log(doc.text())
console.log(doc.dates().json())
