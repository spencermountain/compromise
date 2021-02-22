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

let doc = nlp.tokenize(`one after`)
console.log('\n\n============\n\n')
console.log('|' + doc.match(`one !foo? moo? after`).text() + '|')

// console.log('|' + doc.match(`one !foo? after`).text() + '|')
