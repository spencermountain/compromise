const nlp = require('./src/index')
// nlp.verbose(true)
nlp.extend(require('./plugins/sentences/src'))
nlp.extend(require('./plugins/verbs/src'))

// let doc = nlp('234.0%')
// console.log(doc.termList())
// doc.debug()
// console.log(doc.values().json())
// let doc = nlp('39%')

let doc = nlp('it is raining tomorrow and today')
doc
  .match('raining')
  .lookAhead('')
  .debug()

// console.log(doc.sentences().json())
