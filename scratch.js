var nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/verbs/src'))
// nlp.extend(require('./plugins/ngrams/src'))

// nlp('jean jacket. jean Slkje').debug()

let str = '.('
let doc = nlp(str).debug()
// console.log(doc.termList())
console.log(doc.out() === str)

// let str = 'left  his  /  her  backpack'
// let doc = nlp(str).debug()
// console.log(str === doc.out())
// console.log(doc.termList())
// console.log(doc.match('@hasSlash').out())
//   .debug()
