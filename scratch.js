// const nlp = require('./src/index')
const nlp = require('./alt')
// nlp.extend(require('./plugins/rule-machine/src'))
// nlp.extend(require('./plugins/dates/src'))
// nlp.extend(require('./plugins/typeahead/src'))
// const spacetime = require('/Users/spencer/mountain/spacetime')
// nlp.extend(require('./plugins/sentences/src'))
// const text =  require('/Users/spencer/mountain/compromise/scripts/perf/flame/_sotu-text.js')
// const fmt = iso => (iso ? spacetime(iso).format('{day-short} {nice} {year}') : '-')
// nlp.verbose(true)

const { get, make } = require('garbage-patch')

let pointer = [
  '/1/2:4',
  {
    start: make([1, 2]),
    end: make([1, 3]),
  },
]
// console.log(pointer)

let doc = nlp(`it is 9pm. i cannot go`)
// console.log(get(pointer, doc.document))
console.log(doc.json())
// console.log(JSON.stringify(doc.json(), null, 2))
// console.log(Object.keys(doc.model))
// console.log(doc.model.lexicon)

// let pointer = [{ start: '/0/1' }]
