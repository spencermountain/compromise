var nlp = require('./src/index')
nlp.extend(require('./plugins/values/src'))

let doc = nlp(`i weigh 95 kilograms and seventeen times`)
// let doc2 = nlp(`oh yeah, baby. yeee haw.`)

// doc = doc.concat(nlp('hell yeah john smith'))
doc
  .values()
  .toNumber()
  .debug()
