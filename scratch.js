var nlp = require('./src/index')
// nlp.verbose(true)
nlp.extend(require('./plugins/verbs/src'))
nlp.extend(require('./plugins/sentences/src'))

var doc = nlp('cool')
doc.sentences().prepend('so')
doc.debug()

// console.log(doc.list)
// console.log(doc.terms())
// console.log(doc.text())
// doc.verbs().toNegative()

// var doc = nlp('spencer is nice, warm and tired.')
// doc.lists().add('CRAAZY')
// doc.replaceWith()
// console.log(doc.out())
