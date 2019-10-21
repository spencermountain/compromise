const nlp = require('./src/index')
// const corpus = require('nlp-corpus')
// nlp.verbose(true)
nlp.extend(require('./plugins/entities/src'))

/*
2. ~walk~ match
3. .swap()
*/

let doc = nlp("hello. spencer is spencer's house. Spencer is.")

const arr = doc.terms().json({ reduced: true })
console.log(arr)
