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

// const str = nlp('five hundred')
//   .values()
//   .toText()
//   .text()
// console.log(str)

const lexicon = {
  abid: 'Place',
}

const sentence = "Abid's"
const found = nlp(sentence, lexicon)

console.log(found.termList())
found.match('#Place').debug()
