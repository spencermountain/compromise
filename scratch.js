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
rheumatoid factor, ANA, ENA, CCP antibody, ESR, CRP, etc.
in our X-ray Uro-radiology

*/

/* //place false-positives
CT
St
*/

/*
`was disgusting`  was disgusting
`was so nausiating`
`a (word|#Noun+) is`   - 'a farmer boy is' 

`dark green`
`kinda sparkly`
`quite stunning`  - vs `slowly stunning`
*/

// let doc = nlp(`ANA, ENA, CCP etc.`)
let doc = nlp(`extremely moving`)
// let doc = nlp(`this reckoning`)
// let doc = nlp(`it was redefining`)
// let doc = nlp(`revealing his guts`)
// let doc = nlp(`the ruling party`)
// let doc = nlp(`i found it isolating`)
// let doc = nlp(`promising to leave`)
// let doc = nlp(`distressing us`)
// let doc = nlp(`loving you`)
// doc.people().debug()
doc.debug()
