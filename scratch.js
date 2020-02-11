const nlp = require('./src/index')
let txt = require('./scripts/test/speed/_sotu-text.js')
// nlp.verbose(true)
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/scan/src'))

nlp(`okay, do not use like reverse psychology. not here`).debug()
// nlp(`April, June, and September`).debug()
// let doc = nlp(`so good`).debug()
// console.log(doc.list[0].cache)

// console.log(set[1])
// console.log(s.length)
// for (let s = 0; s < set.length; s++) {
//   const a = set[s]
//   console.log(a)
// }
// s.forEach(a => console.log(a))
