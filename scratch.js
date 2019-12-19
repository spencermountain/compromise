const nlp = require('./src/index')
nlp.verbose(true)
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))

// let str = ' 🇵🇷.'
// let doc = nlp(str)
// console.log(doc.termList(1))
// console.log(doc.text())

// nlp('16.125').debug()
nlp('amused').debug()
