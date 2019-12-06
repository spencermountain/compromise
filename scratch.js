const nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))

// let doc = nlp(`i ate red apples`)
// doc.nouns().toSingular()
// // doc.nouns().toPlural()
// console.log(doc.text())

// let oldWorld = nlp().world.clone()

// nlp('apple').debug()
// nlp.extend((Doc, world) => {
//   world.addWords({ apple: 'Fruit' })
// })
// nlp('apple').debug()

// let doc = nlp(`I’m `).debug()
let doc = nlp(`can’t `).debug()
// let doc = nlp(`spencer’s clean`).debug()
// let doc = nlp(`wouldn’t be good`).debug()
// let doc = nlp(`what’d you see`).debug()
// let doc = nlp(`spencer’d go see`).debug()

// let doc = nlp(`I'm `).debug()
// console.log(doc.termList()[0])
// let doc = nlp(`I’m lookin’ for Amanda`).debug()
