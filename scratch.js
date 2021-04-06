const nlp = require('./src/index')
nlp.extend(require('./plugins/numbers/src'))
nlp.extend(require('./plugins/dates/src'))
const spacetime = require('/Users/spencer/mountain/spacetime')
// nlp.extend(require('./plugins/match-runner/src'))
// const text = require('/Users/spencer/mountain/compromise/scripts/perf/flame/_sotu-text.js')
const fmt = iso => (iso ? spacetime(iso).format('{day-short} {nice} {year}') : '-')
// nlp.verbose('date')

let doc = nlp('3 to 4 on wednesday').debug()
// let doc = nlp('tuesdays at 2pm').debug()
let dates = doc.dates({ dayEnd: '8pm' }).get()
// console.log(dates[0].repeat)
dates.forEach(date => {
  console.log('start: ', fmt(date.start))
  console.log('  end: ', fmt(date.end))
})

// doc.match('^[<date>#Date+] (from|between) [<from>#Time+] (to|until|upto|through|thru|and) [<to>#Time+]').debug()
