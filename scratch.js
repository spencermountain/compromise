const nlp = require('./src/index')
// nlp.verbose(true)
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))

let doc = nlp(`between june 5th and june 7th`)

doc.match('between [.*] and').debug()
