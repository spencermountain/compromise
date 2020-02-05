const nlp = require('./src/index')
nlp.verbose(true)
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/scan/src'))

// nlp(`okay, do not use reverse psychology`).debug()
// nlp(`April, June, and September`).debug()
nlp(`really mark`).debug()
