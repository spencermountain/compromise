const nlp = require('./src/index')
// nlp.verbose(true)
nlp.extend(require('./plugins/numbers/src'))
nlp.extend(require('./plugins/dates/src'))

let doc = nlp(`June 2nd 2012`)
// doc.dates().format('{nice-year}')
// console.log(doc.text())
console.log(doc.dates().json())
