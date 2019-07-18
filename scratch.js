var nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/values/src'))

//TODO: cleanup isPlural method
//http://www.focus.olsztyn.pl/en-grammar-nouns-uncountable-s.html

var doc = nlp(`diabetes aint fun`).debug()
