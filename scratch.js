const nlp = require('./src/index')
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))
// nlp.extend(require('./plugins/typeahead/src'))
// const spacetime = require('/Users/spencer/mountain/spacetime')
// nlp.extend(require('./plugins/sentences/src'))
// const text =  require('/Users/spencer/mountain/compromise/scripts/perf/flame/_sotu-text.js')
// const fmt = iso => (iso ? spacetime(iso).format('{day-short} {nice} {year}') : '-')
nlp.verbose(true)

// let doc = nlp('the dogs chased')
// let doc = nlp('i do not really yell').debug()
// let doc = nlp('i did not really yell').debug()

let arr = [
  // `become overly weakened`,
  // `a completely beaten man`,
  // `the said card`,
  `one super strong character`,
  `one super fed character`,
  `naive and chubby cheeked`,
  `we charged back`,
  `obviously, he’s devastated`,
  `rely on bottled water`,
]

// let text = '....... the rest was history!'
let doc = nlp(arr[0]).debug()
// nlp('the particular card').debug()
