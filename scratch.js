var nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/verbs/src'))
// nlp.extend(require('./plugins/ngrams/src'))

// nlp('jean jacket. jean Slkje').debug()
// let str = '.('
// let doc = nlp(str).debug()
// console.log(doc.out(), doc.out() === str)

nlp(`he's nice`)
  .match(`he's nice`)
  .debug()

// nlp('tornado/hurricane')
//   .match('@hasSlash')
//   .debug()
