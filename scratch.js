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

// let doc = nlp('the dogs chased')
// let doc = nlp('i do not really yell').debug()
// let doc = nlp('i did not really yell').debug()

let doc = nlp(`it is like. i am too`)
console.log(doc.json())

// let pointer = [{ start: '/0/1' }]
