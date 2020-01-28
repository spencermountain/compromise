const nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))

// let doc = nlp('spencer kelly is working here')
// let res = doc.lookup({
//   'spencer kelly': 'Cool',
//   working: 'Uncool',
// })
// console.log(res)

let doc = nlp('one two foo four five. i foo saw foo house. I ate a sandwhich. Foo was nice')
let m = doc.match('foo')
let matches = m.fullSentences()
