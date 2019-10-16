const nlp = require('./src/index')
// const corpus = require('nlp-corpus')
// nlp.verbose(true)
// nlp.extend(require('./plugins/output/src'))
nlp.extend(require('./plugins/verbs/src'))
nlp.extend(require('./plugins/nouns/src'))
// nlp.extend(require('./plugins/paragraphs/src'))

/*
2. ~walk~ match
3. .swap()
*/

// let doc = nlp(`A priest walked into the bars.`)
// doc.cache({ root: true })
// doc.match('~walk~').debug()
// doc.match('~bar~').debug()
// console.log(doc.text('root') + '|')

const doc = nlp('he is from Phoenix AZ')
const m = doc.match('#City')
const matchWith = doc.match(m).out('normal')
// console.log(doc.not(m).out('text'))
console.log(matchWith)
