const nlp = require('./src/index')
const spacetime = require('/Users/spencer/mountain/spacetime/src')
// nlp.verbose(true)
// nlp.extend(require('./plugins/sentences/src'))
nlp.extend(require('./plugins/numbers/src'))
nlp.extend(require('./plugins/dates/src'))

const fmt = function (iso) {
  if (!iso) {
    return '-'
  }
  return spacetime(iso).format('{day-short} {nice} {year}')
}

// let doc = nlp('within June 1999').debug()
let doc = nlp('q3').debug()
let found = doc.dates({ today: [2016, 7, 13], timezone: 'Canada/Pacific' }).json()[0]
console.log(fmt(found.date.start))
console.log(fmt(found.date.end))

// hmmm
// let doc = nlp('Jan 1 - Dec 31, 2018').debug() //contraction
// let doc = nlp('by next weekend').debug() // clone issue
