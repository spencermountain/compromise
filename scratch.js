const nlp = require('./src/index')
// nlp.verbose(true)
nlp.extend(require('./plugins/numbers/src'))
nlp.extend(require('./plugins/dates/src'))

// let doc = nlp(`buy eggs on june 5th 2021`)
// console.log(doc.dates({ timezone: 'Asia/Karachi' }).json())

// let doc = nlp('april 1st, 2016 pacific time')
// doc.debug()
let doc = nlp('two days before now')
let json = doc.dates({ today: '1996-01-01' }).json()
console.log(json)
