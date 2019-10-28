const nlp = require('./src/index')
nlp.verbose(true)
nlp.extend(require('./plugins/numbers/src'))

// nlp.extend(function(Doc, world) {
//   /** add some tags */
//   world.addTags({;
//     Character: {
//       isA: ['Fiction', 'FemaleName'],
//       notA: 'Adjective',
//     },
//   })
// })

let doc = nlp('zero').debug()
console.log(doc.values().json())

// let doc = nlp(txt)
// let doc = nlp('baked poutine is delicious')
// doc.splitAfter('#Noun .* #Verb .* #Noun+').debug()
// doc.clauses().debug()
// console.log(doc.sentences().json({ terms: false }))
