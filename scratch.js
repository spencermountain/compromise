const nlp = require('./src/index')
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))
// nlp.extend(require('./plugins/typeahead/src'))
// const spacetime = require('/Users/spencer/mountain/spacetime')
// nlp.extend(require('./plugins/sentences/src'))
// const text = require('/Users/spencer/mountain/compromise/scripts/perf/flame/_sotu-text.js')
// const fmt = iso => (iso ? spacetime(iso).format('{day-short} {nice} {year}') : '-')
// nlp.verbose(true)

// runtime error:

nlp('visit https://en.m.wikipedia.org').debug()
// let doc = nlp(`to foo`)
// let m = doc.match('[.+] to').debug()

// doc.clone().dates()
// console.log(doc.text())
// console.log(nlp('draw').verbs().conjugate())
// doc.dates().debug()
// console.log(doc.dates().get())
// let doc = nlp('9-5pm tuesday').debug()
// let m = doc.match('to 5pm tuesday').debug()
// console.log(m)
