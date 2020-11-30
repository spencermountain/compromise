const nlp = require('./src/index')
const spacetime = require('/Users/spencer/mountain/spacetime/src')
// nlp.verbose(true)
// nlp.extend(require('./plugins/sentences/src'))
nlp.extend(require('./plugins/numbers/src'))
nlp.extend(require('./plugins/dates/src'))

const fmt = iso => (iso ? spacetime(iso).format('{day-short} {nice} {year}') : '-')

let context = {
  // today: 'Mon November 30th 2020',
  today: 'Tues Dec 1st 2020',
  timezone: 'Canada/Pacific',
}
// let doc = nlp('first monday of january').debug()
// let doc = nlp('in the next three years').debug()
let doc = nlp('July 13 through 15').debug()
let found = doc.dates(context).json()[0]
console.log(fmt(found.date.start))
console.log(fmt(found.date.end))

// hmmm
// let doc = nlp('Jan 1 - Dec 31, 2018').debug() //contraction
// let doc = nlp('by next weekend').debug() // clone issue
