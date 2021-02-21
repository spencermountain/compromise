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

let doc = nlp('five dollars and thirty-five cents') //.debug()
doc.money().debug()
console.log(doc.money().get())
// doc.money().add(1)
// doc.debug()
// console.log(doc.fractions().get(0))
// doc.numbers().toNumber()
// console.log(doc.text())

//
//
//
//

// let doc = nlp(`I have not booked him`)
// console.log(doc.match(`have !not? * booked`).found)
// // true
// console.log(doc.match(`have !not? booked`).found)
// //false
