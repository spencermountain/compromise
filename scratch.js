const nlp = require('./src/index')
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))
// nlp.extend(require('./plugins/typeahead/src'))
// nlp.extend(require('./plugins/sentences/src'))
nlp.verbose(true)

let doc = nlp('Birmingham, New Orleans or Charlotte.').debug()
