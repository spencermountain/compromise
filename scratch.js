const nlp = require('./src/index')
// const corpus = require('nlp-corpus')
// nlp.verbose(true)
// nlp.extend(require('./plugins/nouns/src'))

/*
2. ~walk~ match
3. .swap()
*/

// let doc = nlp(`A priest walked into the bars.`)
// doc.cache({ root: true })
// doc.match('~walk~').debug()
// console.log(doc.text('root') + '|')

const doc = nlp('i really eat bugs. i once ate a cow. i will sometimes eat a horse')
// doc.nouns().toPlural()
// doc.debug()
console.log(
  doc.segment({
    'a #Noun': 'Thing',
    '#Plural': 'More',
    '(eat|ate)': 'Did',
  })
)
