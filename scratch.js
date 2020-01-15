const nlp = require('./src/index')
// const nlp = require('./')
// nlp.verbose(true)
// nlp.extend(require('./plugins/numbers/src'))
// let keypress = require('./plugins/keypress/src')(nlp)
// keypress.bind(nlp)
// keypress()
// nlp.extend()

// let doc = nlp(`Cows do not`)
// doc.nouns().toSingular()
// let str = doc.text()
// console.log(str)

// let doc = nlp(`what’d be good`).debug()

// let doc = nlp(`buy eggs on june 5th 2021`)
// console.log(doc.dates().json())

// let doc = nlp.keypress(`buy eggs.`)
// let doc = nlp(`buy eggs. eat shoes`)
// let doc2 = nlp.import(doc.export())

// console.log(doc.)

// doc = nlp.keypress(`buy eggs. eat shoes`)
// doc = nlp.keypress(`buy eggs. eat shoes`)

let doc = nlp(`0123, foo,`)
let m = doc.match('foo')
let json = m.json({ offset: true, text: false })[0]
console.log(json)
