'use strict'
var nlp = require('./src/index')
// nlp.verbose('tagger')
// const fresh = require('./test/unit/lib/freshPrince.js');

let doc = nlp('they walk').sentences()
doc.toNegative()
doc.debug()
// console.log(doc.out())
// doc.toPastTense()
// console.log(doc.parent.out())
// console.log(doc.out())
