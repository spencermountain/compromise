const nlp = require('./src/index')
let txt = require('./scripts/test/speed/_sotu-text.js')
// nlp.verbose(true)
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))

let doc = nlp(txt)
// console.log(doc.dates().json())
