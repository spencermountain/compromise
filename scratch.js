const nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))

let doc = nlp('spencer kelly is working here')
let res = doc.lookup({
  'spencer kelly': 'Cool',
  working: 'Uncool',
})
console.log(res)

///-------------

/* --Working:---
m.byName('date').text() // 'fifth of november'
m.byName('fooo').text() // ''

m.byName() // { date: Doc }

nlp('asdf').byName() // {}

--Not Working:---

doc.match('[<month>june] the [<date>5th]')

doc.match('[#Value] of')

doc.match('[#Value] of [#Month]')
*/

// let doc = nlp('june the 5th and july the 7th').debug()
// let m = doc.match('[<month>#Month] the [<date>#Value]')
// console.log(m.byName('month').text())
