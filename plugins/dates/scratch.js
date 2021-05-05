const nlp = require('../../src/index')
const spacetime = require('spacetime')
nlp.extend(require('../../plugins/numbers/src'))
nlp.extend(require('../../plugins/dates/src'))
// nlp.verbose(true)
// nlp.verbose('date')

const fmt = (iso) => (iso ? spacetime(iso).format('{day-short} {nice} {year}') : '-')

const context = {
  // today: '2021-04-17',
  // timezone: 'Asia/Shanghai',
  dayStart: '8:00am',
  // dayEnd: '8:00pm',
}

let doc = nlp('june 3 6 12').debug()
// let doc = nlp('feb 3, 4 and 9').debug()
let dates = doc.dates(context) //.debug()
dates = dates.get()
dates.forEach((date) => {
  console.log('start: ', fmt(date.start))
  console.log('  end: ', fmt(date.end))
})
