const nlp = require('./src/index')
nlp.extend(require('./plugins/numbers/src'))
nlp.extend(require('./plugins/dates/src'))
const spacetime = require('/Users/spencer/mountain/spacetime')
// nlp.extend(require('./plugins/match-runner/src'))
// const text = require('/Users/spencer/mountain/compromise/scripts/perf/flame/_sotu-text.js')
const fmt = iso => (iso ? spacetime(iso).format('{day-short} {nice} {year}') : '-')
nlp.verbose('date')

// let doc = nlp('tuesdays').debug()
let doc = nlp('any tuesday').debug()
let dates = doc.dates().get()
console.log(dates[0])
dates.forEach(date => {
  console.log('start: ', fmt(date.start))
  console.log('  end: ', fmt(date.end))
})

// doc.match('^[<date>#Date+] (from|between) [<from>#Time+] (to|until|upto|through|thru|and) [<to>#Time+]').debug()
