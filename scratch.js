const nlp = require('./src/index')
// const corpus = require('nlp-corpus')
// nlp.verbose(true)
// nlp.extend(require('./plugins/output/src'))
nlp.extend(require('./plugins/verbs/src'))
// nlp.extend(require('./plugins/nouns/src'))
// nlp.extend(require('./plugins/paragraphs/src'))

/*
2. ~walk~ match
3. .swap()
*/

// let doc = nlp(`A priest walked into the bars.`)
// doc.cache({ root: true })
// doc.match('~walk~').debug()
// console.log(doc.text('root') + '|')

let r = nlp("i'm good")
r.match('am').replaceWith('newwww')
r.debug()
console.log(r.text())

//  .isPlural()
// .debug()
