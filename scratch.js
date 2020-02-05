const nlp = require('./src/index')
nlp.verbose(true)
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/scan/src'))

// nlp('rod l. macdonald').debug()
nlp('would have had walked').debug()
