'use strict'
var nlp = require('./src/index')
nlp.verbose('tagger')
// const fresh = require('./test/unit/lib/freshPrince.js');

let doc = nlp('i fully take the stairs').sentences()
// doc.toPastTense()
doc.debug()
// doc.toNegative()
// console.log(doc.out())
// console.log(doc.parent.out())
// console.log(doc.out())
