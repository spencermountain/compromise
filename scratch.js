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

// let doc = nlp.tokenize(`one after`)
// console.log('\n\n============\n\n')
// console.log('|' + doc.match(`one !foo? moo? after`).text() + '|')
// console.log('|' + doc.match(`one !foo? after`).text() + '|')

let doc = nlp.tokenize(`have not booked him`)
console.log('\n\n\n======\n')
// console.log(doc.match(`have !not? * booked`).found)
// true
// console.log('|' + doc.match(`have !not? *? booked`).text() + '|')
//false

doc = nlp.tokenize('spencer other')
// t.equals(doc.match('(cool|spencer)').text(), 'spencer', 'optional-true')
console.log(doc.match('!(cool|spencer)').text() + '|')
