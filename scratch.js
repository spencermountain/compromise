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

let doc = nlp('1-31')
// let found = doc.dates({ today: [2016, 7, 13], timezone: 'Canada/Pacific' }).json()[0]
// console.log(fmt(found.date.start))
// console.log(fmt(found.date.end))

// doc.numbers().debug().toCardinal()
doc.numbers().debug().toOrdinal()
console.log(doc.text())
