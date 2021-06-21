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
  // `drinks and food fuel shopping at new Saks`,
  // `litigation costs`,
  // `the dog, whose skip was Frank`,
  // `on non-Microsoft operating systems,`,
  `it’s a myth that uncovered wounds heal faster`,
  `a critical national security [issue] `,
  `I have no excuse, but surprize and [fear] `,
  `in the woods, [sketching,] boating, fishing`,
  `some depression and negative [thought] patterns `,
  `Toronto gets a new monthly artisans [market]`,
  `including litigation [costs,] and reasonable attorneys' fees.`,
  `With RAPI, the registry, [file] system, database, and configuration of the Pocket PC device are available to the PC application.`,
  `with Scotland winning 49 [matches] `,
  `come into the coach and [take] part`,
  `There ’s a big plum tree growing on it [close] to the line fence .`,
  // `become overly weakened`,
  // `a completely beaten man`,
  // `the said card`,
  // `one super strong character`,
  // `we charged back`,
  // `for suspected terrorists`,
  // `for discounted beauty items`,
  // `the number of suspected terrorists`,
  // `number of registered party members`,
  // `rely on bottled water`,
]
// `naive and chubby cheeked`,
// `he’s devastated`,

// let text = '....... the rest was history!'
// let doc = nlp(arr[0]).debug()
nlp(`It is the welfare society that was New Orleans`).debug()
