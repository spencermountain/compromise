const nlp = require('./src/index')
// nlp.verbose(true)
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

const str = nlp('one two')
  .values()
  .toNumber()
  .debug()
  .out('normal')
console.log(str)
