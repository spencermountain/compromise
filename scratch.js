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

// let doc = nlp('next weekend')
let doc = nlp('20th-21st').debug()
// let num = doc.numbers()
// num.toNumber()
// num.toCardinal(false)
// doc.debug()
doc.contractions().expand().debug()
// let found = doc.dates({ today: [2016, 7, 13], timezone: 'Canada/Pacific' }).json()[0]
// console.log(found.date.start)
// console.log(fmt(found.date.start))
// console.log(fmt(found.date.end))

// let doc = nlp(`alexandria Daddario`).debug()
// let doc = nlp(`Paris Berelc`).debug()
// let doc = nlp(`in alexandria`).debug()
// doc.debug()
// doc.sentences().forEach(s => {
//   s.phrases().debug()
// })
