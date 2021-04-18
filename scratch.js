const nlp = require('./src/index')
nlp.extend(require('./plugins/numbers/src'))
nlp.extend(require('./plugins/dates/src'))
nlp.extend(require('./plugins/typeahead/src'))
// const spacetime = require('/Users/spencer/mountain/spacetime')
// nlp.extend(require('./plugins/sentences/src'))
// const text = require('/Users/spencer/mountain/compromise/scripts/perf/flame/_sotu-text.js')
// const fmt = iso => (iso ? spacetime(iso).format('{day-short} {nice} {year}') : '-')
// nlp.verbose(true)

// runtime error:
/*
let doc = nlp(`to foo`)
let m = doc.match('[.+] to', 0)
console.log(m)
m.clone().debug()
*/

// create a newton plugin
const plugin = function (_Doc, world, _nlp) {
  let obj = {
    size: 2,
    words: {
      july: 'Month',
      august: 'Month',
      september: 'Month',
    },
  }
  _nlp.typeahead(obj.words, { min: obj.size, safe: false })
}
nlp.extend(plugin)
let doc = nlp('20 septem')
doc.autoFill()
doc.debug()
console.log(doc.termList(1))
console.log(doc.dates().get())

// doc.clone().dates()
// console.log(doc.text())
// console.log(nlp('draw').verbs().conjugate())
// doc.dates().debug()
// console.log(doc.dates().get())
// let doc = nlp('9-5pm tuesday').debug()
// let m = doc.match('to 5pm tuesday').debug()
// console.log(m)
