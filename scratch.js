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

// {
//   Infinitive: 'age',
//   PresentTense: 'ages',
//   PastTense: 'aged',
//   Gerund: 'ageing',
// },

let doc = nlp(`shed`).debug()
// let doc = nlp(`walking`).debug()
console.log(doc.verbs().conjugate(0))
// doc = doc.terms().unique()
// console.log(doc.termList())
// console.log(doc.text('reduced'))
