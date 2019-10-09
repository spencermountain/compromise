const nlp = require('./src/index')
// const corpus = require('nlp-corpus')
// nlp.verbose(true)
nlp.extend(require('./plugins/output/src'))
// nlp.extend(require('./plugins/sentences/src'))

let doc = nlp('i <3 Ralf')
let html = doc.html({ Person: 'red' })
console.log(html)
