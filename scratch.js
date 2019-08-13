var nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/verbs/src'))

// var doc = nlp('one, two three.   blah blah. One, two, five. ')
// console.log(doc.out())
// console.log(doc.match('.').out())
// console.log(doc.not('two').out())

// console.log('|' + doc.eq(0).text() + '|')
// console.log('|' + doc.not('two').text() + '|')

let m = nlp('the dog sat')
m.match('sat').insertAfter('oooooooo')
console.log('|' + m.out() + '|')
