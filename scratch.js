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

// greedy bug
// let regs = nlp.parseMatch('(and foo+)')
// console.log(regs[0].choices)

let doc = nlp.tokenize('and foo1 foo2 foo3 bar more') //.debug()
doc.match('(and /foo/+)').debug()
// doc.match('(and foo+)').debug()

// let doc = nlp('and foo bar foo ')
// doc.match('(and foo+)').debug()

// let arr = [1, 2, 3, 4, 5]
// arr.every((num, i) => {
//   console.log(num)
//   if (num === 3) {
//     i += 1
//   }
//   return true
// })

// let doc = nlp('eight dollars and five cents') //.debug()
// doc.money().debug()
// console.log(doc.money().get())
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
