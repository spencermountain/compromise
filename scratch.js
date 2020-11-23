const nlp = require('./src/index')
// const spacetime = require('/Users/spencer/mountain/spacetime/src')
// nlp.verbose(true)
nlp.extend(require('./plugins/sentences/src'))
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))

// const fmt = function (iso) {
//   if (!iso) {
//     return '-'
//   }
//   return spacetime(iso).format('{day-short} {nice} {year}')
// }

// let doc = nlp('first hour of 2019')
// let found = doc.dates().json()[0]
// console.log(fmt(found.date.start))
// console.log(fmt(found.date.end))

// let doc = nlp(`despite working hard, he was very happy.`)
// doc.sentences().forEach(s => {
//   s.phrases().debug()
// })

let doc = nlp('He is cool.')
console.log(doc.sentences().json())
// let s = doc.sentences()
// console.log(s.toDoc())
