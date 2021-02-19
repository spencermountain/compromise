const nlp = require('./src/index')
nlp.extend(require('./plugins/numbers/src'))
nlp.extend(require('./plugins/dates/src'))
nlp.verbose(true)

//
// '3/8ths'
// 'three eighths of -'
// '- and three eighths'
// 'three out of eight'
//

// let doc = nlp('thirty two eighths of an inch').debug()
// let doc = nlp('two and a half').debug()
let doc = nlp('two and two thirds').debug()
// console.log(doc.fractions().get(0))
console.log(doc.numbers().get(0))
// console.log(doc.fractions().toDecimal().text())

// let doc = nlp(`I have not booked him`)

// console.log(doc.match(`have !not? * booked`).found)
// // true
// console.log(doc.match(`have !not? booked`).found)
// //false
