const nlp = require('./src/index')
nlp.verbose(true)
// let txt = require('./scripts/test/speed/_sotu-text.js')
// nlp.extend(require('./plugins/numbers/src'))

let doc = nlp(`he doesn't continue is because`)
doc.verbs().toPastTense()
doc.debug()
