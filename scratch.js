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

let doc = nlp('q1 2002')
// let doc = nlp('the last weekend in october')
// let doc = nlp('last february')
// let doc = nlp('friday')
// let doc = nlp('next year in june')
// let doc = nlp('new years')
// let doc = nlp('fourth quarter, 2002')
let found = doc.dates().json()[0]
console.log(fmt(found.date.start))
console.log(fmt(found.date.end))

// let doc = nlp(`alexandria Daddario`).debug()
// let doc = nlp(`Paris Berelc`).debug()
// let doc = nlp(`in alexandria`).debug()
// doc.debug()
// doc.sentences().forEach(s => {
//   s.phrases().debug()
// })
