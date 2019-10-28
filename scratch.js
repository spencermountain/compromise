const nlp = require('./src/index')
nlp.verbose(true)
nlp.extend(require('./plugins/sentences/src'))

// nlp.extend(function(Doc, world) {
//   /** add some tags */
//   world.addTags({;
//     Character: {
//       isA: ['Fiction', 'FemaleName'],
//       notA: 'Adjective',
//     },
//   })
// })

let doc = nlp('Every night before I go').sentences()
// .debug()

// console.log(doc.sentences().json(0))
console.log(doc.world.tags.Demonym)
