const nlp = require('./src/index')
// const spacetime = require('/Users/spencer/mountain/spacetime/src')
// nlp.verbose(true)
// let txt = require('./scripts/test/speed/_sotu-text.js')
nlp.extend(require('./plugins/sentences/src'))
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

// let doc = nlp(`Photographs from a seized computer `)
// let doc = nlp(`I am a licensed mental health counsellour`)
// let doc = nlp(`a blown motor.`)

// let doc = nlp(`thanks`)
// let doc = nlp(`your own conclusions`)
// let doc = nlp(`The situation appears to be even worse`)//even
// let doc = nlp(`They even occasionally attack`)
// let doc = nlp(`a crime against humanity`)

// let doc = nlp(`your own destiny`)
// let doc = nlp(`kept me up to date`)
// let doc = nlp(`in regards to`)
// let doc = nlp(`have you gotten?`)

let doc = nlp(`Please let me know if any of you need additional information.`)
doc.debug()
