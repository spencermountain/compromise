var nlp = require('./src/index')
nlp.verbose(true)
// nlp.extend(require('./plugins/values/src'))

//TODAY: finish tagger:
// then rename values() to numbers()

let doc = nlp('the CIA and N.F.L. and the d.o.e').debug()

// console.log(doc.world.lexicon.is)
