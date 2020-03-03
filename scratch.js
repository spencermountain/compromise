const nlp = require('./src/index')
nlp.verbose(true)
// let txt = require('./scripts/test/speed/_sotu-text.js')
nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))

// let doc = nlp('i paid $5.50.')
let doc = nlp('$5.32')
doc.untag('money')
doc.debug()
// let doc = nlp('it is 1 567.89')
// doc.match('#Money+').debug()

// let doc = nlp('i paid fifty eight dollars')
// doc.numbers().debug()
// doc.money().debug()

// doc
//   .numbers()
//   .hasAfter('#Currency')
//   .debug() //.if(tmp => tmp.hasAfter('#Money')).debug()
