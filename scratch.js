var nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/verbs/src'))
// nlp.extend(require('./plugins/ngrams/src'))

// nlp('jean jacket. jean Slkje').debug()

let str = 'left  his/her  backpack'
let doc = nlp(str)
// console.log(str === doc.out())
// console.log(doc.termList())
console.log(
  doc
    .match('his')
    .debug()
    .out()
)
//   .debug()
