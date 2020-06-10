const nlp = require('./src/index')
// nlp.verbose(true)
// let txt = require('./scripts/test/speed/_sotu-text.js')
// nlp.extend(require('./plugins/sentences/src'))

// // let doc = nlp('i am being driven')
// let doc = nlp('i should be driven')
// // let doc = nlp('i should have been driven')
// doc.sentences().toFutureTense().debug()

// let doc = nlp('open').debug()

let doc = nlp('added')
// let doc = nlp('edited')
// let doc = nlp('edit')
console.log(doc.verbs().conjugate())

// let doc = nlp('includes')
// console.log(doc.verbs().conjugate())
