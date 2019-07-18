var nlp = require('./src/index')
nlp.verbose(true)
// nlp.extend(require('./plugins/values/src'))

//TODAY: finish tagger:
// then rename values() to numbers()

var doc = nlp(`#Cool`).debug()
console.log(doc.list[0].terms())

// const lex = doc.world.lexicon
// console.log(lex.walk)
