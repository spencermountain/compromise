var nlp = require('./src/index')
nlp.verbose(true)
// nlp.extend(require('./plugins/verbs/src'))
// nlp.extend(require('./plugins/entities/src'))

let doc = nlp('who').debug()
