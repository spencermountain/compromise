const nlp = require('./src/index')
// nlp.verbose(true)
nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))

// let doc = nlp(`i ate red apples`)
// doc.nouns().toSingular()
// // doc.nouns().toPlural()
// console.log(doc.text())

// let oldWorld = nlp().world.clone()

nlp('apple').debug()
nlp.extend((Doc, world) => {
  world.addWords({ apple: 'Fruit' })
})
nlp('apple').debug()

nlp('cool $5.50 and 1/3')
  .fractions()
  .debug()

// let oldDoc = nlp.tokenize('foo bar') //don't tag it
// oldDoc.world = oldWorld
// oldDoc.tagger()
// oldDoc.debug()
