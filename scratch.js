var nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/verbs/src'))

// var doc = nlp('one, two three.   blah blah. One, two, five. ')
// console.log(doc.out())
// console.log(doc.match('.').out())
// console.log(doc.not('two').out())

// console.log('|' + doc.eq(0).text() + '|')
// console.log('|' + doc.not('two').text() + '|')

let doc = nlp(`one four five six.`)
doc.match('five six').prepend('ooo pppppp')
console.log('|' + doc.text())
