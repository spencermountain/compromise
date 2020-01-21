const nlp = require('./src/index')
// nlp.verbose(true)
nlp.extend(require('./plugins/numbers/src'))
nlp.extend(require('./plugins/dates/src'))

// let doc = nlp(`buy eggs on june 5th 2021`)
// console.log(doc.dates({ timezone: 'Asia/Karachi' }).json())

let doc = nlp('in 3 weeks')
// let doc = nlp('two days from today')
let json = doc.dates({ today: '1996-03-1' }).json()
console.log(json)
