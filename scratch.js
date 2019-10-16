const nlp = require('./src/index')
// const corpus = require('nlp-corpus')
// nlp.verbose(true)
nlp.extend(require('./plugins/entities/src'))

/*
2. ~walk~ match
3. .swap()
*/

// let doc = nlp(`A priest walked into the bars.`)
// doc.cache({ root: true })
// doc.match('~walk~').debug()
// console.log(doc.text('root') + '|')

const r = nlp(`Sardinia F Jones`).debug()
r.people().debug()
