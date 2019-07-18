var nlp = require('./src/index')
nlp.verbose(true)
// nlp.extend(require('./plugins/values/src'))

//TODO: cleanup isPlural method
//http://www.focus.olsztyn.pl/en-grammar-nouns-uncountable-s.html

var doc = nlp(`i'd so much as guess`).debug()

const lex = doc.world.lexicon
console.log(lex.walk)
