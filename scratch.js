const nlp = require('./src/index')
// const corpus = require('nlp-corpus')
// nlp.verbose(true)
nlp.extend(require('./plugins/numbers/src'))

/*
2. ~walk~ match
3. .swap()
*/

let r = nlp('two hundred and fifty times six')
r.values().debug()
