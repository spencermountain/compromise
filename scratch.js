var nlp = require('./src/index')
nlp.verbose(true)
// nlp.extend(require('./plugins/verbs/src'))
// nlp.extend(require('./plugins/ngrams/src'))

nlp('jean jacket. jean Slkje').debug()
