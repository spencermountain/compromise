const nlp = require('./src/index')
// const spacetime = require('/Users/spencer/mountain/spacetime/src')
// nlp.verbose(true)
// let txt = require('./scripts/test/speed/_sotu-text.js')
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))
// nlp.extend(require('./plugins/sentences/src'))

// let doc = nlp(`before 2017`)
// let today = [2016, 1, 5] // feb 5th, a friday
// let obj = doc.dates({ today: today }).json()[0]
// console.log(spacetime(obj.date.start).format('{nice-day} {year}'))

/* //more person false-positives
Vitamin D.
may
ACE
gene
Jennifer  antibiotics
in our X-ray Uro-radiology
*/

/* //place false-positives
CT
St
*/

// let doc = nlp(`ANA, ENA, CCP etc.`)
let doc = nlp(`players only love you when they're playing`)
doc.verbs().debug().toPastTense()
doc.debug()

// hmmm
// let doc = nlp('a farmer boy is')
// doc.match(`a (word|#Noun+) is`).debug()
