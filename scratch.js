const nlp = require('./src/index')
// nlp.verbose(true)
nlp.extend(require('./plugins/adjectives/src'))
// nlp.extend(require('./plugins/verbs/src'))

// let doc = nlp(`we're here. we're clear. we don't want anymore bears.`).pre('\n')
// console.log(doc.text())

nlp('Monorail...Once again! Monorail... Monorail!')
  .splitBefore('monorail')
  .eq(0)
  .out()
