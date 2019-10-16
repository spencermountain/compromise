const nlp = require('./src/index')
// const corpus = require('nlp-corpus')
// nlp.verbose(true)
nlp.extend(require('./plugins/ngrams/src'))

/*
2. ~walk~ match
3. .swap()
*/

// let doc = nlp(`A priest walked into the bars.`)
// doc.cache({ root: true })
// doc.match('~walk~').debug()
// console.log(doc.text('root') + '|')

const r = nlp(`he is cool. john was cool. He is really nice.`)

// let arr = r.startGrams({ size: 3 })
let arr = r.startGrams({ size: 2 })
console.log(arr)
