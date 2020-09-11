const nlp = require('./src/index')
const spacetime = require('/Users/spencer/mountain/spacetime/src')
// nlp.verbose(true)
// let txt = require('./scripts/test/speed/_sotu-text.js')
nlp.extend(require('./plugins/numbers/src'))
nlp.extend(require('./plugins/dates/src'))
// nlp.extend(require('./plugins/sentences/src'))

// let doc = nlp('april fools').debug()
// console.log(spacetime(dates.date.start).format('{day-short} {month-short} {date} {year}, {time}'))

// let doc = nlp(`once a month`)
let doc = nlp(`wednesday`)

// doc.debug()
let dates = doc.dates().json(0)
console.log(dates)
if (dates.date.end) {
  console.log(spacetime(dates.date.end).format('{day-short} {month-short} {date} {year}, {time}'))
} else {
  console.log('--')
}
