const nlp = require('./src/index')
// const nlp = require('./')
// nlp.verbose(true)
// nlp.extend(require('./plugins/numbers/src'))
let keypress = require('./plugins/keypress/src')
keypress(nlp)
// keypress.bind(nlp)
// nlp.extend()

// let doc = nlp(`Cows do not`)
// doc.nouns().toSingular()
// let str = doc.text()
// console.log(str)

// let doc = nlp(`what’d be good`).debug()

// let doc = nlp(`buy eggs on june 5th 2021`)
// console.log(doc.dates().json())

// const contractions = require('./src/02-tagger/03-contractions/index.js')

let doc = nlp.tokenize(`I've had one.`)
console.log(JSON.stringify(doc.json({ terms: { whitespace: true } }), null, 2))
// doc = contractions(doc)
doc.debug()

// let a = nlp('I’ve had one dream.')
// console.log(a.export().list)
