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

let doc = nlp('june the 5th, july the 7th, and sept the 12th.')
let m = doc.match('[<month>#Month]')
m.debug()
m.byName('month').debug()

// console.log(m.list[0])
//by object

// console.log(m.byName().month.debug())
// m.byName('date').debug()
// console.log(res)
