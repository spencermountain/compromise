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

let doc = nlp(`Water, milk, tea, buttermilk and honey`)
let m = doc.match('(milk|buttermilk)')
// m.debug()
doc.splitAfter(m).debug()
