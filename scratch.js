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
// let doc = nlp('July 13 through 15').debug()
// let doc = nlp('8:00 pm February 11').debug()
// let doc = nlp('midday February 11').debug()
// let doc = nlp('last q2').debug()
// let doc = nlp('7/12/11').debug()
// let doc = nlp('November 18th 2010 at midnight').debug()
// let doc = nlp("may 27 '79").debug()
// let doc = nlp('jan 3 2010 at 4').debug()
// let doc = nlp('5pm on may 27th').debug()
// let doc = nlp('this morning').debug()
// let doc = nlp('an hour ago').debug()
// let doc = nlp('13:45').debug()
// let doc = nlp('tue').debug()
// let doc = nlp('1 fortnight ago').debug()
// let doc = nlp('2 weekends ago').debug()
// let doc = nlp('6 months hence').debug()
// let doc = nlp('Thu 16th').debug()
// let doc = nlp('22-aug').debug()
// let doc = nlp('aug-20').debug()
// let doc = nlp(`may '97`).debug()
// let doc = nlp(`2012-06`).debug()
// let doc = nlp(`3rd month next year`).debug()
// let doc = nlp(`4:00 in the evening`).debug()
// let doc = nlp(`11:00 at night`).debug()
let doc = nlp(`tonight at 7`).debug()
// let doc = nlp(`this day`).debug()
// let doc = nlp(`1:00:00 PM`).debug()
// let doc = nlp(`30-Mar-11`).debug()
// let doc = nlp('2005 4th quarter').debug()
let found = doc.dates(context).json()[0]
console.log(fmt(found.date.start))
console.log(fmt(found.date.end))

// hmmm
// let doc = nlp('Jan 1 - Dec 31, 2018').debug() //contraction
// let doc = nlp('by next weekend').debug() // clone issue
