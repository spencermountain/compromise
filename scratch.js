const nlp = require('./src/index')
// const nlp = require('./')
// nlp.verbose(true)
// nlp.extend(require('./plugins/numbers/src'))
nlp.extend(require('./plugins/dates/src'))

// nlp('WE’RE NOT WORTHY!').debug()

// let doc = nlp(`Cows do not`)
// doc.nouns().toSingular()
// let str = doc.text()
// console.log(str)

// let doc = nlp(`what’d be good`).debug()

let doc = nlp(`buy eggs on june 5th 2021`)
console.log(doc.dates().json())
