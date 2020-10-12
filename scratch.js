const nlp = require('./src/index')
// const spacetime = require('/Users/spencer/mountain/spacetime/src')
// nlp.verbose(true)
// let txt = require('./scripts/test/speed/_sotu-text.js')
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))
nlp.extend(require('./plugins/sentences/src'))

// let doc = nlp(`before 2017`)
// // let doc = nlp(`last week`)
// let february = 1
// let today = [2016, february, 5] // a friday
// // let doc = nlp(`sunday`)
// doc.debug()
// // let doc = nlp(`a year ago`)
// let obj = doc.dates({ today: today }).json()[0]
// console.log(spacetime(obj.date.start).format('{nice-day} {year}'))

let doc = nlp(`i was shocked looking at`)
doc.verbs().debug()
// doc.debug()
