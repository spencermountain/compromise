const nlp = require('./src/index')
const spacetime = require('/Users/spencer/mountain/spacetime/src')
// nlp.verbose(true)
// let txt = require('./scripts/test/speed/_sotu-text.js')
nlp.extend(require('./plugins/numbers/src'))
nlp.extend(require('./plugins/dates/src'))
// nlp.extend(require('./plugins/sentences/src'))

// let doc = nlp(`before 2022`)
let doc = nlp(`two day after November 1st 2019 at 7pm`)
// let today = [2016, 1, 5] // feb 5th, a friday
let obj = doc.dates({}).json()[0]
// console.log(obj)
console.log(spacetime(obj.date.start).format('{nice-day} {year} {time}'))
console.log(spacetime(obj.date.end).format('{nice-day} {year} {time}'))

/* //more person false-positives
Vitamin D.
may
ACE
gene
Jennifer  antibiotics
in our X-ray Uro-radiology
*/

// let doc = nlp(`next tuesday`)
// doc.debug()
