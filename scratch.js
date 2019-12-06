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

let str = nlp("spencer's runs")
  .normalize({ contractions: true })
  .text()
console.log(str)
