'use strict'
var nlp = require('./src/index')
// nlp.verbose('tagger')
// const fresh = require('./test/unit/lib/freshPrince.js');

// console.log(nlp('i take typically the stairs').verbs().conjugate())

// console.log(nlp('took').verbs().conjugate())
// let doc = nlp("EfD's")
// let doc = nlp('The Elkjsdflkjsdf sells hamburgers')
// let doc = nlp('The EACD united in 1972. EACD must follow regulations.')
// doc.debug()
// doc.topics().debug()

let doc = nlp('boris becker ? he is nice.')
// let doc = nlp('Is Trump the president of U.S. ? i guess so')
doc.debug()
