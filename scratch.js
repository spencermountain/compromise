var nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/values/src'))

// ---Contraction--
// match.insertAt(match, str)
// phrase.insertAt(index, str)
var m = nlp(`spencer's really cool`).debug()
console.log(m.text())
console.log(m.normal())

// nlp(`she would have like to go`)
//   .insertAfter(`would`, 'not')
//   .debug()
