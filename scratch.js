const nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))

let doc = nlp.tokenize('spencer kelly is working here', {
  'spencer kelly': 'Person',
})

doc.debug()
// console.log(m.list[0])
//by object

// console.log(m.byName().month.debug())
// m.byName('date').debug()
// console.log(res)
