const nlp = require('./src/index')
nlp.extend(require('./plugins/numbers/src'))
// nlp.verbose(true)

//
// '3/8ths'
// 'three eighths of -'
// '- and three eighths'
// 'three out of eight'
//

let doc = nlp('two halves').debug()
// let doc = nlp('one and a half of a penny').debug()
// let doc = nlp('seven tenths of an inch').debug()
// let doc = nlp('a third of a slice').debug()
// let doc = nlp('seven out of ten apples').debug()
console.log(doc.numbers().get(0))
console.log(doc.fractions().get(0))

// let doc = nlp(`I have not booked him`)

// console.log(doc.match(`have !not? * booked`).found)
// // true
// console.log(doc.match(`have !not? booked`).found)
// //false
