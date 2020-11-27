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

// let doc = nlp('july 1 2016')
let doc = nlp('Jul 1st-31st 2016')
// let doc = nlp('Sept 1st-30th')
let found = doc.dates({ today: [2016, 7, 13], timezone: 'Canada/Pacific' }).json()[0]
console.log(fmt(found.date.start))
console.log(fmt(found.date.end))
