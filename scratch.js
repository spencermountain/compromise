const nlp = require('./src/index')
const spacetime = require('/Users/spencer/mountain/spacetime/src')
// nlp.verbose(true)
// let txt = require('./scripts/test/speed/_sotu-text.js')
nlp.extend(require('./plugins/numbers/src'))
nlp.extend(require('./plugins/dates/src'))
// nlp.extend(require('./plugins/sentences/src'))

// 20
// 27
// 3

let doc = nlp(`winter 2002`)
doc.debug()
// let today = [2016, 1, 5] // a friday
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
