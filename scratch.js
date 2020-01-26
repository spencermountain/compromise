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
nlp('woooh').debug()
