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

// let doc = nlp('thirty two eighths of an inch').debug()
// let doc = nlp('one thirty third').debug()
let doc = nlp('one fifty fourths').debug()
// let doc = nlp('two hundred and twelve and five hundred and one thousandths').debug()
// let doc = nlp('six thirty seconds of an inch').debug()
console.log(doc.fractions().get(0))
// console.log(doc.numbers().get(0))

// let doc = nlp(`I have not booked him`)

// console.log(doc.match(`have !not? * booked`).found)
// // true
// console.log(doc.match(`have !not? booked`).found)
// //false
