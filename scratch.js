// const nlp = require('./src/index')
const nlp = require('./alt')

// nlp.verbose(true)
let doc = nlp(`one two three. four five six.`)

// let m = doc.match('^he').tag('Verb')
// doc.canBe('#LastName').debug()
// m.unTag('Verb')
doc.debug()
// doc.update(['/0/0:1']).debug()
