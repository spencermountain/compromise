var nlp = require('./src/index')
nlp.verbose(true)
// nlp.extend(require('./plugins/values/src'))

//TODO: finish tagger
// rename values tags to Numbers

var doc = nlp(`im @Cool`).debug()

// const lex = doc.world.lexicon
// console.log(lex.walk)
