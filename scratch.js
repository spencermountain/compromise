var nlp = require('./src/index')
// nlp.extend(require('./plugins/values/src'))

// ---Contraction--
// match.insertAt(match, str)
// phrase.insertAt(index, str)
// var m = nlp(`she won't go`).debug()

nlp(`she would have like to go`)
  .insertAfter(`would`, 'not')
  .debug()
