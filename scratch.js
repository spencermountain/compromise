const nlp = require('./src/index')
// nlp.verbose(true)
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

const doc = nlp.tokenize('if he is hungry, spencer eats bananas in the kitchen.') //.clauses()

doc.ifNo('!(if|cool)')
doc.debug()
