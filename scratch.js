const nlp = require('./src/index')
// const spacetime = require('/Users/spencer/mountain/spacetime/src')
nlp.verbose(true)
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

// let doc = nlp(`your`)
// let doc = nlp(`my`)
// let doc = nlp(`their`)
// let doc = nlp(`thanks`)
// let doc = nlp(`if`)
// let doc = nlp(`like`)
// let doc = nlp(`your own conclusions`)
// let doc = nlp(`India keeps what it has`)

// let doc = nlp(`a job well done`)
let doc = nlp(`The below site`)
// let doc = nlp(`succumbing to radiation`)
// let doc = nlp(`be given up`)
// let doc = nlp(`i lost track`)
// let doc = nlp(`you have seen`)
// let doc = nlp(`i have taken`)
// let doc = nlp(`have you gotten?`)
// doc.verbs().debug().toPastTense()
doc.debug()

// hmmm
// let doc = nlp('a farmer boy is')
// doc.match(`a (word|#Noun+) is`).debug()
