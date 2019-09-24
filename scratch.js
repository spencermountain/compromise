var nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/verbs/src'))
nlp.extend(require('./plugins/entities/src'))

let doc = nlp("Matt 'the doctor' Smith lasted three seasons.")
// let doc = nlp('Rod L. MacDonald bought a lightening rod')
let arr = doc
  .people()
  .toLowerCase()
  .out('text')
console.log(arr)
