const nlp = require('./src/index')
// nlp.verbose(true)
// let txt = require('./scripts/test/speed/_sotu-text.js')
nlp.extend(require('./plugins/sentences/src'))

let doc = nlp(`I can't believe it's a law firm.`)
let str = doc.sentences().toExclamation().text()
console.log(str)
