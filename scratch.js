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
  // `it’s a myth that uncovered wounds heal faster`,
  // `a national security issue `,
  // `I have no excuse, but surprise and fear `,
  // `in the woods, sketching, boating, fishing`,
  // `formal thought patterns `,
  // `every parenting system`,
  // `with Scotland winning 49 matches `,
  // `come into the coach and [take] part`,
  // `There’s a big plum tree growing on it close to the line fence .`,
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
  // `will have waited until release`,
  // `selling like hot cakes`,
  // `have given up on reason`,

  // `you have some valid points`,
  // `for some reason`,
  // `dirty tricks`,
  // `press release`,
  // `the same type of shouts`,
  // `the same kind of shouts`,
  // `they are essential to expand`,
  // `had a rocky release`,
  // `doing better for fights`,
  // `might get better aim`,
  `i think tipping blows`,
]
// `won’t take extra damage`,
// `called the taylor rule`,
// `naive and chubby cheeked`,
// `he’s devastated`,

let doc = nlp(arr[0]).debug()
// nlp(`I have to say the value `).debug()
