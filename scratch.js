const nlp = require('./src/index')
nlp.extend(require('./plugins/numbers/src'))
nlp.extend(require('./plugins/dates/src'))
// nlp.verbose(true)

//
// '3/8ths'
// 'three eighths of -'
// '- and three eighths'
// 'three out of eight'
//

// complex denominators - 'one fifty fourths', 'one thirty third'
//

let doc = nlp('4/100')
// doc.percentages().toFraction().debug()
// doc.fractions().toPercentage().debug()
console.log(doc.fractions().json())

//
//
//
//

// let doc = nlp(`I have not booked him`)
// console.log(doc.match(`have !not? * booked`).found)
// // true
// console.log(doc.match(`have !not? booked`).found)
// //false
