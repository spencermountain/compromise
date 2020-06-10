const nlp = require('./src/index')
nlp.verbose(true)
// let txt = require('./scripts/test/speed/_sotu-text.js')
nlp.extend(require('./plugins/sentences/src'))

// // let doc = nlp('i am being driven')
// let doc = nlp('i should be driven')
// // let doc = nlp('i should have been driven')
// doc.sentences().toFutureTense().debug()

let doc = nlp('+1-123-444-55555')
doc.debug()
