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

// const str = nlp('five hundred')
//   .values()
//   .toText()
//   .text()
// console.log(str)

console.time('doc')
let doc = nlp(`Characters drink Salty Dogs, whistle Johnny B. Goode and watch Bugs Bunny reruns.`)
console.timeEnd('doc')
// doc.toTitleCase()
// doc.debug()
// doc.clauses().debug()
