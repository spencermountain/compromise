'use strict'
var nlp = require('./src/index')
// nlp.verbose('tagger');
// const fresh = require('./test/unit/lib/freshPrince.js');

// let doc = nlp('The Elkjsdflkjsdf sells hamburgers')

nlp.addWords({ reading: 'City' })
console.log(nlp)
nlp('reading is fun').debug()
