var nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/verbs/src'))

var doc = nlp('one, two three.   blah blah. One, two, five. ')
doc.debug()
console.log('|' + doc.text() + '|')
