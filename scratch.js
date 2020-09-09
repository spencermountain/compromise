const nlp = require('./src/index')
const spacetime = require('/Users/spencer/mountain/spacetime/src')
// nlp.verbose(true)
// let txt = require('./scripts/test/speed/_sotu-text.js')
// nlp.extend(require('./plugins/numbers/src'))
nlp.extend(require('./plugins/dates/src'))
// nlp.extend(require('./plugins/sentences/src'))

// let doc = nlp('april fools').debug()
// let dates = doc.dates({ today: { year: 1999 } }).json(0)
// console.log(spacetime(dates.date.start).format('{day-short} {month-short} {date} {year}, {time}'))

// if (dates.date.end) {
//   console.log(spacetime(dates.date.end).format('{day-short} {month-short} {date} {year}, {time}'))
// } else {
//   console.log('--')
// }

let text = `I'm sending out a further appointment and hope she will be able to attend.`
let doc = nlp(text)
doc
  .match(
    '(i|we) * (am|are)? (will|shall)? (send|sending) out? (an|a|another|one)? (further|additional|routine|another)? non? urgent? (appointment|appointments)'
  )
  .debug()
