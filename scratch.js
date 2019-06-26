var nlp = require('./src/index')
nlp.extend(require('./plugins/entities/src'))
nlp.extend(require('./plugins/nouns/src'))
nlp.extend(require('./plugins/ngrams/src'))
nlp.extend(require('./plugins/sentences/src'))
nlp.extend(require('./plugins/values/src'))
nlp.extend(require('./plugins/verbs/src'))

let doc = nlp(`spencer is/was going crazy. He walks quickly. John Smith is here with Julie`)
// let doc2 = nlp(`oh yeah, baby. yeee haw.`)

// doc = doc.concat(nlp('hell yeah john smith'))
doc.people().debug()
