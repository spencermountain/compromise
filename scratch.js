const nlp = require('./src/index')
const spacetime = require('/Users/spencer/mountain/spacetime/src')
// nlp.verbose(true)
// nlp.extend(require('./plugins/sentences/src'))
nlp.extend(require('./plugins/numbers/src'))
nlp.extend(require('./plugins/dates/src'))

const fmt = iso => (iso ? spacetime(iso).format('{day-short} {nice} {year}') : '-')

let context = {
  // today: 'Mon November 30th 2020',
  // today: 'Tues Dec 1st 2020',
  timezone: 'Canada/Pacific',
}
// ==working now==

// ### should be working
// let doc = nlp('first monday of january')
// let doc = nlp(`3rd month next year`)
// let doc = nlp(`Pay ABC 2000`)

// ### hmmm
// let doc = nlp('in the next three years')
// let doc = nlp('Thu 16th')

// ### year-tricky
// let doc = nlp('last q2')
// let doc = nlp('2005 4th quarter')
// let doc = nlp(`Chanukah 2018`)

// ### ad-hoc
// let doc = nlp(`may '97`).debug()
// let doc = nlp(`since 1999`).debug()
let doc = nlp(`between 9:30 and 11:00 on thursday`).debug()

// ### time-parser
// let doc = nlp(`a quarter past noon`)
// let doc = nlp(`a quarter past 4`)
// let doc = nlp(`tonight at 7`)
// let doc = nlp('November 18th 2010 at midnight')

// ### spacetime
// let doc = nlp('1 fortnight ago')
// let doc = nlp('tues')
// let doc = nlp(`1:00:00 PM`)
// let doc = nlp('13:45')
// let doc = nlp('22-aug')
// let doc = nlp('aug-20')
// let doc = nlp(`2012-06`)
// let doc = nlp(`30-Mar-11`)
// let doc = nlp('7/12/11')

let found = doc.dates(context).json()[0]
console.log(fmt(found.date.start))
console.log(fmt(found.date.end))

// hmmm
// let doc = nlp('Jan 1 - Dec 31, 2018') //contraction
// let doc = nlp('by next weekend') // clone issue
