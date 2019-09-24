var nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/verbs/src'))
// nlp.extend(require('./plugins/ngrams/src'))

nlp('doug is good')
  .match('doug is good? good')
  .debug()

// nlp('jean jacket. jean Slkje').debug()
// let str = '.('
// let doc = nlp(str).debug()
// console.log(doc.out(), doc.out() === str)

// let str = 'tornado/hurricane'
// let doc = nlp(str)
//   .match('@hasSlash')
//   .debug()
