'use strict'
var nlp = require('./src/index')
// nlp.verbose('tagger');
// const fresh = require('./test/unit/lib/freshPrince.js');

let nlp2 = nlp.clone()
nlp.addWords({ here: 'Different' })

// nlp.inspect()
// nlp2.inspect()
nlp('here').debug()
nlp2('here').debug()

// let lexicon = { here: 'init' }
// let lexicon2 = Object.assign({}, lexicon)
// lexicon.here = 'different'
// console.log(lexicon)
// console.log(lexicon2)
