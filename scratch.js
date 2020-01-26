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

// let doc = nlp('one two foo four five')
let doc = nlp('one two foo four five. i saw foo house. I ate a sandwhich. Foo was nice')

console.log(doc.sentences(0).text())
// let m = doc.match('foo')

// m.eq(1)
//   .sentence()
//   .debug()

// m.map(d => {
// console.log(d.parents())
// return d.parent().parent().parent()
// }).debug()
