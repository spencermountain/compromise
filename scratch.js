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

// let doc = nlp(`30mins tuesday`).debug()
let doc = nlp(`q4`)
// let doc = nlp(`january and march`)
console.log(doc.dates().debug().get())
// console.log(doc.durations().get(0))
