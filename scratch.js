const nlp = require('./src/index')
nlp.verbose(true)
// let txt = require('./scripts/test/speed/_sotu-text.js')
// nlp.extend(require('./plugins/sentences/src'))

let res = nlp('am being driven').verbs().debug().conjugate()[0]
console.log(res)
