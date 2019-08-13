var nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/verbs/src'))

// var doc = nlp('one, two three.   blah blah. One, two, five. ')
// console.log(doc.out())
// console.log(doc.match('.').out())
// console.log(doc.not('two').out())

// console.log('|' + doc.eq(0).text() + '|')
// console.log('|' + doc.not('two').text() + '|')

var doc = nlp(`Corey Hart's pudding and Google's advertising`)
doc = doc.normalize({
  possessives: true,
  case: false,
})
doc.debug()
console.log('|' + doc.text() + '|')
