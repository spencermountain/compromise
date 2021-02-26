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
let doc = nlp(`for 20 mins`).debug()
// let doc = nlp(`in 20 mins`).debug()
console.log(doc.dates().get())
// console.log(doc.durations().get(0))
