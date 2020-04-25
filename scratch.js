const nlp = require('./src/index')
nlp.verbose(true)
// let txt = require('./scripts/test/speed/_sotu-text.js')
// nlp.extend(require('./plugins/numbers/src'))

// nlp(`the only reason`).debug()
nlp(`They cite a lack of imbalances that provide early warning signals of a downturn.`).debug()
// nlp(`he doesn't continue is because`).verbs().toPastTense().debug()
