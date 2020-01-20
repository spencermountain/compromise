const nlp = require('./src/index')
// const corpus = require('nlp-corpus')
// const nlp = require('./')
// nlp.verbose(true)
nlp.extend(require('./plugins/export/src'))

// let doc = nlp(`Cows do not`)
// doc.nouns().toSingular()
// let str = doc.text()
// console.log(str)

// let doc = nlp(`what’d be good`).debug()

// let doc = nlp(`buy eggs on june 5th 2021`)
// console.log(doc.dates().json())

// const contractions = require('./src/02-tagger/03-contractions/index.js')

// let doc = nlp.tokenize(`I've had one.`)
// console.log(JSON.stringify(doc.json({ terms: { whitespace: true } }), null, 2))
// doc = contractions(doc)
// doc.debug()
// let text = corpus.sotu.array()[8] //default: 110,845  -> 85,804
// let text = corpus.sotu.array()[7] //default: 113,747  -> 87,856
// let a = nlp(text)

let result = [
  {
    terms: [
      { text: 'hi', tags: ['Foo'] },
      { text: 'world', tags: ['Bar'] },
    ],
  },
  {
    terms: [
      { text: 'hi', tags: ['Foo'] },
      { text: 'there!', tags: ['Bar'] },
    ],
  },
]
let doc = nlp.fromJSON(result)
console.log(doc.text() + '|')
// let a = nlp(`what's the point? what's the word?`)

// console.log(JSON.stringify(a.export(), null, 2))

// console.log(a.json()[0].terms)
// let data = a.export()
// let b = nlp.import(data)
// b.debug()
