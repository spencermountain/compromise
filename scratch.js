const nlp = require('./src/index')
nlp.verbose(true)
// let txt = require('./scripts/test/speed/_sotu-text.js')
nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))

// let doc = nlp('i paid $5.50.')
// let doc = nlp('$5.32')

let world = nlp.world()
Object.assign(world.cache.abbreviations, {
  fn: true,
  abbr: true,
})

let doc = nlp('on tel. 34th').debug()
// console.log(doc.termList())
