// const nlp = require('./src/index')
const nlp = require('./alt')

// nlp.verbose(true)
let doc = nlp(`he and John walked to a mall. John said - oh cool.`)

// let m = doc.match('^he').tag('Verb')
// doc.canBe('#LastName').debug()
// m.unTag('Verb')
doc.debug()
