const nlp = require('./src/index')
// const corpus = require('nlp-corpus')
// nlp.verbose(true)
nlp.extend(require('./plugins/nouns/src'))

/*
2. ~walk~ match
3. .swap()
*/

let doc = nlp(`the Knight	of`) //.nouns(0)
console.log(doc.termList())
// .toPlural()
// .debug()

// console.log(doc.text('text'))
console.log(doc.text('normal'))
