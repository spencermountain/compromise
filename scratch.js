const nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/sentences/src'))
nlp.extend(require('./plugins/dates/src'))

// let doc = nlp(`i ate red apples`)
// doc.nouns().toSingular()
// // doc.nouns().toPlural()
// console.log(doc.text())

let doc = nlp(`i have two questions for Homer - 'Why lie?' and 'Lies, why?'`)
doc
  .quotations()
  .split()
  .out('array')
doc.clauses().split()
doc.debug()
