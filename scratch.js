var nlp = require('./src/index')
// nlp.verbose(true);

// var m = nlp('John eats glue').replace('john [#Verb]', 'sniffs');

let doc = nlp(`spencer kelly's problems`)

// doc.debug()
let json = doc.json()
console.log(JSON.stringify(json, null, 2))
let doc2 = nlp.fromJSON(json)
doc2.debug()
