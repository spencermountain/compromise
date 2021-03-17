const nlp = require('../../src/index')
const spacetime = require('spacetime')
// nlp.verbose(true)
nlp.extend(require('../../plugins/numbers/src'))
nlp.extend(require('../../plugins/dates/src'))

const fmt = (iso) => (iso ? spacetime(iso).format('{day-short} {nice} {year}') : '-')

const context = {
  // today: '2021-03-01', //monday
  // today: '2021-03-02', //tuesday
  // today: '2016-03-05', //on friday
  // timezone: null,
  dayStart: '10am',
  dayEnd: '5pm',
}

// let doc = nlp('june 5th') //.debug()
let doc = nlp('middle of june') //.debug()
// let doc = nlp('next week') //.debug()

let dates = doc.dates(context)
dates = dates.get()
console.log(dates)
dates.forEach((date) => {
  console.log('start: ', fmt(date.start))
  console.log('  end: ', fmt(date.end))
})

// ### hmmm
// let doc = nlp('in the next three years') //.debug()
// let doc = nlp(`in an hour from now`) //.debug()
// let doc = nlp(`in half an hour`).debug()
// let doc = nlp(`tomorrow at quarter past 4`).debug()
// let doc = nlp('in 20min').debug()
// doc.match('/^[0-9]+/').tag('Verb').debug()
// doc.values().normalize().debug()
// let doc = nlp('20 mins before tuesday at 3pm').debug()
// let doc = nlp(`3-4pm`).debug()
// let doc = nlp(`5 to 7 of january 1998`).debug()
// let doc = nlp('2005 4th quarter')
// let doc = nlp(`Chanukah 2018`)
// let doc = nlp(`2 thursdays ago`).debug()
// let doc = nlp(`half three`).debug()
// let doc = nlp(`last year`).debug()
// let doc = nlp(`November 18th 2010 midnight`).debug()
// let doc = nlp(`between 9:30 and 11:00 on thursday`).debug()
// let doc = nlp('Jan 1 - Dec 31, 2018') //contraction
// let doc = nlp('by next weekend') // clone issue
// let doc = nlp('nov 1 - nov 30').debug()
// let doc = nlp('this past mon').debug()
// let doc = nlp('this morning').debug() // (forward)
// let doc = nlp('middle of 2019').debug()
// let doc = nlp('middle of 2019').debug()
// let doc = nlp('january up to june').debug()
// let doc = nlp('march 1st 2016 to may 31st 2016').debug()
// let doc = nlp('this winter').debug()
// let doc = nlp('between dec and February').debug()
// let doc = nlp('by tomorrow').debug()
// let doc = nlp('1994-11-05T13:15:30Z').debug()
// let doc = nlp('dec 23rd 2019 to dec 29').debug()
// let doc = nlp('march 1st to may 31st 2017').debug()
// let doc = nlp('sometime during today').debug()
// let doc = nlp('in about one week').debug()
// let doc = nlp('a month and a half from now').debug()

// ### time-parser
// let doc = nlp(`a quarter past noon`).debug()
// let doc = nlp(`a quarter to 4`).debug()
// let doc = nlp(`04/2016`).debug()
