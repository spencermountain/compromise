const nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))

// nlp('i am foo bar woo')
//   .match('foo [bar]')
//   .debug()

let doc = nlp('i am foo bar woo').match('foo [bar] [woo]')
// .debug()
console.log(doc.group())
